<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;
use Inertia\Inertia;

class ScholarshipController extends Controller
{
    public function index(Request $request)
    {
        $campaigns = Campaign::where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Scholarships/Index', [
            'campaigns' => $campaigns
        ]);
    }

    public function show($id)
    {
        $campaign = Campaign::with([
            'updates' => function($q) {
                $q->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc');
            },
            'donations' => function($q) {
                $q->whereIn('payment_status', ['paid', 'pending_verification'])->orderBy('created_at', 'desc');
            }
        ])->findOrFail($id);

        return Inertia::render('Scholarships/Show', [
            'campaign' => $campaign
        ]);
    }
}
