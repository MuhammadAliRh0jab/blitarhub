<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignDonation extends Model
{
    protected $fillable = [
        'campaign_id', 'user_id', 'donor_name', 'amount',
        'time_label', 'message', 'is_anonymous', 'payment_status',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
