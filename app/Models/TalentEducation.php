<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TalentEducation extends Model
{
    protected $table = 'talent_educations';

    protected $fillable = ['talent_id', 'institution', 'degree', 'year', 'gpa', 'sort_order'];

    public function talent() {
        return $this->belongsTo(Talent::class);
    }
}
