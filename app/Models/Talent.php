<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Talent extends Model
{
    use HasFactory;
    
    protected $table = 'talents';

    protected $fillable = ['user_id', 'headline', 'bio', 'cv_url', 'portfolio_url'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function skills() {
        return $this->belongsToMany(Skill::class);
    }
}
