<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ─── Campaigns (Scholarships / Donasi) ───

        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('beneficiary')->nullable();
            $table->string('organizer')->nullable();
            $table->string('category')->nullable();
            $table->bigInteger('target_amount')->default(0);
            $table->bigInteger('current_amount')->default(0);
            $table->integer('donors_count')->default(0);
            $table->integer('days_left')->default(30);
            $table->date('deadline')->nullable();
            $table->enum('status', ['active', 'completed', 'expired'])->default('active');
            $table->timestamps();
        });

        Schema::create('campaign_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained()->cascadeOnDelete();
            $table->string('date_label')->nullable();  // "2 Apr 2026"
            $table->text('text');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('campaign_donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('donor_name');
            $table->bigInteger('amount')->default(0);
            $table->string('time_label')->nullable();   // "2 jam lalu"
            $table->text('message')->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->timestamps();
        });

        // ─── Scholarship Requests (from Request.jsx form) ───

        Schema::create('scholarship_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('full_name');
            $table->string('phone');
            $table->string('institution')->nullable();
            $table->string('category');
            $table->string('title');
            $table->bigInteger('target_amount')->default(0);
            $table->text('description')->nullable();
            $table->string('document_path')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scholarship_requests');
        Schema::dropIfExists('campaign_donations');
        Schema::dropIfExists('campaign_updates');
        Schema::dropIfExists('campaigns');
    }
};
