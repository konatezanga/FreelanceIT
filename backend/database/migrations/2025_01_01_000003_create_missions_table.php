<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->string('budget')->nullable(); // Ex: "500,000 - 700,000 FCFA" (String pour flexibilité au début)
            $table->string('deadline')->nullable();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade'); // Le client
            $table->enum('status', ['open', 'in_progress', 'completed', 'cancelled'])->default('open');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('missions');
    }
};
