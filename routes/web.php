<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Talent;
use App\Models\Mentor;
use App\Models\Campaign;

// ─────────────────────────────────────────────
//  HELPER MAPPERS
// ─────────────────────────────────────────────

function mapTalent($t) {
    if (!$t) return null;
    return [
        'id' => $t->id,
        'user_id' => $t->user_id,
        'name' => $t->user->name ?? 'Unknown',
        'avatar_url' => $t->user->avatar_url ?? null,
        'cover_url' => $t->cover_url ?? null,
        'cv_url' => $t->cv_url ?? null,
        'portfolio_url' => $t->portfolio_url ?? null,
        'headline' => $t->headline ?? '',
        'location' => $t->location ?? '',
        'rating' => (float) ($t->rating ?? 0),
        'reviews' => $t->reviews_count ?? 0,
        'jobs_completed' => $t->jobs_completed ?? 0,
        'connections' => $t->connections ?? 0,
        'skills' => $t->skills ? $t->skills->pluck('name')->toArray() : [],
        'about' => $t->bio ?? '',
        'experience' => $t->experiences ? $t->experiences->map(fn($e) => [
            'id' => $e->id, 'role' => $e->role, 'company' => $e->company,
            'period' => $e->start_date . ' - ' . ($e->is_current ? 'Kini' : $e->end_date),
            'desc' => $e->description
        ])->toArray() : [],
        'education' => $t->educations ? $t->educations->map(fn($e) => [
            'id' => $e->id, 'institution' => $e->institution, 'degree' => $e->degree,
            'year' => $e->start_year . ' - ' . $e->end_year, 'gpa' => $e->gpa
        ])->toArray() : [],
        'achievements' => $t->achievements ? $t->achievements->map(fn($a) => [
            'id' => $a->id, 'icon' => $a->emoji ?? '🏆', 'title' => $a->title,
            'issuer' => $a->issuer, 'year' => $a->year
        ])->toArray() : [],
        'projects' => $t->projects ? $t->projects->map(fn($p) => [
            'id' => $p->id, 'emoji' => $p->emoji ?? '💼', 'name' => $p->name,
            'desc' => $p->description, 'tech' => is_string($p->tech) ? json_decode($p->tech, true) : ($p->tech ?? []),
            'documentation_photos' => is_string($p->documentation_photos) ? json_decode($p->documentation_photos, true) : ($p->documentation_photos ?? [])
        ])->toArray() : [],
        'client_reviews' => $t->clientReviews ? $t->clientReviews->map(fn($r) => [
            'id' => $r->id, 'name' => $r->reviewer_name, 'stars' => $r->stars, 'comment' => $r->comment
        ])->toArray() : [],
    ];
}

function mapMentor($m) {
    if (!$m) return null;
    return [
        'id' => $m->id,
        'user_id' => $m->user_id,
        'name' => $m->user->name ?? 'Unknown',
        'avatar_url' => $m->user->avatar_url ?? null,
        'cover_url' => $m->cover_url ?? null,
        'linkedin_url' => $m->linkedin_url ?? null,
        'company' => $m->company ?? '',
        'expertise' => $m->expertise ?? '',
        'location' => $m->location ?? '',
        'rating' => (float) ($m->rating ?? 0),
        'mentees' => $m->mentees_count ?? 0,
        'about' => $m->bio ?? '',
        'experience' => $m->experiences ? $m->experiences->map(fn($e) => [
            'id' => $e->id, 'role' => $e->role, 'company' => $e->company,
            'period' => $e->start_date . ' - ' . ($e->is_current ? 'Kini' : $e->end_date),
            'desc' => $e->description
        ])->toArray() : [],
        'education' => $m->educations ? $m->educations->map(fn($e) => [
            'id' => $e->id, 'institution' => $e->institution, 'degree' => $e->degree,
            'year' => $e->start_year . ' - ' . $e->end_year, 'gpa' => $e->gpa
        ])->toArray() : [],
        'achievements' => $m->achievements ? $m->achievements->map(fn($a) => [
            'id' => $a->id, 'icon' => $a->emoji ?? '🏆', 'title' => $a->title,
            'issuer' => $a->issuer, 'year' => $a->year
        ])->toArray() : [],
        'programs' => $m->programs ? $m->programs->map(fn($p) => [
            'id' => $p->id, 'title' => $p->title, 'price' => is_numeric($p->price) ? 'Rp ' . number_format($p->price, 0, ',', '.') : $p->price,
            'desc' => $p->description, 'duration' => $p->duration, 'format' => $p->format, 'enrolled' => $p->enrolled
        ])->toArray() : [],
        'testimonials' => $m->testimonials ? $m->testimonials->map(fn($t) => [
            'id' => $t->id, 'name' => $t->name, 'role' => $t->role ?? '',
            'stars' => $t->stars, 'comment' => $t->comment
        ])->toArray() : [],
    ];
}

