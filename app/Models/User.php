<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Mengetahui user ini terdaftar di event mana.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'id_events');
    }

    /**
     * Dapatkan data hasil jawaban registrasi milik user ini (One-to-One).
     */
    public function registrasi(): HasOne
    {
        return $this->hasOne(Registrasi::class, 'id_user');
    }

    /**
     * Dapatkan data QR Code milik user ini.
     */
    public function qrCode(): HasOne
    {
        return $this->hasOne(QrCode::class, 'id_user');
    }
}
