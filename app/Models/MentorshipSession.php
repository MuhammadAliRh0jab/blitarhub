<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorshipSession extends Model
{
    protected $fillable = [
        'mentorship_program_id', 'title', 'date', 'start_time', 'end_time', 'meeting_link'
    ];

    public function program() {
        return $this->belongsTo(MentorshipProgram::class, 'mentorship_program_id');
    }
}
