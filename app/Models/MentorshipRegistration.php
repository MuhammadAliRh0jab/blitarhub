<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorshipRegistration extends Model
{
    protected $fillable = [
        'user_id', 'mentorship_program_id', 'message', 'status', 'payment_status'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function program() {
        return $this->belongsTo(MentorshipProgram::class, 'mentorship_program_id');
    }
}
