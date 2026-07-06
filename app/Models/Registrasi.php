<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registrasi extends Model
{
    use HasFactory;

    // Definisikan nama tabel secara eksplisit
    protected $table = 'registrasi';

    protected $guarded = [];

    // CASTS: Mengubah field JSON custom_field_values langsung menjadi Array PHP
    protected $casts = [
        'custom_field_values' => 'array',
    ];

    /**
     * Mengetahui pemilik data registrasi ini.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    /**
     * Mengetahui form ini diisi untuk event yang mana.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'id_event');
    }
}
