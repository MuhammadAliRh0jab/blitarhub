<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Talent extends Model
{
    use HasFactory;
    
    protected $table = 'talents';

    protected $fillable = [
        'user_id', 'headline', 'bio', 'location',
        'rating', 'reviews_count', 'jobs_completed', 'connections',
        'cv_url', 'portfolio_url', 'cover_url'
    ];

    protected $casts = [
        'rating' => 'float',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function skills() {
        return $this->belongsToMany(Skill::class);
    }

    public function experiences() {
        return $this->hasMany(TalentExperience::class)->orderBy('sort_order');
    }

    public function educations() {
        return $this->hasMany(TalentEducation::class)->orderBy('sort_order');
    }

    public function achievements() {
        return $this->hasMany(TalentAchievement::class)->orderBy('sort_order');
    }

    public function projects() {
        return $this->hasMany(TalentProject::class)->orderBy('sort_order');
    }

    public function clientReviews() {
        return $this->hasMany(TalentReview::class);
    }
}
