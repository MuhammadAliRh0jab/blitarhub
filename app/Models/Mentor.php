<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'company', 'expertise', 'linkedin_url'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function programs() {
        return $this->hasMany(MentorshipProgram::class);
    }
}
