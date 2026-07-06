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
        Schema::create('registrasi', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel users
            $table->foreignId('id_user')
                ->constrained('users')
                ->onDelete('cascade');

            // Relasi ke tabel events (opsional tapi mempermudah query per event)
            $table->foreignId('id_event')
                ->constrained('events')
                ->onDelete('cascade');

            // Menyimpan hasil input jawaban dinamis dari pendaftar
            $table->json('custom_field_values')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrasi');
    }
};
