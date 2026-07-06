<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Otomatis mengubah JSON menjadi Array PHP saat dibaca, dan sebaliknya
    protected $casts = [
        'custom_fields_template' => 'array',
        'date_time_event' => 'datetime',
    ];

    /**
     * Dapatkan semua user yang mendaftar di event ini.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'id_events');
    }

    /**
     * Dapatkan semua data formulir registrasi dari event ini.
     */
    public function registrasis(): HasMany
    {
        return $this->hasMany(Registrasi::class, 'id_event');
    }

    /**
     * Dapatkan semua tiket QR yang dicetak untuk event ini.
     */
    public function qrCodes(): HasMany
    {
        return $this->hasMany(QrCode::class, 'id_event');
    }
}
