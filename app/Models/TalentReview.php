<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TalentReview extends Model
{
    protected $fillable = ['talent_id', 'reviewer_name', 'stars', 'comment'];

    public function talent() {
        return $this->belongsTo(Talent::class);
    }
}
