<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MentorshipProgram;
use App\Models\MentorshipRegistration;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MentorshipRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'mentorship_program_id' => 'required|exists:mentorship_programs,id',
            'message' => 'nullable|string|max:1000',
        ]);

        $program = MentorshipProgram::findOrFail($request->mentorship_program_id);
        $user = $request->user();

        // Check if already registered
        $registration = MentorshipRegistration::where('user_id', $user->id)
            ->where('mentorship_program_id', $program->id)
            ->first();

        // Determine price
        $priceStr = strtolower(trim($program->price));
        $isFree = ($priceStr === 'gratis' || $priceStr === '0' || empty($priceStr));
        
        $priceNumeric = 0;
        if (!$isFree) {
            $priceNumeric = (int) preg_replace('/[^0-9]/', '', $program->price);
        }

        if ($registration) {
            if ($registration->payment_status === 'paid') {
                return back()->with('error', 'Anda sudah mendaftar dan telah lunas.');
            }
            if ($isFree) {
                return back()->with('error', 'Anda sudah terdaftar di program gratis ini.');
            }
        } else {
            $registration = MentorshipRegistration::create([
                'user_id' => $user->id,
                'mentorship_program_id' => $program->id,
                'message' => $request->message,
                'status' => $isFree ? 'approved' : 'pending',
                'payment_status' => $isFree ? 'paid' : 'unpaid',
            ]);
        }

        if ($isFree) {
            return redirect()->route('dashboard')->with('success', 'Berhasil mendaftar program Mentorship Gratis!');
        }

        // Redirect to manual payment page
        return Inertia::render('Mentorships/Payment', [
            'program' => [
                'title' => $program->title,
                'price' => $program->price,
            ],
            'mentor' => [
                'name' => $program->mentor->name,
                'bank_name' => $program->mentor->bank_name,
                'bank_account_number' => $program->mentor->bank_account_number,
                'bank_account_name' => $program->mentor->bank_account_name,
            ],
            'registration_id' => $registration->id
        ]);
    }

    public function uploadProof(Request $request, $id)
    {
        $request->validate([
            'payment_proof' => 'required|image|max:2048',
        ]);

        $registration = MentorshipRegistration::findOrFail($id);

        if ($registration->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');
            $registration->update([
                'payment_proof' => '/storage/' . $path,
                'payment_status' => 'pending_verification' // or kept as unpaid, but we use this to signify waiting
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Bukti pembayaran berhasil diunggah. Menunggu verifikasi mentor.');
    }

    public function verifyPayment(Request $request, $id)
    {
        $registration = MentorshipRegistration::with('program.mentor')->findOrFail($id);

        // Ensure the current user is the mentor of this program
        if ($registration->program->mentor->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'status' => 'required|in:paid,rejected'
        ]);

        if ($request->status === 'paid') {
            $registration->update([
                'payment_status' => 'paid',
                'status' => 'approved'
            ]);
            return back()->with('success', 'Pembayaran berhasil diverifikasi.');
        } else {
            $registration->update([
                'payment_status' => 'unpaid',
                'status' => 'rejected'
            ]);
            return back()->with('success', 'Pembayaran ditolak.');
        }
    }
}
