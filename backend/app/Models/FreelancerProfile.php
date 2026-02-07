<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class FreelancerProfile extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'institution',
        'bio',
        'skills',
        'hourly_rate',
        'daily_rate',
        'availability',
    ];

    protected $casts = [
        'skills' => 'array',
        'hourly_rate' => 'decimal:2',
        'daily_rate' => 'decimal:2',
        'availability' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
