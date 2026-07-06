<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('qr_codes', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel users (one-to-one/one-to-many)
            $table->foreignId('id_user')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('id_event')
                ->constrained('events')
                ->onDelete('cascade');

            // Token unik (bisa diisi UUID) untuk dijadikan gambar QR Code
            $table->string('qr_token')->unique();

            // Flag untuk mengecek apakah QR Code ini sudah pernah dipakai masuk/scan
            $table->boolean('is_used')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qr_codes');
    }
};
