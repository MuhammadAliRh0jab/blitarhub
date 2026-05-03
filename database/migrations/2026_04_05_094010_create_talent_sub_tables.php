<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ─── Talent sub-tables ───

        Schema::create('talent_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('talent_id')->constrained('talents')->cascadeOnDelete();
            $table->string('role');
            $table->string('company');
            $table->string('period')->nullable();
            $table->text('description')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('talent_educations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('talent_id')->constrained('talents')->cascadeOnDelete();
            $table->string('institution');
            $table->string('degree')->nullable();
            $table->string('year')->nullable();
            $table->string('gpa')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('talent_achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('talent_id')->constrained('talents')->cascadeOnDelete();
            $table->string('icon')->nullable();
            $table->string('title');
            $table->string('issuer')->nullable();
            $table->string('year')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('talent_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('talent_id')->constrained('talents')->cascadeOnDelete();
            $table->string('emoji')->nullable();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('tech')->nullable();          // array of tech strings
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('talent_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('talent_id')->constrained('talents')->cascadeOnDelete();
            $table->string('reviewer_name');
            $table->tinyInteger('stars')->default(5);
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('talent_reviews');
        Schema::dropIfExists('talent_projects');
        Schema::dropIfExists('talent_achievements');
        Schema::dropIfExists('talent_educations');
        Schema::dropIfExists('talent_experiences');
    }
};
