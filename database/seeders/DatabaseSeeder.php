<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user
        User::factory()->create([
            'name' => 'Admin BlitarHub',
            'email' => 'admin@blitarhub.com',
        ]);

        $this->call([
            TalentSeeder::class,
            MentorSeeder::class,
            CampaignSeeder::class,
            LargeDataSeeder::class,
        ]);
    }
}
