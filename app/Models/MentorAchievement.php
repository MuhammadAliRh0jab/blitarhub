<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorAchievement extends Model
{
    protected $fillable = ['mentor_id', 'icon', 'title', 'issuer', 'year', 'sort_order'];

    public function mentor() {
        return $this->belongsTo(Mentor::class);
    }
}
