<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TalentProject extends Model
{
    protected $fillable = ['talent_id', 'emoji', 'name', 'description', 'tech', 'sort_order', 'documentation_photos'];

    protected $casts = [
        'tech' => 'array',
        'documentation_photos' => 'array',
    ];

    public function talent() {
        return $this->belongsTo(Talent::class);
    }
}
