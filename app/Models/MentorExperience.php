<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorExperience extends Model
{
    protected $fillable = ['mentor_id', 'role', 'company', 'period', 'description', 'sort_order'];

    public function mentor() {
        return $this->belongsTo(Mentor::class);
    }
}
