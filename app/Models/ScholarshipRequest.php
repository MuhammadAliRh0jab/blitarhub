<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScholarshipRequest extends Model
{
    protected $fillable = [
        'user_id', 'full_name', 'phone', 'institution',
        'category', 'title', 'target_amount', 'description',
        'document_path', 'status',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
