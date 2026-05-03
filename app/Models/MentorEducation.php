<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorEducation extends Model
{
    protected $table = 'mentor_educations';

    protected $fillable = ['mentor_id', 'institution', 'degree', 'year', 'gpa', 'sort_order'];

    public function mentor() {
        return $this->belongsTo(Mentor::class);
    }
}