function mapCampaign($c) {
    if (!$c) return null;
    return [
        'id' => $c->id,
        'title' => $c->title,
        'target_amount' => $c->target_amount,
        'current_amount' => $c->current_amount,
        'beneficiary' => $c->beneficiary,
        'organizer' => $c->organizer,
        'category' => $c->category,
        'donors' => $c->donors_count ?? 0,
        'days_left' => $c->days_left ?? 0,
        'description' => $c->description,
        'updates' => $c->updates ? $c->updates->map(fn($u) => [
            'id' => $u->id, 'date' => $u->created_at->format('d M Y'), 'text' => $u->content
        ])->toArray() : [],
        'donor_list' => $c->donations ? $c->donations->map(fn($d) => [
            'id' => $d->id, 'name' => $d->donor_name, 'amount' => $d->amount,
            'time' => $d->created_at->diffForHumans(), 'message' => $d->message
        ])->toArray() : [],
    ];
}

// ─────────────────────────────────────────────
//  PUBLIC ROUTES
// ─────────────────────────────────────────────

Route::get('/', function () {
    $talents = Talent::with(['user', 'skills'])->take(6)->get()->map(fn($t) => mapTalent($t))->values()->toArray();
    $mentors = Mentor::with(['user'])->take(6)->get()->map(fn($m) => mapMentor($m))->values()->toArray();
    $campaigns = Campaign::take(3)->get()->map(fn($c) => mapCampaign($c))->values()->toArray();

    return Inertia::render('Welcome', [
        'featuredTalents'  => $talents,
        'featuredMentors'  => $mentors,
        'activeCampaigns'  => $campaigns,
    ]);
})->name('home');

Route::get('/talents', function () {
    $talents = Talent::with(['user', 'skills'])->get()->map(fn($t) => mapTalent($t))->values()->toArray();
    return Inertia::render('Talents/Index', ['talents' => $talents]);
})->name('talents.index');

Route::get('/talents/{id}', function ($id) {
    $t = Talent::with(['user', 'skills', 'experiences', 'educations', 'achievements', 'projects', 'clientReviews'])->findOrFail($id);
    return Inertia::render('Talents/Show', ['talent' => mapTalent($t)]);
})->name('talents.show');

Route::get('/mentorships', function () {
    $mentors = Mentor::with(['user', 'programs'])->get()->map(fn($m) => mapMentor($m))->values()->toArray();
    return Inertia::render('Mentorships/Index', ['mentors' => $mentors]);
})->name('mentorships.index');

Route::get('/mentorships/{id}', function ($id) {
    $m = Mentor::with(['user', 'programs', 'experiences', 'educations', 'achievements', 'testimonials'])->findOrFail($id);
    return Inertia::render('Mentorships/Show', ['mentor' => mapMentor($m)]);
})->name('mentorships.show');

Route::get('/scholarships', [\App\Http\Controllers\ScholarshipController::class, 'index'])->name('scholarships.index');
Route::get('/scholarships/request', function () {
    return Inertia::render('Scholarships/Request');
})->name('scholarships.request');
Route::get('/scholarships/{id}', [\App\Http\Controllers\ScholarshipController::class, 'show'])->name('scholarships.show');

