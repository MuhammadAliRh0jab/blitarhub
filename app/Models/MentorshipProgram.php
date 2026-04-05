<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorshipProgram extends Model
{
    use HasFactory;

    protected $fillable = ['mentor_id', 'title', 'description', 'price_or_free', 'quota'];

    public function mentor() {
        return $this->belongsTo(Mentor::class);
    }
}
