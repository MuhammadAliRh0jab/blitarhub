<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
        'title', 'description', 'beneficiary', 'organizer', 'category',
        'target_amount', 'current_amount', 'donors_count', 'days_left',
        'deadline', 'status',
    ];

    protected $casts = [
        'deadline' => 'date',
    ];

    public function updates() {
        return $this->hasMany(CampaignUpdate::class)->orderBy('sort_order');
    }

    public function donations() {
        return $this->hasMany(CampaignDonation::class)->latest();
    }
}
