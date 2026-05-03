<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Talent;
use App\Models\Mentor;
use App\Models\TalentProject;

class MediaUploadController extends Controller
{
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048', // 2MB max
        ]);

        $user = Auth::user();
        $path = $request->file('avatar')->store('uploads/avatars', 'public');

        $user->update(['avatar_url' => Storage::url($path)]);

        return response()->json(['url' => $user->avatar_url]);
    }

    public function uploadCover(Request $request)
    {
        $request->validate([
            'cover' => 'required|image|max:5120', // 5MB max
            'type' => 'required|in:talent,mentor'
        ]);

        $user = Auth::user();
        $path = $request->file('cover')->store('uploads/covers', 'public');
        $url = Storage::url($path);

        if ($request->type === 'talent') {
            $talent = $user->talent;
            if ($talent) $talent->update(['cover_url' => $url]);
        } else {
            $mentor = $user->mentor;
            if ($mentor) $mentor->update(['cover_url' => $url]);
        }

        return response()->json(['url' => $url]);
    }

    public function uploadProjectDocs(Request $request, TalentProject $project)
    {
        $request->validate([
            'photos.*' => 'required|image|max:5120',
        ]);

        // Ensure user owns project
        if ($project->talent->user_id !== Auth::id()) {
            abort(403);
        }

        $urls = $project->documentation_photos ?? [];

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $file) {
                $path = $file->store('uploads/projects', 'public');
                $urls[] = Storage::url($path);
            }
        }

        $project->update(['documentation_photos' => $urls]);

        return response()->json(['urls' => $urls]);
    }
}
