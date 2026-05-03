<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mentor;
use App\Models\MentorTestimonial;
use App\Models\MentorshipRegistration;

class ReviewController extends Controller
{
    public function storeMentorReview(Request $request, $mentorId)
    {
        $request->validate([
            'stars' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
            'registration_id' => 'required|exists:mentorship_registrations,id',
        ]);

        $mentor = Mentor::findOrFail($mentorId);
        $user = auth()->user();

        // Verify the user was indeed a mentee
        $registration = MentorshipRegistration::where('id', $request->registration_id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->firstOrFail();

        MentorTestimonial::create([
            'mentor_id' => $mentor->id,
            'name' => $user->name,
            'role' => $user->talent ? $user->talent->headline : 'Mentee',
            'stars' => $request->stars,
            'comment' => $request->comment,
        ]);

        // Update Mentor Rating
        $avgRating = MentorTestimonial::where('mentor_id', $mentor->id)->avg('stars');
        $mentor->update(['rating' => round($avgRating, 1)]);

        return back()->with('success', 'Ulasan berhasil dikirim! Terima kasih atas partisipasi Anda.');
    }
}
