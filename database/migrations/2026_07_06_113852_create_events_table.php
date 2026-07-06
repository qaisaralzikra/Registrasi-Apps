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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title_event');
            $table->string('subtitle_event')->nullable();
            $table->string('password')->nullable(); // Jika event butuh password masuk
            $table->text('desc_event')->nullable();
            $table->timestamp('date_time_event')->nullable();
            $table->string('venue')->nullable();
            
            // Menyimpan template struktur input dari form builder admin
            $table->json('custom_fields_template')->nullable(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
