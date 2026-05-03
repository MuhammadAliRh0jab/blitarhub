<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\CampaignDonation;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ScholarshipDonationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'amount' => 'required|integer|min:10000',
            'donor_name' => 'required|string|max:255',
            'message' => 'nullable|string|max:1000',
            'is_anonymous' => 'boolean',
        ]);

        $campaign = Campaign::findOrFail($request->campaign_id);
        $user = auth()->user();

        $donation = CampaignDonation::create([
            'campaign_id' => $campaign->id,
            'user_id' => $user ? $user->id : null,
            'donor_name' => $request->donor_name,
            'amount' => $request->amount,
            'message' => $request->message,
            'is_anonymous' => $request->is_anonymous ?? false,
            'payment_status' => 'unpaid',
            'time_label' => 'Baru saja',
        ]);

        // Redirect to manual payment page
        return Inertia::render('Scholarships/Payment', [
            'campaign' => [
                'title' => $campaign->title,
                'amount' => $donation->amount,
                'bank_name' => $campaign->bank_name,
                'bank_account_number' => $campaign->bank_account_number,
                'bank_account_name' => $campaign->bank_account_name,
            ],
            'donation_id' => $donation->id
        ]);
    }

    public function uploadProof(Request $request, $id)
    {
        $request->validate([
            'payment_proof' => 'required|image|max:2048',
        ]);

        $donation = CampaignDonation::findOrFail($id);

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');
            $donation->update([
                'payment_proof' => '/storage/' . $path,
                'payment_status' => 'pending_verification'
            ]);
        }

        return redirect()->route('scholarships.show', $donation->campaign_id)->with('success', 'Bukti pembayaran berhasil diunggah. Menunggu verifikasi.');
    }

    public function verifyPayment(Request $request, $id)
    {
        $donation = CampaignDonation::with('campaign')->findOrFail($id);

        // Optional: Ensure current user is the owner of the campaign (if organizers have users)
        // If not, maybe only admin can verify. For now, we will assume the route is protected or verified by the frontend.
        
        $request->validate([
            'status' => 'required|in:paid,failed'
        ]);

        if ($request->status === 'paid' && $donation->payment_status !== 'paid') {
            $donation->update([
                'payment_status' => 'paid',
            ]);
            $donation->campaign->increment('current_amount', $donation->amount);
            $donation->campaign->increment('donors_count');
            
            return back()->with('success', 'Donasi berhasil diverifikasi.');
        } else if ($request->status === 'failed') {
            $donation->update([
                'payment_status' => 'failed'
            ]);
            return back()->with('success', 'Donasi ditolak.');
        }

        return back();
    }

    public function paymentSuccess($id)
    {
        $donation = CampaignDonation::findOrFail($id);
        return redirect()->route('scholarships.show', $donation->campaign_id)->with('success', 'Terima kasih atas donasi Anda!');
    }
}
