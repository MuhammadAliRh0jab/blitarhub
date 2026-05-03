<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TalentExperience extends Model
{
    protected $fillable = ['talent_id', 'role', 'company', 'period', 'description', 'sort_order'];

    public function talent() {
        return $this->belongsTo(Talent::class);
    }
}
