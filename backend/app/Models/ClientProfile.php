<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ClientProfile extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'company_name',
        'address',
        'website',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
