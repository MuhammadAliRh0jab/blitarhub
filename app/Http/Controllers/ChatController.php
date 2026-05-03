<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $conversations = $user->conversations()->with(['users', 'messages' => function($q) {
            $q->latest()->limit(1);
        }])->get()->map(function($c) use ($user) {
            $c->unread_count = $c->messages()->where('user_id', '!=', $user->id)->whereNull('read_at')->count();
            return $c;
        });

        return response()->json($conversations);
    }

    public function show(Conversation $conversation)
    {
        // Ensure user is part of the conversation
        if (!$conversation->users->contains(Auth::id())) {
            abort(403);
        }

        $messages = $conversation->messages()->with('user')->orderBy('created_at', 'asc')->get();
        return response()->json($messages);
    }

    public function store(Request $request, Conversation $conversation)
    {
        if (!$conversation->users->contains(Auth::id())) {
            abort(403);
        }

        $request->validate(['body' => 'required|string']);

        $message = $conversation->messages()->create([
            'user_id' => Auth::id(),
            'body' => $request->body,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message->load('user'));
    }

    public function createConversation(Request $request)
    {
        $request->validate(['user_id' => 'required|exists:users,id']);
        
        $otherUserId = $request->user_id;
        $currentUserId = Auth::id();

        // Check if conversation already exists between these two users
        $conversation = Conversation::whereHas('users', function ($q) use ($currentUserId) {
            $q->where('conversation_user.user_id', $currentUserId);
        })->whereHas('users', function ($q) use ($otherUserId) {
            $q->where('conversation_user.user_id', $otherUserId);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::create();
            $conversation->users()->attach([$currentUserId, $otherUserId]);
        }

        return response()->json($conversation->load('users'));
    }

    public function markAsRead(Conversation $conversation)
    {
        $conversation->messages()
            ->where('user_id', '!=', Auth::id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json(['status' => 'success']);
    }

    public function markMessageAsRead(Message $message)
    {
        if ($message->user_id !== Auth::id()) {
            $message->update(['read_at' => now()]);
        }

        return response()->json(['status' => 'success']);
    }
}
