<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Mentor;
use App\Models\Talent;
use App\Models\Campaign;
use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class LargeDataSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        // --- SEED MORE TALENTS ---
        $talentJobTitles = [
            'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 
            'Data Analyst', 'Mobile Developer', 'DevOps Engineer', 
            'Content Writer', 'Graphic Designer', 'Social Media Manager'
        ];

        $skillsList = [
            'React', 'Vue.js', 'Node.js', 'PHP', 'Laravel', 'Python', 'Java',
            'Go', 'Flutter', 'React Native', 'AWS', 'Docker', 'Kubernetes',
            'Figma', 'Adobe XD', 'SQL', 'NoSQL', 'SEO', 'SEM', 'Copywriting'
        ];

        for ($i = 0; $i < 20; $i++) {
            $name = $faker->name;
            $user = User::create([
                'name' => $name,
                'email' => Str::slug($name) . $faker->unique()->numberBetween(1, 1000) . '@example.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);

            $talent = Talent::create([
                'user_id' => $user->id,
                'headline' => $faker->randomElement($talentJobTitles),
                'bio' => $faker->paragraph,
                'location' => $faker->city . ', Indonesia',
                'rating' => $faker->randomFloat(1, 4, 5),
                'reviews_count' => $faker->numberBetween(5, 50),
                'jobs_completed' => $faker->numberBetween(3, 30),
                'connections' => $faker->numberBetween(50, 500),
            ]);

            // Random skills
            $randomSkills = $faker->randomElements($skillsList, $faker->numberBetween(3, 6));
            foreach ($randomSkills as $skillName) {
                $skill = Skill::firstOrCreate(['name' => $skillName]);
                $talent->skills()->attach($skill->id);
            }

            // Random experience
            for ($j = 0; $j < $faker->numberBetween(1, 3); $j++) {
                $talent->experiences()->create([
                    'role' => $talent->headline,
                    'company' => $faker->company,
                    'period' => $faker->year . ' - ' . ($faker->boolean ? 'Kini' : $faker->year),
                    'description' => $faker->sentence,
                    'sort_order' => $j,
                ]);
            }

            // Random education
            $talent->educations()->create([
                'institution' => $faker->company, // Fake university name
                'degree' => 'S1 ' . $faker->randomElement(['Informatika', 'Sistem Informasi', 'Desain']),
                'year' => ($faker->year - 4) . ' - ' . $faker->year,
                'gpa' => $faker->randomFloat(2, 3, 4),
                'sort_order' => 0,
            ]);
        }

        // --- SEED MORE MENTORS ---
        $mentorExpertise = [
            'Product Management', 'Software Engineering', 'Career Coaching',
            'Business Development', 'UI/UX Research', 'Investment Banking',
            'Academic Research', 'Digital Marketing'
        ];

        for ($i = 0; $i < 15; $i++) {
            $name = $faker->name;
            $user = User::create([
                'name' => $name,
                'email' => Str::slug($name) . $faker->unique()->numberBetween(1, 1000) . '@mentor.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);

            $mentor = Mentor::create([
                'user_id' => $user->id,
                'company' => $faker->company,
                'expertise' => $faker->randomElement($mentorExpertise),
                'location' => $faker->city . ', Indonesia',
                'bio' => $faker->paragraphs(2, true),
                'rating' => $faker->randomFloat(1, 4.5, 5),
                'mentees_count' => $faker->numberBetween(10, 200),
                'bank_name' => 'BCA',
                'bank_account_number' => $faker->bankAccountNumber,
                'bank_account_name' => $name,
            ]);

            // Random programs
            for ($j = 0; $j < 2; $j++) {
                $mentor->programs()->create([
                    'title' => $faker->sentence(3),
                    'description' => $faker->sentence(10),
                    'price' => 'Rp ' . number_format($faker->numberBetween(50, 500) * 1000, 0, ',', '.'),
                    'duration' => $faker->numberBetween(30, 90) . ' menit',
                    'format' => $faker->randomElement(['Video Call', 'Face to Face']),
                    'enrolled' => $faker->numberBetween(1, 50),
                ]);
            }
        }

        // --- SEED MORE CAMPAIGNS ---
        $categories = ['Pendidikan Tinggi', 'Infrastruktur Pendidikan', 'Peralatan Belajar', 'Pendidikan Vokasi'];
        for ($i = 0; $i < 10; $i++) {
            $target = $faker->numberBetween(5, 100) * 1000000;
            $campaign = Campaign::create([
                'title' => $faker->sentence(5),
                'description' => $faker->paragraphs(3, true),
                'beneficiary' => $faker->name,
                'organizer' => $faker->company,
                'category' => $faker->randomElement($categories),
                'target_amount' => $target,
                'current_amount' => $faker->numberBetween(0, $target),
                'donors_count' => $faker->numberBetween(10, 500),
                'days_left' => $faker->numberBetween(1, 60),
                'bank_name' => 'Mandiri',
                'bank_account_number' => $faker->bankAccountNumber,
                'bank_account_name' => $faker->name,
            ]);

            // Random updates
            for ($j = 0; $j < $faker->numberBetween(1, 4); $j++) {
                $campaign->updates()->create([
                    'date_label' => $faker->date('d M Y'),
                    'text' => $faker->sentence(15),
                    'sort_order' => $j
                ]);
            }

            // Random donors
            for ($j = 0; $j < $faker->numberBetween(3, 8); $j++) {
                $isAnon = $faker->boolean(20);
                $campaign->donations()->create([
                    'donor_name' => $isAnon ? 'Anonim' : $faker->name,
                    'amount' => $faker->numberBetween(10, 500) * 1000,
                    'time_label' => $faker->numberBetween(1, 23) . ' jam lalu',
                    'message' => $faker->boolean(70) ? $faker->sentence : null,
                    'is_anonymous' => $isAnon,
                    'payment_status' => 'paid'
                ]);
            }
        }
    }
}
