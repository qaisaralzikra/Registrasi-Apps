<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Event extends Model implements AuthenticatableContract
{
    use HasFactory, Authenticatable;

    protected $guarded = [];

    protected $casts = [
        'custom_fields_template' => 'array',
        'date_time_event' => 'datetime',
    ];

    protected static function booted(): void
    {
        //
    }

    public function setPasswordAttribute(string $value): void
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'id_events');
    }

    public function registrasis(): HasMany
    {
        return $this->hasMany(Registrasi::class, 'id_event');
    }

    public function qrCodes(): HasMany
    {
        return $this->hasMany(QrCode::class, 'id_event');
    }
}
