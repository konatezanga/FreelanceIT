<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Mission extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'description',
        'budget',
        'deadline',
        'user_id',
        'status',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
