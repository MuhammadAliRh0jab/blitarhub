<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorshipProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'mentor_id', 'title', 'description', 'price',
        'duration', 'format', 'enrolled', 'quota',
    ];

    public function mentor() {
        return $this->belongsTo(Mentor::class);
    }

    public function registrations() {
        return $this->hasMany(MentorshipRegistration::class);
    }

    public function sessions() {
        return $this->hasMany(MentorshipSession::class);
    }
}
