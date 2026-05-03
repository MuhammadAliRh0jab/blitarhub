<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'company', 'expertise', 'location',
        'bio', 'rating', 'mentees_count', 'linkedin_url', 'cover_url'
    ];

    protected $casts = [
        'rating' => 'float',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function programs() {
        return $this->hasMany(MentorshipProgram::class);
    }

    public function experiences() {
        return $this->hasMany(MentorExperience::class)->orderBy('sort_order');
    }

    public function educations() {
        return $this->hasMany(MentorEducation::class)->orderBy('sort_order');
    }

    public function achievements() {
        return $this->hasMany(MentorAchievement::class)->orderBy('sort_order');
    }

    public function testimonials() {
        return $this->hasMany(MentorTestimonial::class);
    }
}
