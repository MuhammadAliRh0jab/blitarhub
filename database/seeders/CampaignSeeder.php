<?php

namespace Database\Seeders;

use App\Models\Campaign;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    public function run(): void
    {
        $campaigns = [
            ['title'=>'Beasiswa Pendidikan S1 Teknik UB','target_amount'=>50000000,'current_amount'=>42500000,'beneficiary'=>'Rahmat Hidayat','donors_count'=>1240,'days_left'=>5,'description'=>"Rahmat Hidayat adalah mahasiswa berprestasi dari keluarga kurang mampu di Blitar. Ayahnya bekerja sebagai buruh tani.\n\nDana untuk biaya kuliah semester 5–8, biaya hidup, dan laptop.",'organizer'=>'Yayasan Pendidikan Blitar Cerdas','category'=>'Pendidikan Tinggi','updates'=>[['date'=>'2 Apr 2026','text'=>'Dana sudah 85% dari target. Rahmat mengucapkan terima kasih!'],['date'=>'28 Mar 2026','text'=>'UKT semester 5 sudah dilunasi.'],['date'=>'15 Mar 2026','text'=>'Campaign resmi dimulai.']],'donors'=>[['name'=>'Haji Rahmat','amount'=>5000000,'time'=>'2 jam lalu','message'=>'Semangat nak! Semoga ilmunya berkah.'],['name'=>'Ibu Suminah','amount'=>2000000,'time'=>'5 jam lalu','message'=>'Insya Allah lancar kuliahnya.'],['name'=>'Anonim','amount'=>500000,'time'=>'1 hari lalu','message'=>null],['name'=>'Rizky Aditya','amount'=>1000000,'time'=>'1 hari lalu','message'=>'Sukses selalu Rahmat!'],['name'=>'PT Sinotek Digital','amount'=>10000000,'time'=>'3 hari lalu','message'=>'Kami mendukung pendidikan anak Blitar.'],['name'=>'Anonim','amount'=>250000,'time'=>'4 hari lalu','message'=>null],['name'=>'Bu Kartini','amount'=>1500000,'time'=>'5 hari lalu','message'=>'Semoga menjadi sarjana berguna.'],['name'=>'Pak Bambang','amount'=>750000,'time'=>'1 minggu lalu','message'=>'Lanjutkan perjuanganmu!']]],
            ['title'=>'Bantu Pembangunan Atap PAUD Melati','target_amount'=>20000000,'current_amount'=>18000000,'beneficiary'=>'PAUD Melati Desa Sanan','donors_count'=>850,'days_left'=>12,'description'=>"PAUD Melati di Desa Sanan butuh renovasi atap yang sudah bocor parah. Saat hujan, kegiatan belajar terpaksa dihentikan.\n\nDana untuk penggantian rangka atap dan genteng baru.",'organizer'=>'Komunitas Peduli Blitar','category'=>'Infrastruktur Pendidikan','updates'=>[['date'=>'1 Apr 2026','text'=>'Material atap sudah dibeli. Pembangunan dimulai minggu depan!'],['date'=>'20 Mar 2026','text'=>'Survei lokasi bersama kontraktor sudah dilakukan.']],'donors'=>[['name'=>'Pak Lurah Sanan','amount'=>3000000,'time'=>'3 jam lalu','message'=>'Untuk anak-anak desa kami.'],['name'=>'Anonim','amount'=>1000000,'time'=>'1 hari lalu','message'=>'Semoga berkah.'],['name'=>'Karang Taruna RT 05','amount'=>2500000,'time'=>'2 hari lalu','message'=>'Dari pemuda-pemudi RT 05!'],['name'=>'Bu Endang','amount'=>500000,'time'=>'4 hari lalu','message'=>'Kasihan anak-anak kalau hujan.'],['name'=>'Anonim','amount'=>200000,'time'=>'5 hari lalu','message'=>null]]],
            ['title'=>'Laptop untuk Siswa OSN Blitar','target_amount'=>8000000,'current_amount'=>2000000,'beneficiary'=>'Siti Nurhaliza','donors_count'=>45,'days_left'=>20,'description'=>"Siti Nurhaliza, siswi SMAN 1 Blitar peraih Juara 1 OSN Informatika, belum memiliki laptop sendiri. Selama ini ia meminjam laptop guru.\n\nDengan laptop baru, Siti bisa berlatih untuk kompetisi internasional.",'organizer'=>'Alumni SMAN 1 Blitar','category'=>'Peralatan Belajar','updates'=>[['date'=>'3 Apr 2026','text'=>'Campaign baru dimulai! Siti sangat berterima kasih.']],'donors'=>[['name'=>'Alumni Angkatan 2020','amount'=>1000000,'time'=>'6 jam lalu','message'=>'Bangga punya adik kelas juara OSN!'],['name'=>'Anonim','amount'=>500000,'time'=>'1 hari lalu','message'=>'Go Siti! Harumkan nama Blitar!'],['name'=>'Pak Guru Informatika','amount'=>300000,'time'=>'2 hari lalu','message'=>'Dari guru yang mengajarmu.']]],
            ['title'=>'Beasiswa D3 Keperawatan Anak Yatim','target_amount'=>15000000,'current_amount'=>11200000,'beneficiary'=>'Muhamad Faizal','donors_count'=>630,'days_left'=>8,'description'=>"Faizal, yatim piatu sejak usia 8 tahun, kini ingin melanjutkan pendidikan di D3 Keperawatan Poltekkes Malang.\n\nDana untuk UKT 3 tahun, seragam, dan alat praktik keperawatan.",'organizer'=>'Yayasan Rumah Harapan Blitar','category'=>'Pendidikan Vokasi','updates'=>[['date'=>'4 Apr 2026','text'=>'74% target tercapai! Mari bantu Faizal menyelesaikan pendidikannya.'],['date'=>'25 Mar 2026','text'=>'Faizal diterima di Poltekkes Malang. Alhamdulillah!']],'donors'=>[['name'=>'Yayasan Baitul Maal','amount'=>5000000,'time'=>'1 jam lalu','message'=>'Amanah dari para donatur kami.'],['name'=>'Komunitas Muslimah Blitar','amount'=>2000000,'time'=>'4 jam lalu','message'=>'Semangat menuntut ilmu, Faizal!'],['name'=>'Anonim','amount'=>500000,'time'=>'12 jam lalu','message'=>null],['name'=>'Pak RT Kepanjen','amount'=>1000000,'time'=>'2 hari lalu','message'=>'Dari warga RT 03, semangat!'],['name'=>'Anonim','amount'=>300000,'time'=>'3 hari lalu','message'=>null],['name'=>'Bu Haji Siti','amount'=>1500000,'time'=>'5 hari lalu','message'=>'Semoga ilmunya bermanfaat untuk sesama.']]],
            ['title'=>'Renovasi Perpustakaan SDN Nglegok','target_amount'=>30000000,'current_amount'=>7500000,'beneficiary'=>'SDN Nglegok 1 Blitar','donors_count'=>180,'days_left'=>30,'description'=>"Perpustakaan SDN Nglegok 1 rusak parah akibat banjir 2025. Ratusan buku rusak dan rak hancur.\n\nDana untuk renovasi ruangan, rak buku baru, dan pengadaan 500+ buku bacaan anak.",'organizer'=>'Dinas Pendidikan Kab. Blitar','category'=>'Infrastruktur Pendidikan','updates'=>[['date'=>'1 Apr 2026','text'=>'25% target tercapai dalam 2 minggu pertama. Luar biasa semangat para donatur!'],['date'=>'18 Mar 2026','text'=>'Campaign resmi diluncurkan bersama Bupati Blitar.']],'donors'=>[['name'=>'PT Bank Jatim','amount'=>5000000,'time'=>'1 hari lalu','message'=>'Investasi kami untuk masa depan anak Blitar.'],['name'=>'Anonim','amount'=>500000,'time'=>'2 hari lalu','message'=>null],['name'=>'DPRD Kab. Blitar','amount'=>2000000,'time'=>'3 hari lalu','message'=>'Untuk generasi penerus bangsa.'],['name'=>'Guru-guru SDN Nglegok','amount'=>200000,'time'=>'4 hari lalu','message'=>'Dari Bapak/Ibu guru yang peduli.']]],
        ];

        foreach ($campaigns as $data) {
            $campaign = Campaign::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'beneficiary' => $data['beneficiary'],
                'organizer' => $data['organizer'],
                'category' => $data['category'],
                'target_amount' => $data['target_amount'],
                'current_amount' => $data['current_amount'],
                'donors_count' => $data['donors_count'],
                'days_left' => $data['days_left'],
            ]);

            foreach ($data['updates'] as $i => $u) {
                $campaign->updates()->create(['date_label' => $u['date'], 'text' => $u['text'], 'sort_order' => $i]);
            }

            foreach ($data['donors'] as $d) {
                $campaign->donations()->create([
                    'donor_name' => $d['name'],
                    'amount' => $d['amount'],
                    'time_label' => $d['time'],
                    'message' => $d['message'],
                    'is_anonymous' => ($d['name'] === 'Anonim'),
                ]);
            }
        }
    }
}
