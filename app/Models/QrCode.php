<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QrCode extends Model
{
    use HasFactory;

    protected $table = 'qr_codes';

    protected $guarded = [];

    protected $casts = [
        'is_used' => 'boolean',
    ];

    /**
     * Mengetahui siapa pemilik QR Code ini.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    /**
     * Mengetahui QR ini dicetak untuk event yang mana.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'id_event');
    }
}
