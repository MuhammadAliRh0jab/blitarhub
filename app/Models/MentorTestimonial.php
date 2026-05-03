<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorTestimonial extends Model
{
    protected $fillable = ['mentor_id', 'name', 'role', 'stars', 'comment'];

    public function mentor() {
        return $this->belongsTo(Mentor::class);
    }
}
