<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignUpdate extends Model
{
    protected $fillable = ['campaign_id', 'date_label', 'text', 'sort_order'];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }
}
