<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MentorshipRegistration;
use App\Models\MentorshipSession;
use App\Models\MentorshipProgram;
use Inertia\Inertia;

class MentorshipManagementController extends Controller
{
    public function approve(Request $request, $id)
    {
        $registration = MentorshipRegistration::findOrFail($id);
        
        // Ensure user owns the program
        if ($registration->program->mentor->user_id !== $request->user()->id) {
            abort(403);
        }

        $registration->update(['status' => 'approved']);

        return back()->with('success', 'Pendaftaran berhasil disetujui.');
    }

    public function reject(Request $request, $id)
    {
        $registration = MentorshipRegistration::findOrFail($id);
        
        // Ensure user owns the program
        if ($registration->program->mentor->user_id !== $request->user()->id) {
            abort(403);
        }

        $registration->update(['status' => 'rejected']);

        return back()->with('success', 'Pendaftaran ditolak.');
    }

    public function storeSession(Request $request, $programId)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'meeting_link' => 'required|url',
        ]);

        $program = MentorshipProgram::findOrFail($programId);

        if ($program->mentor->user_id !== $request->user()->id) {
            abort(403);
        }

        MentorshipSession::create([
            'mentorship_program_id' => $program->id,
            'title' => $request->title,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'meeting_link' => $request->meeting_link,
        ]);

        return back()->with('success', 'Sesi bimbingan berhasil dibuat.');
    }
}
