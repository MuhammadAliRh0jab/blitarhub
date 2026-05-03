<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar_url')->nullable();
        });

        Schema::table('talents', function (Blueprint $table) {
            $table->string('cover_url')->nullable();
        });

        Schema::table('mentors', function (Blueprint $table) {
            $table->string('cover_url')->nullable();
        });

        Schema::table('talent_projects', function (Blueprint $table) {
            $table->json('documentation_photos')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('talent_projects', function (Blueprint $table) {
            $table->dropColumn('documentation_photos');
        });

        Schema::table('mentors', function (Blueprint $table) {
            $table->dropColumn('cover_url');
        });

        Schema::table('talents', function (Blueprint $table) {
            $table->dropColumn('cover_url');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('avatar_url');
        });
    }
};