// ─────────────────────────────────────────────
//  AUTHENTICATED ROUTES
// ─────────────────────────────────────────────

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', function (Request $request) {
        $user = $request->user()->load([
            'talent',
            'talent.skills',
            'talent.experiences',
            'talent.educations',
            'talent.achievements',
            'talent.projects',
            'mentor',
            'mentor.experiences',
            'mentor.educations',
            'mentor.achievements',
            'mentor.programs',
            'mentor.programs.registrations.user.talent',
            'mentor.programs.sessions',
            'mentorshipRegistrations.program.mentor.user',
            'mentorshipRegistrations.program.sessions',
        ]);
        return Inertia::render('Dashboard', [
            'userProfile' => $user
        ]);
    })->name('dashboard');

    // Registration Endpoints for Dashboard
    Route::post('/talents/register', function (Request $request) {
        if (!$request->user()->talent) {
            $request->user()->talent()->create([
                'headline' => 'Talenta Baru',
                'location' => 'Blitar, Indonesia',
                'bio' => 'Saya adalah talenta baru di BlitarHub.',
                'rating' => 0,
                'reviews_count' => 0,
                'jobs_completed' => 0,
                'connections' => 0,
            ]);
        }
        return back();
    })->name('talents.register');

    Route::post('/mentorships/register', function (Request $request) {
        if (!$request->user()->mentor) {
            $request->user()->mentor()->create([
                'company' => 'Independen',
                'expertise' => 'Keahlian Baru',
                'location' => 'Blitar, Indonesia',
                'bio' => 'Saya adalah mentor baru di BlitarHub.',
                'rating' => 0,
                'mentees_count' => 0,
            ]);
        }
        return back();
    })->name('mentorships.register');

    // Profile Activity Routes
    Route::post('/profile/mentor-experience', [\App\Http\Controllers\ProfileActivityController::class, 'addMentorExperience'])->name('profile.mentor-experience.store');
    Route::post('/profile/talent-experience', [\App\Http\Controllers\ProfileActivityController::class, 'addTalentExperience'])->name('profile.talent-experience.store');
    Route::post('/profile/talent-portfolio', [\App\Http\Controllers\ProfileActivityController::class, 'addTalentProject'])->name('profile.talent-portfolio.store');
    Route::post('/profile/education', [\App\Http\Controllers\ProfileActivityController::class, 'addEducation'])->name('profile.education.store');
    Route::post('/profile/skills', [\App\Http\Controllers\ProfileActivityController::class, 'updateSkills'])->name('profile.skills.update');
    Route::post('/profile/bio', [\App\Http\Controllers\ProfileActivityController::class, 'updateBio'])->name('profile.bio.update');
    Route::post('/profile/mentor-expertise', [\App\Http\Controllers\ProfileActivityController::class, 'updateExpertise'])->name('profile.mentor-expertise.update');
    Route::post('/profile/mentor-bank', [\App\Http\Controllers\ProfileActivityController::class, 'updateBankDetails'])->name('profile.mentor-bank.update');

    Route::delete('/profile/mentor-experience/{experience}', [\App\Http\Controllers\ProfileActivityController::class, 'deleteMentorExperience'])->name('profile.mentor-experience.destroy');
    Route::delete('/profile/talent-experience/{experience}', [\App\Http\Controllers\ProfileActivityController::class, 'deleteTalentExperience'])->name('profile.talent-experience.destroy');
    Route::delete('/profile/mentor-education/{education}', [\App\Http\Controllers\ProfileActivityController::class, 'deleteMentorEducation'])->name('profile.mentor-education.destroy');
    Route::delete('/profile/talent-education/{education}', [\App\Http\Controllers\ProfileActivityController::class, 'deleteTalentEducation'])->name('profile.talent-education.destroy');
    Route::delete('/profile/talent-project/{project}', [\App\Http\Controllers\ProfileActivityController::class, 'deleteTalentProject'])->name('profile.talent-project.destroy');
    Route::post('/profile/achievement', [\App\Http\Controllers\ProfileActivityController::class, 'addAchievement'])->name('profile.achievement.store');
    Route::delete('/profile/mentor-achievement/{achievement}', [\App\Http\Controllers\ProfileActivityController::class, 'deleteMentorAchievement'])->name('profile.mentor-achievement.destroy');
    Route::delete('/profile/talent-achievement/{achievement}', [\App\Http\Controllers\ProfileActivityController::class, 'deleteTalentAchievement'])->name('profile.talent-achievement.destroy');

    // Media Upload Routes
    Route::post('/upload/avatar', [\App\Http\Controllers\MediaUploadController::class, 'uploadAvatar'])->name('upload.avatar');
    Route::post('/upload/cover', [\App\Http\Controllers\MediaUploadController::class, 'uploadCover'])->name('upload.cover');
    Route::post('/upload/project/{project}/docs', [\App\Http\Controllers\MediaUploadController::class, 'uploadProjectDocs'])->name('upload.project.docs');

    // Chat Routes
    Route::get('/api/conversations', [\App\Http\Controllers\ChatController::class, 'index']);
    Route::post('/api/conversations', [\App\Http\Controllers\ChatController::class, 'createConversation']);
    Route::get('/api/conversations/{conversation}/messages', [\App\Http\Controllers\ChatController::class, 'show']);
    Route::post('/api/conversations/{conversation}/messages', [\App\Http\Controllers\ChatController::class, 'store']);
    Route::post('/api/conversations/{conversation}/read', [\App\Http\Controllers\ChatController::class, 'markAsRead']);
    Route::post('/api/messages/{message}/read', [\App\Http\Controllers\ChatController::class, 'markMessageAsRead']);

    // Mentorship Registration & Payment
    Route::post('/mentorship-registrations', [\App\Http\Controllers\MentorshipRegistrationController::class, 'store'])->name('mentorship-registrations.store');
    Route::post('/mentorship-registrations/{id}/upload-proof', [\App\Http\Controllers\MentorshipRegistrationController::class, 'uploadProof'])->name('mentorship-registrations.upload-proof');
    Route::patch('/mentorship-registrations/{id}/verify-payment', [\App\Http\Controllers\MentorshipRegistrationController::class, 'verifyPayment'])->name('mentorship-registrations.verify-payment');
    Route::get('/mentorship-registrations/{id}/success', [\App\Http\Controllers\MentorshipRegistrationController::class, 'paymentSuccess'])->name('mentorship-registrations.success');

    // Mentor Management
    Route::patch('/mentor/registrations/{id}/approve', [\App\Http\Controllers\MentorshipManagementController::class, 'approve'])->name('mentor.registrations.approve');
    Route::patch('/mentor/registrations/{id}/reject', [\App\Http\Controllers\MentorshipManagementController::class, 'reject'])->name('mentor.registrations.reject');
    Route::post('/mentor/programs/{id}/sessions', [\App\Http\Controllers\MentorshipManagementController::class, 'storeSession'])->name('mentor.sessions.store');
    
    // Mentor Reviews
    Route::post('/mentors/{mentorId}/reviews', [\App\Http\Controllers\ReviewController::class, 'storeMentorReview'])->name('mentors.reviews.store');

    // Donations (requires auth)
    Route::post('/donations', [\App\Http\Controllers\ScholarshipDonationController::class, 'store'])->name('donations.store');
    Route::post('/donations/{id}/upload-proof', [\App\Http\Controllers\ScholarshipDonationController::class, 'uploadProof'])->name('donations.upload-proof');
    Route::patch('/donations/{id}/verify-payment', [\App\Http\Controllers\ScholarshipDonationController::class, 'verifyPayment'])->name('donations.verify-payment');
    Route::get('/donations/{id}/success', [\App\Http\Controllers\ScholarshipDonationController::class, 'paymentSuccess'])->name('donations.success');
});

require __DIR__.'/auth.php';