<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\MentorExperience;
use App\Models\TalentProject;
use App\Models\TalentExperience;
use App\Models\MentorEducation;
use App\Models\TalentEducation;
use App\Models\Skill;
use App\Models\Mentor;
use App\Models\Talent;

class ProfileActivityController extends Controller
{
    public function addMentorExperience(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->mentor) {
            return back()->with('error', 'Anda belum terdaftar sebagai Mentor.');
        }

        $request->validate([
            'role' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'period' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        MentorExperience::create([
            'mentor_id' => $user->mentor->id,
            'role' => $request->role,
            'company' => $request->company,
            'period' => $request->period,
            'description' => $request->description,
            'sort_order' => 0,
        ]);

        return back()->with('status', 'Pengalaman Mentor berhasil ditambahkan.');
    }

    public function addTalentExperience(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->talent) {
            return back()->with('error', 'Anda belum terdaftar sebagai Talent.');
        }

        $request->validate([
            'role' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'period' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        TalentExperience::create([
            'talent_id' => $user->talent->id,
            'role' => $request->role,
            'company' => $request->company,
            'period' => $request->period,
            'description' => $request->description,
            'sort_order' => 0,
        ]);

        return back()->with('status', 'Pengalaman Talent berhasil ditambahkan.');
    }

    public function addEducation(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'year' => 'nullable|string|max:255',
            'gpa' => 'nullable|string|max:10',
            'type' => 'required|in:mentor,talent',
        ]);

        if ($request->type === 'mentor') {
            if (!$user->mentor) return back()->with('error', 'Mentor tidak ditemukan.');
            MentorEducation::create([
                'mentor_id' => $user->mentor->id,
                'institution' => $request->institution,
                'degree' => $request->degree,
                'year' => $request->year,
                'gpa' => $request->gpa,
            ]);
        } else {
            if (!$user->talent) return back()->with('error', 'Talent tidak ditemukan.');
            TalentEducation::create([
                'talent_id' => $user->talent->id,
                'institution' => $request->institution,
                'degree' => $request->degree,
                'year' => $request->year,
                'gpa' => $request->gpa,
            ]);
        }

        return back()->with('status', 'Pendidikan berhasil ditambahkan.');
    }

    public function updateSkills(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->talent) {
            return back()->with('error', 'Anda belum terdaftar sebagai Talent.');
        }

        $request->validate([
            'skills' => 'required|string',
        ]);

        $skillNames = array_map('trim', explode(',', $request->skills));
        $skillIds = [];

        foreach ($skillNames as $name) {
            if (empty($name)) continue;
            $skill = Skill::firstOrCreate(['name' => $name]);
            $skillIds[] = $skill->id;
        }

        $user->talent->skills()->sync($skillIds);

        return back()->with('status', 'Keahlian berhasil diperbarui.');
    }

    public function updateExpertise(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->mentor) {
            return back()->with('error', 'Anda belum terdaftar sebagai Mentor.');
        }

        $request->validate([
            'expertise' => 'required|string|max:255',
        ]);

        $user->mentor->update([
            'expertise' => $request->expertise,
        ]);

        return back()->with('status', 'Bidang keahlian berhasil diperbarui.');
    }

    public function updateBankDetails(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->mentor) {
            return back()->with('error', 'Anda belum terdaftar sebagai Mentor.');
        }

        $request->validate([
            'bank_name' => 'required|string|max:255',
            'bank_account_number' => 'required|string|max:255',
            'bank_account_name' => 'required|string|max:255',
        ]);

        $user->mentor->update([
            'bank_name' => $request->bank_name,
            'bank_account_number' => $request->bank_account_number,
            'bank_account_name' => $request->bank_account_name,
        ]);

        return back()->with('status', 'Rekening Bank berhasil diperbarui.');
    }

    public function addTalentProject(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->talent) {
            return back()->with('error', 'Anda belum terdaftar sebagai Talent.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tech' => 'nullable|string',
        ]);

        // tech is received as comma-separated string, convert to array for json column
        $techArray = array_map('trim', explode(',', $request->tech ?? ''));
        if (empty(array_filter($techArray))) {
            $techArray = [];
        }

        TalentProject::create([
            'talent_id' => $user->talent->id,
            'emoji' => '💻',
            'name' => $request->name,
            'description' => $request->description,
            'tech' => $techArray,
            'sort_order' => 0,
        ]);

        return back()->with('status', 'Portofolio Talent berhasil ditambahkan.');
    }
    public function deleteMentorExperience(MentorExperience $experience)
    {
        if ($experience->mentor_id !== Auth::user()->mentor->id) abort(403);
        $experience->delete();
        return back()->with('status', 'Pengalaman berhasil dihapus.');
    }

    public function deleteTalentExperience(TalentExperience $experience)
    {
        if ($experience->talent_id !== Auth::user()->talent->id) abort(403);
        $experience->delete();
        return back()->with('status', 'Pengalaman berhasil dihapus.');
    }

    public function deleteMentorEducation(MentorEducation $education)
    {
        if ($education->mentor_id !== Auth::user()->mentor->id) abort(403);
        $education->delete();
        return back()->with('status', 'Pendidikan berhasil dihapus.');
    }

    public function deleteTalentEducation(TalentEducation $education)
    {
        if ($education->talent_id !== Auth::user()->talent->id) abort(403);
        $education->delete();
        return back()->with('status', 'Pendidikan berhasil dihapus.');
    }

    public function deleteTalentProject(TalentProject $project)
    {
        if ($project->talent_id !== Auth::user()->talent->id) abort(403);
        $project->delete();
        return back()->with('status', 'Proyek berhasil dihapus.');
    }

    public function addAchievement(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'year' => 'nullable|string|max:255',
            'emoji' => 'nullable|string|max:10',
            'type' => 'required|in:mentor,talent',
        ]);

        $data = [
            'title' => $request->title,
            'issuer' => $request->issuer,
            'year' => $request->year,
            'emoji' => $request->emoji ?? '🏆',
        ];

        if ($request->type === 'mentor') {
            if (!$user->mentor) return back()->with('error', 'Mentor tidak ditemukan.');
            $user->mentor->achievements()->create($data);
        } else {
            if (!$user->talent) return back()->with('error', 'Talent tidak ditemukan.');
            $user->talent->achievements()->create($data);
        }

        return back()->with('status', 'Pencapaian berhasil ditambahkan.');
    }

    public function deleteMentorAchievement(\App\Models\MentorAchievement $achievement)
    {
        if ($achievement->mentor_id !== Auth::user()->mentor->id) abort(403);
        $achievement->delete();
        return back()->with('status', 'Pencapaian berhasil dihapus.');
    }

    public function deleteTalentAchievement(\App\Models\TalentAchievement $achievement)
    {
        if ($achievement->talent_id !== Auth::user()->talent->id) abort(403);
        $achievement->delete();
        return back()->with('status', 'Pencapaian berhasil dihapus.');
    }

    public function updateBio(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'bio' => 'required|string',
        ]);

        if ($user->talent) {
            $user->talent->update(['bio' => $request->bio]);
        }

        if ($user->mentor) {
            $user->mentor->update(['bio' => $request->bio]);
        }

        return back()->with('status', 'Bio berhasil diperbarui.');
    }
}
