<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TalentAchievement extends Model
{
    protected $fillable = ['talent_id', 'icon', 'title', 'issuer', 'year', 'sort_order'];

    public function talent() {
        return $this->belongsTo(Talent::class);
    }
}
