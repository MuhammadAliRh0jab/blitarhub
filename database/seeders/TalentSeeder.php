<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Talent;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class TalentSeeder extends Seeder
{
    public function run(): void
    {
        $talents = [
            ['name'=>'Budi Santoso','email'=>'budi@blitarhub.com','headline'=>'Senior React Developer','location'=>'Blitar, Jawa Timur','rating'=>4.9,'reviews_count'=>124,'jobs_completed'=>87,'connections'=>500,'bio'=>"Software Engineer 5+ tahun. Fokus membangun UI yang cepat dan scalable.\n\nTerbuka untuk freelance, kolaborasi startup, dan konsultasi teknis.",'skills'=>['React','Node.js','Tailwind','TypeScript','PostgreSQL'],'experience'=>[['role'=>'Senior Frontend Engineer','company'=>'Tokopedia','period'=>'Jan 2023 – Kini','desc'=>'Memimpin tim 5 engineer, meningkatkan performa 40%.'],['role'=>'Frontend Developer','company'=>'Bukalapak','period'=>'Mar 2021 – Des 2022','desc'=>'Membangun UI library internal untuk 12 squad.']],'education'=>[['institution'=>'Universitas Brawijaya','degree'=>'S1 Teknik Informatika','year'=>'2015–2019','gpa'=>'3.78'],['institution'=>'SMAN 1 Blitar','degree'=>'IPA','year'=>'2012–2015','gpa'=>null]],'achievements'=>[['icon'=>'🏆','title'=>'Juara 1 Hackathon Nasional BRI','issuer'=>'Bank BRI','year'=>'2023'],['icon'=>'📜','title'=>'AWS Certified Solutions Architect','issuer'=>'AWS','year'=>'2022']],'projects'=>[['emoji'=>'🛒','name'=>'TokoKu E-Commerce','desc'=>'Platform e-commerce full-stack dengan Midtrans.','tech'=>['React','Node.js','PostgreSQL']],['emoji'=>'📊','name'=>'DashboardPro','desc'=>'Dashboard analitik real-time untuk UMKM.','tech'=>['Next.js','Chart.js','Supabase']]],'reviews'=>[['name'=>'Rizky Aditya','stars'=>5,'comment'=>'Budi bekerja cepat, selesai sebelum deadline!'],['name'=>'Sari Indah','stars'=>5,'comment'=>'Komunikasi sangat baik. Highly recommended.']]],
            ['name'=>'Siti Rahmawati','email'=>'siti@blitarhub.com','headline'=>'UI/UX Designer','location'=>'Jakarta, Indonesia','rating'=>5.0,'reviews_count'=>89,'jobs_completed'=>45,'connections'=>380,'bio'=>"Product Designer eks-Gojek. Spesialis conversion-focused design.\n\nTerbuka untuk redesign aplikasi dan konsultasi desain.",'skills'=>['Figma','Prototyping','User Research','Design System','Framer'],'experience'=>[['role'=>'Senior Product Designer','company'=>'Gojek','period'=>'Jan 2021 – Mar 2024','desc'=>'Redesign GoPay flow, meningkatkan conversion 25%.']],'education'=>[['institution'=>'Institut Teknologi Bandung','degree'=>'S1 Desain Komunikasi Visual','year'=>'2015–2019','gpa'=>'3.85']],'achievements'=>[['icon'=>'🏆','title'=>'Best Design Award UXindo 2023','issuer'=>'UX Indonesia','year'=>'2023']],'projects'=>[['emoji'=>'💳','name'=>'GoPay Redesign','desc'=>'Redesign flow pembayaran 50 juta pengguna.','tech'=>['Figma','Principle']]],'reviews'=>[['name'=>'Ahmad Fikri','stars'=>5,'comment'=>'Conversion naik drastis setelah redesign!']]],
            ['name'=>'Kevin Sanjaya','email'=>'kevin@blitarhub.com','headline'=>'Backend Engineer (Go/Laravel)','location'=>'Surabaya, Indonesia','rating'=>4.8,'reviews_count'=>56,'jobs_completed'=>30,'connections'=>290,'bio'=>'Backend engineer obsesi terhadap performa dan skalabilitas.','skills'=>['Golang','Laravel','Docker','Kubernetes','gRPC'],'experience'=>[['role'=>'Backend Engineer','company'=>'Shopee','period'=>'Feb 2022 – Kini','desc'=>'Payment service 2M+ transaksi/hari.']],'education'=>[['institution'=>'ITS Surabaya','degree'=>'S1 Teknik Informatika','year'=>'2016–2020','gpa'=>'3.72']],'achievements'=>[['icon'=>'📜','title'=>'Certified Kubernetes Administrator','issuer'=>'CNCF','year'=>'2023']],'projects'=>[['emoji'=>'⚡','name'=>'PaymentHub API','desc'=>'Microservice payment high-throughput.','tech'=>['Golang','gRPC','Redis']]],'reviews'=>[['name'=>'Dian P.','stars'=>5,'comment'=>'API super cepat dan well-tested!']]],
            ['name'=>'Dian Pratiwi','email'=>'dian@blitarhub.com','headline'=>'Digital Marketing Specialist','location'=>'Blitar, Jawa Timur','rating'=>4.9,'reviews_count'=>210,'jobs_completed'=>150,'connections'=>720,'bio'=>'Digital marketer bersertifikat Google. Track record meningkatkan omzet klien 300%.','skills'=>['SEO','Google Ads','Meta Ads','Copywriting','Analytics'],'experience'=>[['role'=>'Head of Digital Marketing','company'=>'Blibli','period'=>'Jun 2022 – Kini','desc'=>'Mengelola budget iklan Rp 2M/bulan, ROAS 4.5x.']],'education'=>[['institution'=>'Universitas Airlangga','degree'=>'S1 Manajemen Pemasaran','year'=>'2014–2018','gpa'=>'3.65']],'achievements'=>[['icon'=>'📜','title'=>'Google Ads Certified Professional','issuer'=>'Google','year'=>'2023']],'projects'=>[['emoji'=>'📈','name'=>'SEO Overhaul TokoLokal','desc'=>'Traffic +300% dalam 6 bulan.','tech'=>['Ahrefs','GSC','GA4']]],'reviews'=>[['name'=>'Bu Suminah','stars'=>5,'comment'=>'Omzet naik 3x lipat dalam 2 bulan!']]],
            ['name'=>'Agus Firmansyah','email'=>'agus@blitarhub.com','headline'=>'Mobile Developer (Flutter)','location'=>'Malang, Jawa Timur','rating'=>4.8,'reviews_count'=>67,'jobs_completed'=>41,'connections'=>215,'bio'=>'Mobile developer spesialis Flutter dengan 4 tahun pengalaman. Telah publish 8 app di Play Store dan App Store.','skills'=>['Flutter','Dart','Firebase','REST API','GetX'],'experience'=>[['role'=>'Flutter Developer','company'=>'Gojek','period'=>'Mar 2022 – Kini','desc'=>'Mengembangkan fitur GoFood driver app.'],['role'=>'Junior Mobile Dev','company'=>'Startup Fintech','period'=>'Jan 2020 – Feb 2022','desc'=>'Membangun aplikasi tabungan digital.']],'education'=>[['institution'=>'Universitas Negeri Malang','degree'=>'S1 Teknik Informatika','year'=>'2016–2020','gpa'=>'3.68']],'achievements'=>[['icon'=>'🏆','title'=>'Best App - Google Dev Challenge','issuer'=>'Google','year'=>'2022'],['icon'=>'📜','title'=>'Flutter Certified Developer','issuer'=>'Google','year'=>'2023']],'projects'=>[['emoji'=>'📱','name'=>'KasKita Finance App','desc'=>'Aplikasi manajemen keuangan keluarga.','tech'=>['Flutter','Firebase','Hive']],['emoji'=>'🛵','name'=>'RuteKu Navigation','desc'=>'Navigasi offline untuk area pedesaan.','tech'=>['Flutter','OpenStreetMap']]],'reviews'=>[['name'=>'Pak Joko','stars'=>5,'comment'=>'App-nya smooth dan bug-free. Luar biasa!'],['name'=>'Rina S.','stars'=>5,'comment'=>'Komunikatif dan hasil kerja memuaskan.']]],
            ['name'=>'Putri Ayu Lestari','email'=>'putri@blitarhub.com','headline'=>'Data Scientist & ML Engineer','location'=>'Bandung, Jawa Barat','rating'=>4.9,'reviews_count'=>43,'jobs_completed'=>28,'connections'=>340,'bio'=>'Data Scientist dengan keahlian machine learning dan analisis data besar. Eks-researcher di BRIN.','skills'=>['Python','TensorFlow','Scikit-learn','SQL','Tableau'],'experience'=>[['role'=>'Data Scientist','company'=>'Grab','period'=>'Jul 2022 – Kini','desc'=>'Membangun model prediksi demand driver.'],['role'=>'ML Researcher','company'=>'BRIN','period'=>'Jan 2021 – Jun 2022','desc'=>'Riset computer vision untuk agrikultur.']],'education'=>[['institution'=>'Universitas Gadjah Mada','degree'=>'S2 Ilmu Komputer','year'=>'2019–2021','gpa'=>'3.91']],'achievements'=>[['icon'=>'🏆','title'=>'Kaggle Master (Top 1%)','issuer'=>'Kaggle','year'=>'2023'],['icon'=>'📜','title'=>'TensorFlow Developer Certificate','issuer'=>'Google','year'=>'2022']],'projects'=>[['emoji'=>'🤖','name'=>'CropSense AI','desc'=>'Deteksi penyakit tanaman via foto dengan 94% akurasi.','tech'=>['TensorFlow','OpenCV','Flask']],['emoji'=>'📊','name'=>'DemandForecast','desc'=>'Prediksi permintaan logistik real-time.','tech'=>['Python','Prophet','Airflow']]],'reviews'=>[['name'=>'Dr. Arif','stars'=>5,'comment'=>'Modelnya sangat akurat. Publikasi kami jadi lebih kuat.'],['name'=>'StartupAI','stars'=>5,'comment'=>'Deliverable tepat waktu dan kodenya sangat rapi.']]],
        ];

        $talents2 = [
            ['name'=>'Hendra Wijaya','email'=>'hendra@blitarhub.com','headline'=>'DevOps & Cloud Engineer','location'=>'Jakarta, Indonesia','rating'=>4.7,'reviews_count'=>38,'jobs_completed'=>52,'connections'=>180,'bio'=>'DevOps engineer spesialis cloud infrastructure AWS dan GCP. Membantu startup scale dari 0 ke produksi.','skills'=>['AWS','Terraform','CI/CD','Linux','Ansible'],'experience'=>[['role'=>'Senior DevOps Engineer','company'=>'Traveloka','period'=>'Apr 2021 – Kini','desc'=>'Mengelola infrastruktur 99.99% uptime untuk 30M user.']],'education'=>[['institution'=>'Universitas Bina Nusantara','degree'=>'S1 Teknik Informatika','year'=>'2013–2017','gpa'=>'3.55']],'achievements'=>[['icon'=>'📜','title'=>'AWS Solutions Architect Professional','issuer'=>'AWS','year'=>'2023'],['icon'=>'📜','title'=>'HashiCorp Terraform Associate','issuer'=>'HashiCorp','year'=>'2022']],'projects'=>[['emoji'=>'☁️','name'=>'AutoScale Platform','desc'=>'Platform auto-scaling untuk 50+ microservices.','tech'=>['AWS','Terraform','K8s']]],'reviews'=>[['name'=>'CTO StartupX','stars'=>5,'comment'=>'Infrastrukturnya sangat solid dan cost-efficient.']]],
            ['name'=>'Maya Kusuma','email'=>'maya@blitarhub.com','headline'=>'Content Creator & Copywriter','location'=>'Blitar, Jawa Timur','rating'=>4.8,'reviews_count'=>156,'jobs_completed'=>230,'connections'=>890,'bio'=>'Copywriter berpengalaman 6 tahun. Spesialis brand storytelling dan konten viral untuk UMKM Indonesia.','skills'=>['Copywriting','Content Strategy','SEO Writing','Social Media','Canva'],'experience'=>[['role'=>'Senior Copywriter','company'=>'Ogilvy Indonesia','period'=>'Jan 2020 – Kini','desc'=>'Mengelola 20+ brand campaign nasional per tahun.']],'education'=>[['institution'=>'Universitas Padjadjaran','degree'=>'S1 Ilmu Komunikasi','year'=>'2014–2018','gpa'=>'3.72']],'achievements'=>[['icon'=>'🏆','title'=>'Citra Pariwara Gold Award','issuer'=>'Persatuan Perusahaan Periklanan Indonesia','year'=>'2022'],['icon'=>'🏆','title'=>'Best Copywriter Indonesia','issuer'=>'Marketing Association','year'=>'2023']],'projects'=>[['emoji'=>'✍️','name'=>'Kampanye Ramadan Aqua','desc'=>'Campaign viral dengan 15M views.','tech'=>['Copy','Strategy','Instagram']],['emoji'=>'📱','name'=>'UMKM Blitar Goes Digital','desc'=>'Konten sosmed untuk 30 UMKM lokal.','tech'=>['Canva','CapCut','TikTok']]],'reviews'=>[['name'=>'Bu Ratna UMKM','stars'=>5,'comment'=>'Maya paham betul cara bercerita yang menyentuh hati pelanggan.'],['name'=>'Brand Manager','stars'=>5,'comment'=>'Copy-nya selalu on-target dan on-time.']]],
            ['name'=>'Rizal Mahendra','email'=>'rizal@blitarhub.com','headline'=>'Blockchain & Web3 Developer','location'=>'Jakarta, Indonesia','rating'=>4.9,'reviews_count'=>29,'jobs_completed'=>17,'connections'=>410,'bio'=>'Web3 developer spesialis smart contract dan DeFi. Pernah audit 10+ protokol dengan total TVL $50M+.','skills'=>['Solidity','Ethereum','Web3.js','Hardhat','React'],'experience'=>[['role'=>'Lead Blockchain Developer','company'=>'Tokocrypto','period'=>'Jun 2021 – Kini','desc'=>'Membangun infrastruktur NFT marketplace.']],'education'=>[['institution'=>'Institut Teknologi Bandung','degree'=>'S1 Teknik Informatika','year'=>'2015–2019','gpa'=>'3.88']],'achievements'=>[['icon'=>'🏆','title'=>'ETHGlobal Hackathon Winner','issuer'=>'Ethereum Foundation','year'=>'2022'],['icon'=>'📜','title'=>'Certified Blockchain Developer','issuer'=>'Blockchain Council','year'=>'2021']],'projects'=>[['emoji'=>'🔗','name'=>'BlitarNFT Marketplace','desc'=>'Platform NFT khusus seni batik Blitar.','tech'=>['Solidity','IPFS','Next.js']]],'reviews'=>[['name'=>'DeFi Protocol','stars'=>5,'comment'=>'Smart contract audit-nya sangat thorough dan aman.']]],
            ['name'=>'Indah Permatasari','email'=>'indah@blitarhub.com','headline'=>'Graphic Designer & Illustrator','location'=>'Yogyakarta, Indonesia','rating'=>4.8,'reviews_count'=>98,'jobs_completed'=>175,'connections'=>620,'bio'=>'Graphic designer spesialis branding dan ilustrasi digital. Telah membantu 80+ brand membangun identitas visual.','skills'=>['Adobe Illustrator','Photoshop','Procreate','Branding','Motion Graphics'],'experience'=>[['role'=>'Senior Graphic Designer','company'=>'Tokopedia','period'=>'Mar 2020 – Kini','desc'=>'Lead designer untuk campaign seasonal.'],['role'=>'Freelance Illustrator','company'=>'Self-employed','period'=>'2016 – Kini','desc'=>'Ilustrasi buku anak dan brand identity.']],'education'=>[['institution'=>'Institut Seni Indonesia Yogyakarta','degree'=>'S1 Desain Komunikasi Visual','year'=>'2014–2018','gpa'=>'3.79']],'achievements'=>[['icon'=>'🏆','title'=>'Best Indonesian Illustrator 2023','issuer'=>'Asosiasi Desainer Indonesia','year'=>'2023'],['icon'=>'🥇','title'=>'Red Dot Design Award','issuer'=>'Red Dot','year'=>'2022']],'projects'=>[['emoji'=>'🎨','name'=>'Brand Identity KopiKita','desc'=>'Identitas visual lengkap untuk chain kopi 50+ gerai.','tech'=>['Illustrator','Photoshop','InDesign']],['emoji'=>'📚','name'=>'Buku Ilustrasi Anak','desc'=>'3 buku anak yang sudah diterbitkan Gramedia.','tech'=>['Procreate','Canva']]],'reviews'=>[['name'=>'CEO KopiKita','stars'=>5,'comment'=>'Brand kami jadi dikenal nasional. Indah luar biasa!'],['name'=>'Penerbit Gramedia','stars'=>5,'comment'=>'Ilustrasinya memukau, anak-anak sangat suka.']]],
            ['name'=>'Farhan Azis','email'=>'farhan@blitarhub.com','headline'=>'Cybersecurity Expert','location'=>'Jakarta, Indonesia','rating'=>4.9,'reviews_count'=>31,'jobs_completed'=>22,'connections'=>260,'bio'=>'Cybersecurity consultant bersertifikat CEH dan OSCP. Spesialis vulnerability assessment dan security audit.','skills'=>['Penetration Testing','SIEM','ISO 27001','OWASP','Burp Suite'],'experience'=>[['role'=>'Security Engineer','company'=>'Bank Central Asia','period'=>'Aug 2021 – Kini','desc'=>'Memimpin tim keamanan siber untuk 50M+ nasabah.']],'education'=>[['institution'=>'Universitas Indonesia','degree'=>'S1 Ilmu Komputer','year'=>'2016–2020','gpa'=>'3.83']],'achievements'=>[['icon'=>'📜','title'=>'OSCP - Offensive Security','issuer'=>'Offensive Security','year'=>'2022'],['icon'=>'📜','title'=>'CEH - Certified Ethical Hacker','issuer'=>'EC-Council','year'=>'2021']],'projects'=>[['emoji'=>'🔐','name'=>'BCA Security Audit','desc'=>'Audit keamanan aplikasi mobile banking.','tech'=>['Burp Suite','Metasploit','Nmap']]],'reviews'=>[['name'=>'CISO Fintech','stars'=>5,'comment'=>'Farhan menemukan 3 critical vulnerability yang lolos review internal.']]],
            ['name'=>'Lestari Dewi','email'=>'lestari@blitarhub.com','headline'=>'Project Manager & Scrum Master','location'=>'Blitar, Jawa Timur','rating'=>4.7,'reviews_count'=>84,'jobs_completed'=>63,'connections'=>450,'bio'=>'Project Manager bersertifikat PMP dengan 7 tahun pengalaman mengelola proyek IT skala enterprise.','skills'=>['Scrum','Jira','Project Planning','Stakeholder Management','Agile'],'experience'=>[['role'=>'Senior Project Manager','company'=>'Telkom Indonesia','period'=>'Jan 2019 – Kini','desc'=>'Mengelola 8 proyek digital transformasi senilai Rp 50M+.']],'education'=>[['institution'=>'Universitas Brawijaya','degree'=>'S1 Sistem Informasi','year'=>'2013–2017','gpa'=>'3.70']],'achievements'=>[['icon'=>'📜','title'=>'PMP - Project Management Professional','issuer'=>'PMI','year'=>'2021'],['icon'=>'📜','title'=>'Certified Scrum Master','issuer'=>'Scrum Alliance','year'=>'2020']],'projects'=>[['emoji'=>'📋','name'=>'Digitalisasi Pemkab Blitar','desc'=>'Koordinasi 12 vendor untuk digitalisasi layanan publik.','tech'=>['Jira','Confluence','MS Project']]],'reviews'=>[['name'=>'Dinas IT Blitar','stars'=>5,'comment'=>'Proyek selesai tepat waktu dan sesuai anggaran.']]],
        ];

        foreach (array_merge($talents, $talents2) as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt('password'),
            ]);

            $talent = Talent::create([
                'user_id' => $user->id,
                'headline' => $data['headline'],
                'bio' => $data['bio'],
                'location' => $data['location'],
                'rating' => $data['rating'],
                'reviews_count' => $data['reviews_count'],
                'jobs_completed' => $data['jobs_completed'],
                'connections' => $data['connections'],
            ]);

            // Skills
            foreach ($data['skills'] as $skillName) {
                $skill = Skill::firstOrCreate(['name' => $skillName]);
                $talent->skills()->attach($skill->id);
            }

            // Experience
            foreach ($data['experience'] as $i => $exp) {
                $talent->experiences()->create([
                    'role' => $exp['role'], 'company' => $exp['company'],
                    'period' => $exp['period'], 'description' => $exp['desc'], 'sort_order' => $i,
                ]);
            }

            // Education
            foreach ($data['education'] as $i => $edu) {
                $talent->educations()->create([
                    'institution' => $edu['institution'], 'degree' => $edu['degree'],
                    'year' => $edu['year'], 'gpa' => $edu['gpa'], 'sort_order' => $i,
                ]);
            }

            // Achievements
            foreach ($data['achievements'] as $i => $ach) {
                $talent->achievements()->create([
                    'icon' => $ach['icon'], 'title' => $ach['title'],
                    'issuer' => $ach['issuer'], 'year' => $ach['year'], 'sort_order' => $i,
                ]);
            }

            // Projects
            foreach ($data['projects'] as $i => $proj) {
                $talent->projects()->create([
                    'emoji' => $proj['emoji'], 'name' => $proj['name'],
                    'description' => $proj['desc'], 'tech' => $proj['tech'], 'sort_order' => $i,
                ]);
            }

            // Reviews
            foreach ($data['reviews'] as $rev) {
                $talent->clientReviews()->create([
                    'reviewer_name' => $rev['name'], 'stars' => $rev['stars'], 'comment' => $rev['comment'],
                ]);
            }
        }
    }
}
