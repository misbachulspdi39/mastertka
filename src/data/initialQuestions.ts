import { Question, StudyMaterial, SubjectId } from '../types';

export const SUBJECT_META: Record<
  SubjectId,
  {
    label: string;
    shortLabel: string;
    description: string;
    image: string;
    accentColor: string;
  }
> = {
  literasi: {
    label: 'Literasi Membaca',
    shortLabel: 'Literasi',
    description:
      'Memahami teks informasi, sastra budaya DIY, gagasan pokok, dan penalaran inferensial.',
    image: '/src/assets/images/card_literasi_diy_1795488089255.jpg',
    accentColor: 'sky',
  },
  numerasi: {
    label: 'Numerasi & Matematika',
    shortLabel: 'Numerasi',
    description:
      'Bilangan, aljabar, geometri, pengukuran, serta pemecahan masalah berbasis data.',
    image: '/src/assets/images/card_numerasi_tka_1795488090196.jpg',
    accentColor: 'amber',
  },
  sains: {
    label: 'Literasi Sains & IPA',
    shortLabel: 'Sains',
    description:
      'Ekosistem alam Jogja, perubahan wujud, energi, gaya, serta proses ilmiah terapan.',
    image: '/src/assets/images/card_sains_merapi_1795488090488.jpg',
    accentColor: 'emerald',
  },
  inggris: {
    label: 'Bahasa Inggris (TKAD SMP)',
    shortLabel: 'B. Inggris',
    description:
      'Reading comprehension, functional texts (notice, announcement, label), dan grammar kontekstual TKAD DIY.',
    image: '/src/assets/images/card_literasi_diy_1795488089255.jpg',
    accentColor: 'indigo',
  },
};

export const DIY_TARGET_SCHOOLS: Record<'SD' | 'SMP', string[]> = {
  SD: [
    'SMPN 5 Yogyakarta',
    'SMPN 8 Yogyakarta',
    'SMPN 1 Yogyakarta',
    'SMPN 2 Yogyakarta',
    'SMPN 4 Pakem Sleman',
    'SMPN 1 Bantul',
  ],
  SMP: [
    'SMAN 1 Yogyakarta (Teladan)',
    'SMAN 3 Yogyakarta (Padmanaba)',
    'SMAN 8 Yogyakarta (Delayota)',
    'SMAN 2 Yogyakarta',
    'MAN 1 Yogyakarta',
    'SMKN 2 Yogyakarta',
  ],
};

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  // ================= SD KELAS 6 =================
  {
    id: 'mat-sd-lit-1',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Ide Pokok & Simpulan Teks',
    title: 'Menemukan Ide Pokok dan Makna Tersirat Teks Budaya',
    summary:
      'Di soal TKAD SD DIY, bacaan sering mengangkat kearifan lokal seperti kerajinan batik, upacara adat, atau tempat bersejarah. Kunci utamanya adalah membedakan kalimat utama (umum) dan kalimat penjelas (rinci).',
    keyPoints: [
      'Paragraf deduktif menaruh kalimat utama di awal paragraf, sedangkan induktif di akhir paragraf.',
      'Kalimat penjelas biasanya berisi contoh, angka, nama tempat, atau alasan pendukung.',
      'Simpulan yang tepat harus merangkum isi seluruh paragraf tanpa menambah opini di luar teks.',
    ],
    formulaOrRule: 'Ide Pokok = Subjek + Gagasan Inti yang dibahas berulang di kalimat penjelas.',
    jogjaContextNote:
      'Sering muncul pada bacaan tentang Kampung Batik Giriloyo, Museum Benteng Vredeburg, atau Pasar Beringharjo.',
    estimatedMinutes: 6,
  },
  {
    id: 'mat-sd-lit-2',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Amanat & Unsur Intrinsik Cerita',
    title: 'Menelaah Tokoh, Latar, dan Amanat Cerita Anak',
    summary:
      'Soal sastra TKAD mengukur kemampuan menangkap pesan moral (amanat) dari tindakan tokoh dalam cerita fabel maupun cerita rakyat Nusantara.',
    keyPoints: [
      'Watak tokoh tidak selalu disebut langsung, perhatikan dialog dan tindakan tokoh saat menghadapi masalah.',
      'Amanat selalu selaras dengan akibat baik/buruk yang dialami tokoh di akhir cerita.',
      'Perhatikan kata kunci perubahan sikap tokoh untuk menentukan nilai keteladanan.',
    ],
    formulaOrRule: 'Konflik Tokoh + Cara Menyelesaikan = Pesan Moral (Amanat)',
    jogjaContextNote:
      'Teks cerita rakyat atau kisah keseharian anak di pedesaan Sleman dan Bantul sering dipakai sebagai stimulus.',
    estimatedMinutes: 5,
  },
  {
    id: 'mat-sd-num-1',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Pecahan, Persen, & Perbandingan',
    title: 'Operasi Pecahan Bertingkat dan Persentase Kontekstual',
    summary:
      'Soal numerasi SD Kelas 6 kerap menggabungkan satuan kuantitas (kodi, lusin, rim) dengan persentase dan pecahan dari sisa.',
    keyPoints: [
      'Konversi satuan dahulu sebelum menghitung (1 kodi = 20 buah, 1 lusin = 12 buah, 1 rim = 500 lembar).',
      'Hati-hati frasa "dari jumlah awal" berbeda makna dengan "dari sisanya".',
      'Ubah persen dan desimal ke bentuk pecahan paling sederhana agar mudah dicoret.',
    ],
    formulaOrRule: 'Bagian dari Sisa = Pecahan × (Total Awal − Bagian Terpakai Pertama)',
    jogjaContextNote:
      'Konteksnya sering berupa produksi kain batik, stok bakpia, atau panen salak pondoh Sleman.',
    estimatedMinutes: 8,
  },
  {
    id: 'mat-sd-num-2',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Kecepatan, Jarak, & Geometri Dasar',
    title: 'Segitiga Jarak-Kecepatan-Waktu serta Pengubinan Bangun Datar',
    summary:
      'Pastikan seluruh satuan waktu dan panjang seragam sebelum memakai rumus kecepatan maupun menghitung jumlah ubin pada lantai bangun datar.',
    keyPoints: [
      'Rumus JKW: Jarak = Kecepatan × Waktu; Waktu = Jarak ÷ Kecepatan.',
      'Jika waktu hasil pembagian berbentuk desimal jam (misal 0,25 jam), kalikan 60 untuk menjadi menit.',
      'Jumlah ubin = Luas Ruangan (dalam cm²) ÷ Luas 1 Ubin (dalam cm²).',
    ],
    formulaOrRule: 't = s ÷ v  |  Banyak Ubin = Luas Lantai ÷ Luas 1 Ubin',
    jogjaContextNote:
      'Sering memakai rute bus Trans Jogja atau pemasangan tegel kunci klasik pada pendopo rumah Jogja.',
    estimatedMinutes: 8,
  },
  {
    id: 'mat-sd-sai-1',
    grade: 'SD',
    subject: 'sains',
    topic: 'Ekosistem & Rantai Makanan',
    title: 'Keseimbangan Rantai Makanan dan Adaptasi Makhluk Hidup',
    summary:
      'Perubahan populasi satu makhluk hidup di ekosistem sawah atau hutan akan berdampak berantai ke tingkat trofik sebelum dan sesudahnya.',
    keyPoints: [
      'Produsen (tumbuhan hijau) selalu menjadi sumber energi awal rantai makanan.',
      'Jika populasi predator menurun drastis, mangsa di bawahnya melonjak lalu produsen menurun.',
      'Adaptasi morfologi, fisiologi, dan tingkah laku membantu makhluk hidup bertahan di habitatnya.',
    ],
    formulaOrRule: 'Produsen → Konsumen I (Herbivor) → Konsumen II (Karnivor) → Pengurai',
    jogjaContextNote:
      'Studi kasus ekosistem persawahan Bantul, ekosistem lereng Merapi, dan mangrove Kulon Progo.',
    estimatedMinutes: 6,
  },
  {
    id: 'mat-sd-sai-2',
    grade: 'SD',
    subject: 'sains',
    topic: 'Sifat Benda, Kalor, & Siklus Air',
    title: 'Perubahan Wujud Zat, Perpindahan Kalor, dan Daur Air',
    summary:
      'Membedakan perubahan wujud yang menyerap kalor (mencair, menguap, menyublim) dan yang melepaskan kalor (membeku, mengembun, mengkristal).',
    keyPoints: [
      'Konduksi: perpindahan panas melalui zat padat tanpa disertai perpindahan partikelnya.',
      'Konveksi: disertai aliran partikel zat cair atau gas (angin darat, angin laut, air mendidih).',
      'Radiasi: pancaran panas tanpa zat perantara (panas matahari sampai ke bumi).',
    ],
    formulaOrRule: 'Serap Kalor: Mencair, Menguap, Menyublim  |  Lepas Kalor: Membeku, Mengembun',
    jogjaContextNote:
      'Contoh nyata seperti proses pembuatan garam pantai selatan, penguapan air di Kali Code, dan menyeduh wedang.',
    estimatedMinutes: 7,
  },

  // ================= SMP KELAS 9 =================
  {
    id: 'mat-smp-lit-1',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Teks Informasi & Evaluasi Argumen',
    title: 'Menganalisis Fakta, Opini, dan Struktur Teks Eksposisi/Laporan',
    summary:
      'Soal TKAD SMP menuntut ketelitian membedakan fakta terverifikasi (angka, peristiwa nyata) dengan opini penulis, serta menilai kekuatan argumen.',
    keyPoints: [
      'Fakta ditandai data kuantitatif, tanggal, lokasi spesifik, atau kejadian yang dapat dibuktikan.',
      'Opini ditandai kata evaluatif/subjektif seperti "sebaiknya", "sangat indah", "diperkirakan", atau "paling".',
      'Perhatikan konjungsi kausalitas (sebab-akibat) dan pertentangan untuk melacak alur argumen.',
    ],
    formulaOrRule: 'Fakta = Dapat dibuktikan secara objektif  |  Opini = Penilaian/saran subjektif',
    jogjaContextNote:
      'Banyak mengambil artikel pelestarian Sumbu Filosofi Yogyakarta, transportasi KRL Jogja-Solo, dan ekowisata.',
    estimatedMinutes: 7,
  },
  {
    id: 'mat-smp-lit-2',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Teks Sastra & Makna Simbolis',
    title: 'Menginterpretasi Konflik, Sudut Pandang, dan Nilai Budaya Cerpen',
    summary:
      'Pada jenjang SMP, pertanyaan tidak hanya menanyakan siapa dan di mana, melainkan hubungan sebab-akibat konflik serta makna ungkapan/simbol.',
    keyPoints: [
      'Sudut pandang orang pertama ditandai kata ganti "aku/saya", sedangkan orang ketiga menggunakan nama tokoh atau "ia/dia".',
      'Makna simbolik atau ungkapan harus ditafsirkan sesuai konteks kalimat di sekitarnya.',
      'Pernyataan yang sesuai dengan isi teks harus akurat pada setiap rincian, tidak boleh terbalik subjek-objeknya.',
    ],
    formulaOrRule: 'Makna Kontekstual = Arti Kata/Simbol + Situasi Emosi & Latar Cerita',
    jogjaContextNote:
      'Kutipan cerpen berlatar Malioboro, Stasiun Tugu, dan kesenian tradisional Jawa sering dijadikan stimulus.',
    estimatedMinutes: 7,
  },
  {
    id: 'mat-smp-num-1',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Aritmatika Sosial & SPLDV',
    title: 'Diskon Bertingkat serta Sistem Persamaan Linear Dua Variabel',
    summary:
      'Diskon bertingkat (misal 20% + 10%) TIDAK sama dengan diskon 30%! Hitung harga setelah diskon pertama terlebih dahulu, baru kenakan diskon kedua.',
    keyPoints: [
      'Harga setelah diskon beruntun d1 dan d2: Harga Awal × (1 − d1) × (1 − d2).',
      'Dalam SPLDV, ubah soal cerita menjadi dua persamaan linear ax + by = c.',
      'Gunakan metode eliminasi untuk menyamakan koefisien salah satu variabel, lalu substitusi.',
    ],
    formulaOrRule: 'Diskon Bertingkat: H_akhir = H_awal × (100% − d1) × (100% − d2)',
    jogjaContextNote:
      'Sangat sering memakai transaksi pembelian paket oleh-oleh bakpia atau kerajinan gerabah Kasongan.',
    estimatedMinutes: 9,
  },
  {
    id: 'mat-smp-num-2',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Bangun Ruang Sisi Lengkung & Pythagoras',
    title: 'Volume Tabung, Kerucut, Bola serta Teorema Pythagoras',
    summary:
      'Perhatikan perbedaan antara jari-jari (r) dan diameter (d), serta pilih nilai pi = 22/7 jika r kelipatan 7 agar perhitungan cepat dan tepat.',
    keyPoints: [
      'Volume Tabung = π × r² × t; Volume Kerucut = ⅓ × π × r² × t.',
      'Pythagoras pada segitiga siku-siku: c² = a² + b² (hafalkan tripel 3-4-5, 5-12-13, 8-15-17).',
      'Konversi penting: 1 liter = 1 dm³ = 1.000 cm³.',
    ],
    formulaOrRule: 'V_tabung = π r² t  |  1 liter = 1.000 cm³',
    jogjaContextNote:
      'Konteks wadah penampungan air hujan di Gunungkidul atau bentuk atap/tiang bangunan cagar budaya.',
    estimatedMinutes: 9,
  },
  {
    id: 'mat-smp-sai-1',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Kalor, Energi, & Listrik Dinamis',
    title: 'Asas Black, Kalor Perubahan Suhu, dan Biaya Energi Listrik',
    summary:
      'Menguasai perhitungan energi kalor (Q = m·c·ΔT) dan konversi daya listrik ke kWh untuk menghitung rekening listrik rumah tangga.',
    keyPoints: [
      'Kalor untuk menaikkan suhu: Q = m × c × ΔT (m dalam kg, ΔT = T_akhir − T_awal).',
      'Energi listrik (Wh) = Daya (Watt) × Waktu total pemakaian (jam).',
      'Untuk memperoleh kWh, bagi total Wh dengan 1.000 sebelum dikalikan tarif per kWh.',
    ],
    formulaOrRule: 'Q = m · c · ΔT  |  Energi (kWh) = (P × t_jam) ÷ 1.000',
    jogjaContextNote:
      'Contoh pemanasan minuman tradisional wedang uwuh serta efisiensi lampu belajar siswa.',
    estimatedMinutes: 8,
  },
  {
    id: 'mat-smp-sai-2',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Sistem Organ & Pewarisan Sifat',
    title: 'Fisiologi Pencernaan, Pernapasan, dan Persilangan Monohibrid',
    summary:
      'Memahami fungsi enzim pencernaan, mekanisme pernapasan dada/perut, serta menentukan rasio genotipe dan fenotipe pada persilangan Mendel.',
    keyPoints: [
      'Enzim amilase (mulut) mengubah amilum menjadi maltosa; pepsin (lambung) mengubah protein menjadi pepton.',
      'Inspirasi pernapasan terjadi saat otot diafragma berkontraksi (mendatar), volume rongga dada membesar, tekanan turun.',
      'Persilangan antar-heterozigot (Aa × Aa) menghasilkan rasio genotipe 1 AA : 2 Aa : 1 aa.',
    ],
    formulaOrRule: 'Aa × Aa → Fenotipe Dominan : Resesif = 3 : 1 (Dominan Penuh)',
    jogjaContextNote:
      'Dikaitkan dengan penelitian pemuliaan tanaman di lahan pertanian Sleman atau kesehatan remaja.',
    estimatedMinutes: 8,
  },
  {
    id: 'mat-smp-ing-1',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Functional Text (Notice, Announcement, & Label)',
    title: 'Memahami Tujuan, Sasaran Pembaca, dan Makna Tersirat Teks Fungsional',
    summary:
      'Dalam TKAD Bahasa Inggris SMP DIY, teks fungsional seperti notice di tempat wisata, announcement sekolah, dan label produk/obat sering diujikan untuk menguji pemahaman detail dan inferensi.',
    keyPoints: [
      'Identifikasi kata kerja kunci pada pertanyaan: "purpose/intention" (tujuan), "addressee/target readers" (sasaran), dan "what should readers do" (tindakan).',
      'Pada teks Notice/Caution, perhatikan kata larangan atau kewajiban (prohibited, strictly forbidden, mandatory, must).',
      'Pada teks Label (makanan/obat), teliti bagian dosage (dosis), storage (penyimpanan), dan expiration date.',
    ],
    formulaOrRule: 'Notice Larangan = "To warn/prohibit visitors from..." | Announcement = "To inform... about..."',
    jogjaContextNote:
      'Sering mengambil latar aturan kunjungan Candi Prambanan, Museum Sonobudoyo, atau pengumuman lomba antarsekolah di Yogyakarta.',
    estimatedMinutes: 7,
  },
  {
    id: 'mat-smp-ing-2',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Narrative, Recount, & Descriptive Text',
    title: 'Main Idea, Moral Value, Reference Word, dan Conjunction dalam Teks',
    summary:
      'Soal bacaan panjang TKAD SMP menguji kemampuan menentukan gagasan utama paragraf, rujukan kata ganti (pronoun reference), pesan moral cerita, serta melengkapi kalimat rumpang dengan kata hubung yang tepat.',
    keyPoints: [
      'Untuk soal "The underlined word \'they/it/which\' refers to...", baca kalimat sebelumnya dan cocokkan bentuk tunggal/jamaknya.',
      'Pada Narrative Text, moral value selalu berkaitan dengan penyelesaian konflik tokoh utama.',
      'Bedakan penggunaan conjunction: although/even though (+ klausa) vs despite/in spite of (+ frasa benda/V-ing).',
    ],
    formulaOrRule: 'Pronoun Reference: Singular (it/he/she) ↔ Plural (they/them/those)',
    jogjaContextNote:
      'Banyak menggunakan teks deskriptif wisata Geopark Gunung Sewu, Tamansari, dan cerita rakyat Jawa.',
    estimatedMinutes: 8,
  },
];

export const INITIAL_QUESTIONS: Question[] = [
  // ================= SD KELAS 6 (24 SOAL) =================
  {
    id: 'sd-lit-1',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Ide Pokok & Simpulan Teks',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Pelestarian Batik Tulis Giriloyo',
    stimulusText:
      'Desa Wisata Giriloyo di Kecamatan Imogiri, Kabupaten Bantul, dikenal sebagai salah satu sentra batik tulis tertua di Yogyakarta. Sebagian besar warganya mewarisi keahlian membatik secara turun-temurun sejak masa Kerajaan Mataram. Saat ini, para perajin tidak hanya memproduksi kain batik bermotif klasik seperti Sido Mukti dan Wahyu Tumurun, tetapi juga membuka kelas belajar membatik bagi pelajar dan wisatawan agar tradisi luhur ini tetap lestari.',
    questionText: 'Ide pokok paragraf di atas adalah ....',
    options: [
      'A. Motif klasik batik Sido Mukti berasal dari Kecamatan Imogiri',
      'B. Desa Giriloyo terkenal sebagai sentra batik tulis yang terus melestarikan tradisinya',
      'C. Wisatawan wajib mengikuti kelas membatik saat berkunjung ke Kabupaten Bantul',
      'D. Semua warga di Kabupaten Bantul bekerja sebagai perajin batik tulis',
    ],
    correctAnswer:
      'B. Desa Giriloyo terkenal sebagai sentra batik tulis yang terus melestarikan tradisinya',
    explanation: {
      konsepDasar:
        'Ide pokok adalah gagasan utama yang menjadi inti pembahasan seluruh kalimat dalam satu paragraf.',
      langkahPengerjaan: [
        'Identifikasi subjek utama paragraf, yaitu Desa Wisata Giriloyo sebagai sentra batik tulis di Yogyakarta.',
        'Perhatikan kalimat-kalimat penjelasnya: menerangkan pewarisan keahlian turun-temurun dan pembukaan kelas membatik untuk melestarikan tradisi.',
        'Gabungkan inti kalimat utama dan tujuan kegiatan tersebut, yang paling tepat terangkum pada pilihan B.',
      ],
      tipsCepat:
        'Eliminasi pilihan yang memakai kata mutlak tidak sesuai teks seperti "wajib" (C) atau "semua warga" (D), padahal teks menyebut "sebagian besar".',
    },
  },
  {
    id: 'sd-lit-2',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Amanat & Unsur Intrinsik Cerita',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Sepeda Ontel Pak Harjo',
    stimulusText:
      'Pagi itu gerimis turun tipis di kawasan Kotagede. Bagas bergegas mengayuh sepedanya menuju sekolah karena takut terlambat mengikuti upacara bendera. Di persimpangan jalan, ia melihat kakek penjual koran yang sepedanya terperosok ke selokan kecil. Meskipun waktu tinggal sepuluh menit lagi, Bagas berhenti dan segera membantu mengangkat sepeda sang kakek hingga selamat. Setibanya di sekolah, gerbang baru saja ditutup, namun guru piket tersenyum bangga setelah mendengar penjelasan dari warga yang menyaksikan kejadian tersebut.',
    questionText: 'Keteladanan yang ditunjukkan oleh tokoh Bagas dalam cerita tersebut adalah ....',
    options: [
      'A. Berangkat ke sekolah tepat waktu meskipun cuaca gerimis',
      'B. Tetap menaati peraturan upacara dengan meminta izin guru piket',
      'C. Rela menolong orang lain yang kesusahan walaupun sedang terburu-buru',
      'D. Mengendarai sepeda dengan sangat kencang agar tidak terlambat',
    ],
    correctAnswer:
      'C. Rela menolong orang lain yang kesusahan walaupun sedang terburu-buru',
    explanation: {
      konsepDasar:
        'Keteladanan tokoh dilihat dari sikap positif dan pengorbanan yang dilakukan tokoh saat menghadapi dilema.',
      langkahPengerjaan: [
        'Temukan konflik yang dihadapi Bagas: ia terburu-buru agar tidak terlambat upacara.',
        'Lihat tindakan Bagas: ia tetap memilih berhenti untuk menolong kakek penjual koran.',
        'Pilihan C paling akurat menggambarkan sikap mulia yang patut diteladani.',
      ],
      tipsCepat:
        'Fokus pada bagian konflik cerita. Tindakan baik saat tokoh sedang mengalami kesulitan pribadi adalah inti keteladanan.',
    },
  },
  {
    id: 'sd-lit-3',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Pemahaman Bacaan & Data',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Kunjungan Siswa ke Museum Benteng Vredeburg',
    stimulusText:
      'SD Negeri Tugu merencanakan kunjungan edukasi ke Museum Benteng Vredeburg Yogyakarta. Pihak museum membuka layanan kunjungan rombongan sekolah setiap Selasa hingga Minggu pukul 08.00–16.00 WIB, sedangkan hari Senin museum tutup untuk perawatan koleksi. Dalam satu sesi tur pemandu, museum membatasi maksimal 35 siswa agar suasana di ruang diorama tetap nyaman dan tertib.',
    questionText:
      'Jika SD Negeri Tugu membawa 100 siswa kelas 6 pada hari Rabu pukul 09.00 WIB, pernyataan yang tepat berdasarkan teks adalah ....',
    options: [
      'A. Rombongan tidak dapat masuk karena museum sedang tutup perawatan',
      'B. Seluruh siswa dapat masuk dalam satu sesi tur pemandu sekaligus',
      'C. Rombongan perlu dibagi menjadi minimal 3 kelompok sesi tur pemandu',
      'D. Rombongan harus menunggu hingga pukul 16.00 WIB untuk mulai tur',
    ],
    correctAnswer:
      'C. Rombongan perlu dibagi menjadi minimal 3 kelompok sesi tur pemandu',
    explanation: {
      konsepDasar:
        'Literasi membaca fungsional menggabungkan pemahaman syarat waktu dan batasan kuota dalam teks.',
      langkahPengerjaan: [
        'Cek hari dan jam: hari Rabu pukul 09.00 WIB termasuk jadwal buka (Selasa–Minggu, 08.00–16.00). Jadi museum buka.',
        'Cek batas kapasitas per sesi: maksimal 35 siswa.',
        'Hitung kebutuhan kelompok untuk 100 siswa: 100 ÷ 35 = 2 sisa 30 siswa, artinya butuh minimal 3 kelompok (misal 35 + 35 + 30).',
      ],
      tipsCepat:
        'Pada soal pembagian kapasitas maksimal, sisa berapa pun selalu dibulatkan ke atas agar seluruh peserta tertampung.',
    },
  },
  {
    id: 'sd-lit-4',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Ide Pokok & Simpulan Teks',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Keunikan Geblek Kulon Progo',
    stimulusText:
      'Geblek merupakan salah satu makanan tradisional khas Kabupaten Kulon Progo, Yogyakarta. Kudapan berwarna putih bersih ini terbuat dari tepung pati singkong basah yang dibumbui bawang putih dan garam, lalu dibentuk menyerupai angka delapan. Geblek paling nikmat disantap selagi hangat bersama tempe benguk bacem karena teksturnya yang kenyal di dalam dan renyah di luar.',
    questionText: 'Simpulan yang paling tepat berdasarkan isi paragraf tersebut adalah ....',
    options: [
      'A. Geblek hanya boleh dimakan pada pagi hari bersama tempe bacem',
      'B. Geblek adalah jajanan khas Kulon Progo berbahan pati singkong berbentuk angka delapan yang nikmat disantap hangat',
      'C. Semua makanan khas Yogyakarta terbuat dari tepung pati singkong basah',
      'D. Tempe benguk merupakan bahan utama untuk membuat adonan geblek',
    ],
    correctAnswer:
      'B. Geblek adalah jajanan khas Kulon Progo berbahan pati singkong berbentuk angka delapan yang nikmat disantap hangat',
    explanation: {
      konsepDasar:
        'Simpulan menyatukan informasi inti dari awal hingga akhir paragraf secara padat dan akurat.',
      langkahPengerjaan: [
        'Kalimat 1 menjelaskan asal daerah geblek (Kulon Progo).',
        'Kalimat 2 menjelaskan bahan utama (pati singkong) dan bentuknya (angka delapan).',
        'Kalimat 3 menjelaskan cara penyajian terbaiknya (disantap hangat).',
        'Pilihan B merangkum ketiga informasi tersebut secara lengkap tanpa menambah informasi keliru.',
      ],
      tipsCepat:
        'Pilih jawaban yang mencakup unsur "apa, dari mana, dan bagaimana" sesuai isi bacaan tanpa kata mutlak seperti "semua" atau "hanya".',
    },
  },
  {
    id: 'sd-lit-5',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Makna Kata & Sinonim Kontekstual',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Konservasi Penyu di Pantai Trisik',
    stimulusText:
      'Kelompok pelestari lingkungan di Pantai Trisik, Kulon Progo, rutin melakukan patroli malam untuk menyelamatkan telur penyu lekang dari ancaman predator alami maupun perburuan. Telur-telur tersebut dipindahkan ke tempat penetasan semi-alami hingga menetas menjadi tukik. Setelah cukup kuat, tukik-tukik itu dilepasliarkan kembali ke samudra.',
    questionText: 'Makna kata "tukik" pada bacaan di atas adalah ....',
    options: [
      'A. Telur penyu yang gagal menetas',
      'B. Anak penyu yang baru menetas',
      'C. Tempat penangkaran penyu di tepi pantai',
      'D. Petugas penjaga kelestarian pantai',
    ],
    correctAnswer: 'B. Anak penyu yang baru menetas',
    explanation: {
      konsepDasar:
        'Makna istilah khusus dapat ditemukan melalui petunjuk kalimat sebelum dan sesudahnya (konteks kalimat).',
      langkahPengerjaan: [
        'Perhatikan kalimat kedua: "...hingga menetas menjadi tukik."',
        'Dari frasa "menetas menjadi", jelas bahwa tukik adalah anak penyu yang baru keluar dari telur.',
      ],
      tipsCepat:
        'Gunakan kalimat di sekitar istilah asing untuk menebak artinya secara logis.',
    },
  },
  {
    id: 'sd-lit-6',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Pemahaman Bacaan & Data',
    type: 'pilihan_ganda',
    difficulty: 'HOTS',
    stimulusTitle: 'Jadwal Panen Salak Pondoh Sleman',
    stimulusText:
      'Kelompok Tani "Maju Makmur" di Kecamatan Turi, Sleman, mencatat hasil panen salak pondoh selama empat minggu pada bulan Desember sebagai berikut:',
    dataTable: {
      headers: ['Minggu Ke-', 'Hasil Panen (kg)', 'Kualitas Super (%)'],
      rows: [
        ['Minggu I', '400 kg', '75%'],
        ['Minggu II', '500 kg', '80%'],
        ['Minggu III', '450 kg', '60%'],
        ['Minggu IV', '600 kg', '70%'],
      ],
    },
    questionText:
      'Berdasarkan tabel di atas, pada minggu ke berapakah jumlah salak kualitas super (dalam kg) dihasilkan paling banyak?',
    options: ['A. Minggu I', 'B. Minggu II', 'C. Minggu III', 'D. Minggu IV'],
    correctAnswer: 'D. Minggu IV',
    explanation: {
      konsepDasar:
        'Literasi numerasi pada tabel membutuhkan perhitungan nilai riil (persentase × total), bukan hanya melihat angka persen terbesar.',
      langkahPengerjaan: [
        'Minggu I: 75% × 400 kg = 300 kg.',
        'Minggu II: 80% × 500 kg = 400 kg.',
        'Minggu III: 60% × 450 kg = 270 kg.',
        'Minggu IV: 70% × 600 kg = 420 kg (terbanyak).',
      ],
      tipsCepat:
        'Jangan terkecoh persentase tertinggi (80% di Minggu II), kalikan dulu dengan total panen masing-masing baris.',
    },
  },
  {
    id: 'sd-lit-7',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Amanat & Unsur Intrinsik Cerita',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Lomba Panjat Pinang di Alun-Alun',
    stimulusText:
      'Regu Melati semula kesulitan mencapai puncak batang pinang karena setiap anggota ingin memanjat paling atas demi mengambil hadiah utama. Akibatnya, mereka berkali-kali merosot jatuh. Setelah berdiskusi singkat, Raka yang bertubuh paling kokoh bersedia menjadi tumpuan paling bawah, sementara Bimo yang bertubuh ringan memanjat ke puncak. Akhirnya, Regu Melati berhasil meraih bendera kemenangan.',
    questionText: 'Pesan moral yang terkandung dalam cerita di atas adalah ....',
    options: [
      'A. Kemenangan hanya bisa diraih oleh peserta yang bertubuh paling ringan',
      'B. Kerja sama dan pembagian peran yang adil dapat mengatasi kesulitan bersama',
      'C. Dalam perlombaan kita harus selalu mengutamakan keinginan pribadi',
      'D. Batang pinang yang licin tidak mungkin dipanjat tanpa alat bantu',
    ],
    correctAnswer:
      'B. Kerja sama dan pembagian peran yang adil dapat mengatasi kesulitan bersama',
    explanation: {
      konsepDasar:
        'Amanat cerita terlihat dari perubahan strategi tokoh yang mengubah kegagalan menjadi keberhasilan.',
      langkahPengerjaan: [
        'Awalnya regu gagal karena egois (semua ingin di atas).',
        'Setelah mau bekerja sama membagi peran sesuai kekuatan masing-masing, mereka berhasil.',
        'Inti pesannya adalah pentingnya kerja sama tim (pilihan B).',
      ],
      tipsCepat:
        'Bandingkan kondisi sebelum dan sesudah masalah terpecahkan untuk menemukan inti amanat.',
    },
  },
  {
    id: 'sd-lit-8',
    grade: 'SD',
    subject: 'literasi',
    topic: 'Peribahasa & Ungkapan dalam Konteks',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Menabung Sejak Dini untuk Karya Wisata',
    stimulusText:
      'Sejak awal semester, Nisa menyisihkan sebagian uang sakunya ke dalam celengan bambu di kamar. Walaupun jumlah yang ia masukkan setiap hari tidak banyak, setelah delapan bulan celengan itu penuh dan cukup untuk membiayai kegiatan karya wisata sekolah tanpa merepotkan orang tuanya.',
    questionText:
      'Peribahasa yang paling tepat untuk menggambarkan kebiasaan Nisa tersebut adalah ....',
    options: [
      'A. Bagai air di daun talas',
      'B. Sedikit demi sedikit, lama-lama menjadi bukit',
      'C. Tong kosong nyaring bunyinya',
      'D. Besar pasak daripada tiang',
    ],
    correctAnswer: 'B. Sedikit demi sedikit, lama-lama menjadi bukit',
    explanation: {
      konsepDasar:
        'Peribahasa menggambarkan kebiasaan atau pelajaran hidup melalui perumpamaan yang tepat.',
      langkahPengerjaan: [
        'Kebiasaan Nisa adalah menabung uang dalam jumlah kecil secara rutin hingga terkumpul banyak.',
        'Peribahasa "Sedikit demi sedikit, lama-lama menjadi bukit" berarti usaha kecil yang dilakukan terus-menerus akan membuahkan hasil besar.',
      ],
      tipsCepat:
        'Eliminasi peribahasa bermakna negatif seperti "besar pasak daripada tiang" (boros) atau "tong kosong nyaring bunyinya" (banyak bicara tanpa ilmu).',
    },
  },

  // SD Numerasi (8 Soal)
  {
    id: 'sd-num-1',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Pecahan, Persen, & Perbandingan',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Produksi Kain Sanggar Batik Bantul',
    stimulusText:
      'Sebuah sanggar batik di Bantul memiliki persediaan kain batik sebanyak 3 kodi. Pada akhir pekan, sebanyak 25% dari seluruh kain terjual kepada wisatawan. Kemudian, 2/5 bagian dari sisa kain yang belum terjual dikirim ke toko oleh-oleh di kawasan Malioboro.',
    questionText: 'Berapa lembar sisa kain batik yang masih berada di sanggar sekarang?',
    options: ['A. 18 lembar', 'B. 27 lembar', 'C. 33 lembar', 'D. 45 lembar'],
    correctAnswer: 'B. 27 lembar',
    explanation: {
      konsepDasar:
        'Konversi satuan kodi ke lembar (1 kodi = 20 lembar), diikuti perhitungan persentase dan pecahan dari sisa.',
      langkahPengerjaan: [
        'Ubah 3 kodi menjadi lembar: 3 × 20 = 60 lembar.',
        'Hitung yang terjual ke wisatawan: 25% × 60 = 1/4 × 60 = 15 lembar.',
        'Hitung sisa setelah terjual: 60 − 15 = 45 lembar.',
        'Hitung yang dikirim ke Malioboro (2/5 dari sisa): 2/5 × 45 = 18 lembar.',
        'Sisa akhir di sanggar: 45 − 18 = 27 lembar.',
      ],
      tipsCepat:
        'Jika dikirim 2/5 dari sisa, maka yang tertinggal di sanggar langsung 3/5 dari sisa: 3/5 × 45 = 27 lembar!',
    },
  },
  {
    id: 'sd-num-2',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Kecepatan, Jarak, & Waktu',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Perjalanan Bus Trans Jogja',
    stimulusText:
      'Nadia berangkat menuju perpustakaan daerah menggunakan bus Trans Jogja dari Halte Giwangan menuju kawasan Tugu Yogyakarta. Jarak kedua halte tersebut melalui jalur bus adalah 9 km. Bus melaju dengan kecepatan rata-rata 36 km/jam dan berangkat tepat pukul 06.45 WIB tanpa hambatan.',
    questionText: 'Pada pukul berapakah Nadia tiba di halte kawasan Tugu Yogyakarta?',
    options: ['A. 06.55 WIB', 'B. 07.00 WIB', 'C. 07.05 WIB', 'D. 07.15 WIB'],
    correctAnswer: 'B. 07.00 WIB',
    explanation: {
      konsepDasar: 'Hubungan jarak (s), kecepatan (v), dan waktu (t): t = s ÷ v.',
      langkahPengerjaan: [
        'Hitung waktu tempuh dalam jam: t = 9 km ÷ 36 km/jam = 1/4 jam.',
        'Konversi 1/4 jam ke menit: 1/4 × 60 menit = 15 menit.',
        'Tambahkan ke waktu berangkat: 06.45 + 15 menit = 07.00 WIB.',
      ],
      tipsCepat:
        'Ingat 1/4 jam = 15 menit, 1/2 jam = 30 menit, dan 3/4 jam = 45 menit agar tidak perlu menghitung berulang.',
    },
  },
  {
    id: 'sd-num-3',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Luas Bangun Datar & Pengukuran',
    type: 'isian_singkat',
    difficulty: 'HOTS',
    stimulusTitle: 'Pemasangan Tegel Kunci Pendopo Jogja',
    stimulusText:
      'Pak Danang akan merenovasi lantai pendopo rumahnya yang berbentuk persegi panjang dengan panjang 12 meter dan lebar 8 meter. Lantai tersebut akan dipasangi ubin tegel kunci khas Yogyakarta berbentuk persegi dengan panjang sisi 40 cm.',
    questionText:
      'Berapa banyak ubin tegel kunci yang dibutuhkan untuk menutup seluruh lantai pendopo? (Tulis angkanya saja)',
    correctAnswer: '600',
    explanation: {
      konsepDasar:
        'Banyak ubin diperoleh dengan membagi luas total lantai dengan luas satu buah ubin pada satuan luas yang sama (cm²).',
      langkahPengerjaan: [
        'Ubah ukuran lantai dari meter ke sentimeter: panjang = 1.200 cm, lebar = 800 cm.',
        'Hitung luas lantai: 1.200 cm × 800 cm = 960.000 cm².',
        'Hitung luas satu ubin persegi: 40 cm × 40 cm = 1.600 cm².',
        'Bagi luas lantai dengan luas 1 ubin: 960.000 ÷ 1.600 = 600 buah.',
      ],
      tipsCepat:
        'Cara cepat tanpa angka besar: (1.200 ÷ 40) × (800 ÷ 40) = 30 × 20 = 600 ubin!',
    },
  },
  {
    id: 'sd-num-4',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'KPK & FPB Kontekstual',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Paket Oleh-Oleh Bakpia Pathok',
    stimulusText:
      'Bu Ratna membuat 48 buah bakpia kacang hijau dan 72 buah bakpia keju. Seluruh bakpia tersebut akan dikemas ke dalam beberapa kotak oleh-oleh dengan jumlah dan jenis isi yang sama banyak pada setiap kotaknya.',
    questionText:
      'Berapa banyak bakpia keju di dalam setiap kotak jika Bu Ratna membuat kotak sebanyak-banyaknya?',
    options: ['A. 2 buah', 'B. 3 buah', 'C. 4 buah', 'D. 24 buah'],
    correctAnswer: 'B. 3 buah',
    explanation: {
      konsepDasar:
        'Kata kunci "dibagi sama banyak" dan "sebanyak-banyaknya" diselesaikan menggunakan FPB (Faktor Persekutuan Terbesar).',
      langkahPengerjaan: [
        'Cari FPB dari 48 dan 72: 48 = 2⁴ × 3; 72 = 2³ × 3².',
        'FPB = 2³ × 3 = 8 × 3 = 24 kotak.',
        'Hitung isi bakpia keju per kotak: 72 ÷ 24 = 3 buah.',
      ],
      tipsCepat:
        'Hati-hati! FPB (24) adalah jumlah KOTAK-nya. Yang ditanyakan adalah isi bakpia keju per kotak (72 ÷ 24 = 3).',
    },
  },
  {
    id: 'sd-num-5',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Perbandingan & Skala Peta',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Peta Wisata Daerah Istimewa Yogyakarta',
    stimulusText:
      'Pada sebuah peta wisata DIY berskala 1 : 250.000, jarak antara Candi Prambanan dan Pantai Parangtritis terukur sepanjang 16 cm.',
    questionText: 'Berapa kilometer jarak sebenarnya antara kedua tempat wisata tersebut?',
    options: ['A. 4 km', 'B. 25 km', 'C. 40 km', 'D. 400 km'],
    correctAnswer: 'C. 40 km',
    explanation: {
      konsepDasar: 'Jarak Sebenarnya (JS) = Jarak Peta (JP) × Penyebut Skala.',
      langkahPengerjaan: [
        'Hitung JS dalam cm: 16 cm × 250.000 = 4.000.000 cm.',
        'Ubah cm ke km dengan membagi 100.000 (coret 5 nol): 4.000.000 ÷ 100.000 = 40 km.',
      ],
      tipsCepat:
        'Coret 5 angka nol pada skala terlebih dahulu (250.000 → 2,5 km), lalu kalikan langsung dengan jarak peta: 16 × 2,5 = 40 km!',
    },
  },
  {
    id: 'sd-num-6',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Volume Bangun Ruang & Debit',
    type: 'isian_singkat',
    difficulty: 'HOTS',
    stimulusTitle: 'Kolam Ikan Taman Sari',
    stimulusText:
      'Sebuah bak penampungan air berbentuk balok memiliki ukuran panjang 150 cm, lebar 80 cm, dan tinggi 100 cm. Bak tersebut akan diisi air menggunakan selang dengan debit 20 liter/menit hingga penuh.',
    questionText:
      'Berapa menit waktu yang diperlukan untuk mengisi bak tersebut sampai penuh? (Tulis angkanya saja)',
    correctAnswer: '60',
    explanation: {
      konsepDasar:
        'Volume balok = p × l × t, dengan konversi 1.000 cm³ = 1 liter, dan Waktu = Volume ÷ Debit.',
      langkahPengerjaan: [
        'Hitung volume dalam cm³: 150 × 80 × 100 = 1.200.000 cm³.',
        'Ubah ke liter: 1.200.000 ÷ 1.000 = 1.200 liter.',
        'Hitung waktu pengisian: 1.200 liter ÷ 20 liter/menit = 60 menit.',
      ],
      tipsCepat:
        'Ubah ukuran balok ke desimeter (dm) sejak awal: 15 dm × 8 dm × 10 dm = 1.200 dm³ = 1.200 liter.',
    },
  },
  {
    id: 'sd-num-7',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Statistika & Rata-Rata (Mean)',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Nilai Try Out TKAD Bima',
    stimulusText:
      'Dalam 4 kali latihan ujian TKAD Numerasi, Bima memperoleh nilai berturut-turut: 82, 86, 80, dan 88. Bima ingin nilai rata-rata dari 5 kali latihan ujian menjadi tepat 85.',
    questionText: 'Berapa nilai minimal yang harus diraih Bima pada latihan ujian ke-5?',
    options: ['A. 85', 'B. 87', 'C. 89', 'D. 90'],
    correctAnswer: 'C. 89',
    explanation: {
      konsepDasar: 'Total Nilai = Rata-rata yang diinginkan × Banyaknya Ujian.',
      langkahPengerjaan: [
        'Target total nilai 5 ujian: 85 × 5 = 425.',
        'Jumlah nilai 4 ujian pertama: 82 + 86 + 80 + 88 = 336.',
        'Nilai ujian ke-5 yang dibutuhkan: 425 − 336 = 89.',
      ],
      tipsCepat:
        'Hitung selisih tiap nilai terhadap target 85: (-3) + (+1) + (-5) + (+3) = -4. Agar impas jadi 0, ujian ke-5 harus 85 + 4 = 89!',
    },
  },
  {
    id: 'sd-num-8',
    grade: 'SD',
    subject: 'numerasi',
    topic: 'Bilangan Bulat & Operasi Campuran',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Aturan Skor Olimpiade Matematika DIY',
    stimulusText:
      'Dalam kompetisi matematika tingkat SD se-DIY, panitia menetapkan aturan penilaian: jawaban benar mendapat skor +4, jawaban salah mendapat skor −2, dan soal tidak dijawab mendapat skor −1. Dari 40 soal yang tersedia, Sinta menjawab 32 soal dengan benar dan 5 soal salah.',
    questionText: 'Berapa total skor yang diperoleh Sinta?',
    options: ['A. 115', 'B. 118', 'C. 121', 'D. 128'],
    correctAnswer: 'A. 115',
    explanation: {
      konsepDasar:
        'Hitung masing-masing kategori soal (benar, salah, tidak dijawab) lalu kalikan dengan bobot skornya.',
      langkahPengerjaan: [
        'Soal tidak dijawab = 40 − (32 + 5) = 3 soal.',
        'Skor benar = 32 × 4 = 128.',
        'Skor salah = 5 × (−2) = −10.',
        'Skor tidak dijawab = 3 × (−1) = −3.',
        'Total skor = 128 − 10 − 3 = 115.',
      ],
      tipsCepat:
        'Jangan lupa menghitung sisa soal yang tidak dijawab (40 − 37 = 3 soal) karena tetap mendapat poin −1!',
    },
  },

  // SD Sains (8 Soal)
  {
    id: 'sd-sai-1',
    grade: 'SD',
    subject: 'sains',
    topic: 'Ekosistem & Rantai Makanan',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Ekosistem Sawah di Kabupaten Sleman',
    stimulusText:
      'Di area persawahan daerah Pakem, Sleman, terbentuk rantai makanan yang terdiri atas tanaman padi, belalang, katak, ular sawah, dan burung elang. Akhir-akhir ini, perburuan ular sawah secara liar meningkat tajam sehingga jumlah ular sawah menurun drastis.',
    questionText:
      'Dampak langsung yang paling mungkin terjadi pada ekosistem sawah tersebut adalah ....',
    options: [
      'A. Populasi katak meningkat pesat dan hasil panen padi ikut meningkat',
      'B. Populasi katak meningkat pesat sehingga populasi belalang menurun',
      'C. Populasi belalang meningkat pesat karena tidak ada yang memangsa katak',
      'D. Populasi burung elang meningkat karena sumber makanannya bertambah',
    ],
    correctAnswer:
      'B. Populasi katak meningkat pesat sehingga populasi belalang menurun',
    explanation: {
      konsepDasar:
        'Dalam rantai makanan, berkurangnya predator menyebabkan populasi mangsanya meningkat, yang kemudian menekan populasi organisme di bawahnya.',
      langkahPengerjaan: [
        'Urutan rantai makanan: Padi → Belalang → Katak → Ular sawah → Elang.',
        'Jika ular sawah berkurang drastis, pemangsa katak berkurang sehingga jumlah katak meningkat pesat.',
        'Karena jumlah katak banyak, konsumsi terhadap belalang meningkat sehingga populasi belalang menurun.',
      ],
      tipsCepat:
        'Selalu tuliskan panah rantai makanannya dulu di kertas coretan sebelum menebak naik/turunnya populasi.',
    },
  },
  {
    id: 'sd-sai-2',
    grade: 'SD',
    subject: 'sains',
    topic: 'Perpindahan Kalor & Wujud Benda',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Menyiapkan Minuman Hangat di Pagi Hari',
    stimulusText:
      'Di pagi yang sejuk di lereng Merapi, Ibu merebus air di dalam panci aluminium hingga mendidih. Saat Ibu menuangkan air panas ke dalam gelas kaca berisi sendok logam, ujung atas sendok logam yang tidak tercelup air ikut terasa hangat setelah beberapa saat. Sementara itu, di bagian luar tutup panci yang dingin muncul butiran-butiran air.',
    questionText:
      'Peristiwa terasa hangatnya ujung sendok logam dan munculnya butiran air pada tutup panci berturut-turut menunjukkan ....',
    options: [
      'A. Perpindahan panas secara konveksi dan peristiwa menguap',
      'B. Perpindahan panas secara radiasi dan peristiwa membeku',
      'C. Perpindahan panas secara konduksi dan peristiwa mengembun',
      'D. Perpindahan panas secara konduksi dan peristiwa menyublim',
    ],
    correctAnswer:
      'C. Perpindahan panas secara konduksi dan peristiwa mengembun',
    explanation: {
      konsepDasar:
        'Konduksi adalah hantaran panas melalui benda padat (logam), sedangkan mengembun adalah perubahan gas (uap air) menjadi titik-titik air saat menyentuh permukaan dingin.',
      langkahPengerjaan: [
        'Sendok logam adalah benda padat penghantar panas (konduktor). Panas merambat ke ujung sendok tanpa partikel sendok berpindah → Konduksi.',
        'Uap air panas mengenai tutup panci yang lebih dingin sehingga berubah menjadi butiran air → Mengembun.',
      ],
      tipsCepat:
        'Ingat kata kunci: Logam/padat hangat merambat = Konduksi; Uap berubah jadi tetes air = Mengembun.',
    },
  },
  {
    id: 'sd-sai-3',
    grade: 'SD',
    subject: 'sains',
    topic: 'Gaya & Pesawat Sederhana',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Penggunaan Gerobak Dorong di Proyek Desa',
    stimulusText:
      'Warga bergotong royong memperbaiki jalan setapak di dusun. Pak Rudi menggunakan gerobak dorong beroda satu untuk mengangkut pasir. Posisi roda berada di paling depan sebagai titik tumpu, bak pasir berada di tengah sebagai beban, dan pegangan tangan berada di bagian belakang sebagai titik kuasa.',
    questionText:
      'Alat yang memiliki prinsip kerja tuas sejenis dengan gerobak dorong beroda satu tersebut adalah ....',
    options: [
      'A. Gunting kertas dan tang penjepit',
      'B. Pemecah kemiri dan pembuka tutup botol',
      'C. Pinset dan sekop pasir',
      'D. Jungkat-jungkit dan timbangan lengan',
    ],
    correctAnswer: 'B. Pemecah kemiri dan pembuka tutup botol',
    explanation: {
      konsepDasar:
        'Tuas jenis kedua memiliki posisi Beban (B) berada di antara Titik Tumpu (T) dan Kuasa (K).',
      langkahPengerjaan: [
        'Pada gerobak dorong beroda satu: Tumpu di roda (depan) – Beban di bak (tengah) – Kuasa di pegangan (belakang). Ini tuas jenis ke-2.',
        'Gunting, tang, jungkat-jungkit (A dan D) memiliki tumpu di tengah → Tuas jenis ke-1.',
        'Pinset dan sekop (C) memiliki kuasa di tengah → Tuas jenis ke-3.',
        'Pemecah kemiri dan pembuka tutup botol (B) memiliki beban di tengah → Tuas jenis ke-2.',
      ],
      tipsCepat:
        'Hafalkan posisi tengah dengan singkatan "T-B-K": Jenis 1 = Tumpu di tengah, Jenis 2 = Beban di tengah, Jenis 3 = Kuasa di tengah.',
    },
  },
  {
    id: 'sd-sai-4',
    grade: 'SD',
    subject: 'sains',
    topic: 'Adaptasi Makhluk Hidup',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Hutan Mangrove Wanatirta Kulon Progo',
    stimulusText:
      'Kawasan pesisir Pasir Mendit di Kulon Progo ditanami ribuan pohon bakau (mangrove) untuk menahan abrasi gelombang laut selatan. Pohon bakau memiliki akar tunjang yang mencuat tinggi ke permukaan lumpur serta daun yang mampu mengeluarkan kelebihan garam.',
    questionText:
      'Fungsi utama akar tunjang yang mencuat pada pohon bakau tersebut adalah ....',
    options: [
      'A. Menyimpan cadangan air tawar selama musim kemarau panjang',
      'B. Menopang batang agar kokoh dari hempasan ombak dan membantu pernapasan di tanah berlumpur',
      'C. Mengapungkan seluruh bagian pohon saat air laut sedang pasang',
      'D. Menangkap serangga kecil sebagai sumber nutrisi tambahan',
    ],
    correctAnswer:
      'B. Menopang batang agar kokoh dari hempasan ombak dan membantu pernapasan di tanah berlumpur',
    explanation: {
      konsepDasar:
        'Adaptasi morfologi tumbuhan disesuaikan dengan kondisi ekstrem habitatnya (lumpur minim oksigen dan terjangan ombak).',
      langkahPengerjaan: [
        'Tanah lumpur pesisir miskin oksigen sehingga akar mencuat untuk mengambil udara (akar napas/tunjang).',
        'Struktur akar yang bercabang kokoh menahan pohon agar tidak tumbang diterjang gelombang pantai selatan.',
      ],
      tipsCepat:
        'Kaitkan ciri fisik tumbuhan (akar mencuat & kokoh) langsung dengan tantangan lingkungannya (lumpur & ombak).',
    },
  },
  {
    id: 'sd-sai-5',
    grade: 'SD',
    subject: 'sains',
    topic: 'Rangkaian Listrik & Energi',
    type: 'pilihan_ganda',
    difficulty: 'HOTS',
    stimulusTitle: 'Penerangan Teras Rumah Limasan',
    stimulusText:
      'Pak Wawan memasang 3 lampu di teras rumahnya: Lampu 1 dan Lampu 2 dipasang secara seri pada satu cabang, sedangkan Lampu 3 dipasang paralel terhadap cabang Lampu 1 dan 2. Seluruh rangkaian terhubung ke sumber listrik dengan satu sakelar utama.',
    questionText:
      'Jika Lampu 1 tiba-tiba putus saat sakelar dalam keadaan menyala, kondisi Lampu 2 dan Lampu 3 adalah ....',
    options: [
      'A. Lampu 2 padam, sedangkan Lampu 3 tetap menyala',
      'B. Lampu 2 tetap menyala, sedangkan Lampu 3 padam',
      'C. Kedua lampu (Lampu 2 dan Lampu 3) ikut padam',
      'D. Kedua lampu menyala lebih redup dari sebelumnya',
    ],
    correctAnswer: 'A. Lampu 2 padam, sedangkan Lampu 3 tetap menyala',
    explanation: {
      konsepDasar:
        'Pada rangkaian seri, arus mengalir dalam satu jalur sehingga satu komponen putus memutus seluruh jalur itu. Pada rangkaian paralel, jalur lain tetap mendapat arus.',
      langkahPengerjaan: [
        'Lampu 1 dan Lampu 2 satu jalur seri → jika Lampu 1 putus, arus ke Lampu 2 terhenti sehingga Lampu 2 padam.',
        'Lampu 3 berada pada cabang paralel terpisah → arus listrik tetap mengalir lancar sehingga Lampu 3 tetap menyala.',
      ],
      tipsCepat:
        'Ingat prinsip dasar: Seri = "Satu mati, sejalur ikut mati"; Paralel = "Cabang lain tetap menyala".',
    },
  },
  {
    id: 'sd-sai-6',
    grade: 'SD',
    subject: 'sains',
    topic: 'Sistem Tata Surya & Gerhana',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Pengamatan Langit di Taman Pintar Yogyakarta',
    stimulusText:
      'Dalam pertunjukan planetarium di Taman Pintar Yogyakarta, ditampilkan simulasi posisi Matahari, Bumi, dan Bulan yang berada tepat pada satu garis lurus. Pada simulasi tersebut, bayangan inti (umbra) Bulan jatuh menutupi sebagian permukaan Bumi pada siang hari.',
    questionText: 'Peristiwa alam yang ditunjukkan pada simulasi tersebut adalah ....',
    options: [
      'A. Gerhana Bulan Total',
      'B. Gerhana Matahari Total di wilayah yang terkena umbra',
      'C. Fase Bulan Purnama',
      'D. Pergantian musim kemarau ke musim penghujan',
    ],
    correctAnswer: 'B. Gerhana Matahari Total di wilayah yang terkena umbra',
    explanation: {
      konsepDasar:
        'Gerhana Matahari terjadi ketika Bulan berada di antara Matahari dan Bumi sehingga bayangan Bulan jatuh ke permukaan Bumi.',
      langkahPengerjaan: [
        'Identifikasi benda yang bayangannya jatuh ke Bumi: bayangan Bulan.',
        'Karena Bulan menghalangi cahaya Matahari menuju Bumi pada siang hari, peristiwa tersebut adalah Gerhana Matahari.',
        'Wilayah yang terkena bayangan inti (umbra) mengalami Gerhana Matahari Total.',
      ],
      tipsCepat:
        'Ingat singkatannya: Ma-Bu-Mi (Matahari-Bulan-Bumi) = Gerhana Matahari; Ma-Mi-Bu (Matahari-Bumi-Bulan) = Gerhana Bulan.',
    },
  },
  {
    id: 'sd-sai-7',
    grade: 'SD',
    subject: 'sains',
    topic: 'Sistem Pernapasan & Pencernaan Manusia',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Proses Pencernaan Makanan Sarapan Pagi',
    stimulusText:
      'Sebelum berangkat mengikuti uji coba TKAD, Dinda sarapan sepiring nasi hangat dan telur rebus. Nasi mengandung karbohidrat (amilum), sedangkan putih telur kaya akan protein.',
    questionText:
      'Organ pencernaan tempat pertama kali amilum pada nasi dicerna secara kimiawi oleh enzim adalah ....',
    options: [
      'A. Rongga mulut oleh enzim ptialin (amilase)',
      'B. Lambung oleh enzim pepsin',
      'C. Usus halus oleh enzim lipase',
      'D. Usus besar oleh bakteri pembusuk',
    ],
    correctAnswer: 'A. Rongga mulut oleh enzim ptialin (amilase)',
    explanation: {
      konsepDasar:
        'Pencernaan kimiawi karbohidrat dimulai sejak makanan dikunyah di dalam mulut dengan bantuan air ludah yang mengandung enzim ptialin/amilase.',
      langkahPengerjaan: [
        'Nasi merupakan sumber karbohidrat (amilum).',
        'Di rongga mulut, enzim ptialin mengubah amilum menjadi zat gula sederhana (maltosa).',
        'Sementara protein pada telur baru dicerna secara kimiawi di lambung oleh enzim pepsin.',
      ],
      tipsCepat:
        'Nasi dikunyah lama terasa manis di mulut karena enzim ptialin sudah mulai bekerja mengubah karbohidrat menjadi gula!',
    },
  },
  {
    id: 'sd-sai-8',
    grade: 'SD',
    subject: 'sains',
    topic: 'Sifat Cahaya & Alat Optik',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: ' Kejernihan Air Umbul Ponggok & Sungai Oyo',
    stimulusText:
      'Saat berwisata menyusuri aliran Sungai Oyo di Gunungkidul yang jernih, Rendra melihat ikan-ikan kecil berenang di dasar sungai tampak lebih dekat ke permukaan daripada kedalaman sebenarnya. Selain itu, dayung kayu yang sebagian tercelup ke dalam air terlihat seolah-olah patah.',
    questionText:
      'Peristiwa tersebut membuktikan bahwa cahaya memiliki sifat ....',
    options: [
      'A. Dapat dipantulkan oleh permukaan air yang tenang',
      'B. Dapat dibiaskan (dibelokkan) saat melewati dua medium berbeda kerapatan',
      'C. Merambat lurus menembus benda bening',
      'D. Dapat diuraikan menjadi berbagai spektrum warna',
    ],
    correctAnswer:
      'B. Dapat dibiaskan (dibelokkan) saat melewati dua medium berbeda kerapatan',
    explanation: {
      konsepDasar:
        'Pembiasan cahaya (refraksi) terjadi ketika cahaya merambat melalui dua medium dengan kerapatan optik berbeda (udara dan air).',
      langkahPengerjaan: [
        'Cahaya dari dasar air menuju mata pengamat di udara melewati batas dua medium berbeda (air → udara).',
        'Arah rambat cahaya dibelokkan sehingga dasar kolam/sungai tampak lebih dangkal dan benda lurus tampak bengkok/patah.',
      ],
      tipsCepat:
        'Kata kunci: pensil/dayung terlihat patah atau dasar kolam terlihat dangkal = Pembiasan cahaya.',
    },
  },

  // ================= SMP KELAS 9 (30 SOAL: LITERASI, NUMERASI, SAINS, & BAHASA INGGRIS) =================
  // SMP Literasi (7 Soal)
  {
    id: 'smp-lit-1',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Fakta, Opini, & Evaluasi Argumen',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Sumbu Filosofi Yogyakarta sebagai Warisan Dunia',
    stimulusText:
      '(1) Pada September 2023, UNESCO resmi menetapkan Sumbu Filosofi Yogyakarta sebagai Warisan Budaya Dunia. (2) Garis imajiner sepanjang kurang lebih enam kilometer ini membentang lurus dari Panggung Krapyak di selatan, Keraton Yogyakarta, hingga Tugu Pal Putih di utara. (3) Penetapan tersebut menjadi bukti bahwa tata ruang kota tradisional Jawa memiliki nilai filosofis yang sangat mengagumkan. (4) Pemerintah daerah sebaiknya memperbanyak jalur pedestrian yang nyaman agar wisatawan dapat menikmati kawasan bersejarah ini dengan tenang.',
    questionText:
      'Kalimat yang merupakan fakta dalam kutipan teks di atas ditunjukkan oleh nomor ....',
    options: ['A. (1) dan (2)', 'B. (1) dan (3)', 'C. (2) dan (4)', 'D. (3) dan (4)'],
    correctAnswer: 'A. (1) dan (2)',
    explanation: {
      konsepDasar:
        'Fakta adalah pernyataan yang memuat data objektif (waktu, jarak, peristiwa resmi) dan dapat dibuktikan kebenarannya, sedangkan opini memuat penilaian atau saran.',
      langkahPengerjaan: [
        'Kalimat (1) memuat tanggal/tahun resmi dan keputusan lembaga UNESCO → Fakta.',
        'Kalimat (2) memuat ukuran jarak (~6 km) dan lokasi geografis nyata → Fakta.',
        'Kalimat (3) memuat penilaian subjektif "sangat mengagumkan" → Opini.',
        'Kalimat (4) memuat kata anjuran "sebaiknya" → Opini.',
      ],
      tipsCepat:
        'Cari kata sifat evaluatif ("mengagumkan") dan kata saran ("sebaiknya", "harus") untuk langsung menyingkirkan kalimat opini.',
    },
  },
  {
    id: 'smp-lit-2',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Makna Simbolis & Analisis Cerpen',
    type: 'pilihan_ganda',
    difficulty: 'HOTS',
    stimulusTitle: 'Senja di Peron Stasiun Tugu',
    stimulusText:
      'Langit Yogyakarta memerah jingga ketika Laras menatap koper birunya yang sudah agak pudar warnanya. Di bangku tunggu peron dua, ayahnya menyerahkan secarik kertas berisi alamat asrama di kota perantauan. "Jangan pernah takut berjalan sendiri, Nduk. Anggap saja Yogyakarta adalah akar yang selalu memberimu kekuatan ke mana pun cabangmu tumbuh," ucap ayahnya lirih. Laras mengangguk sambil menahan hangat di sudut matanya.',
    questionText:
      'Makna simbolik ungkapan "Yogyakarta adalah akar yang selalu memberimu kekuatan" dalam kutipan cerpen tersebut adalah ....',
    options: [
      'A. Yogyakarta memiliki banyak pohon rindang di sekitar Stasiun Tugu',
      'B. Keluarga dan nilai-nilai asal daerah tetap menjadi sumber semangat saat merantau',
      'C. Laras harus segera menanam pohon sebelum berangkat ke asrama',
      'D. Biaya hidup di perantauan akan selalu ditanggung penuh oleh pemerintah daerah',
    ],
    correctAnswer:
      'B. Keluarga dan nilai-nilai asal daerah tetap menjadi sumber semangat saat merantau',
    explanation: {
      konsepDasar:
        'Dalam sastra, metafora "akar" melambangkan asal-usul, rumah, keluarga, dan nilai hidup yang menopang seseorang.',
      langkahPengerjaan: [
        'Pahami situasi tokoh: Laras akan merantau meninggalkan kampung halaman (Yogyakarta).',
        'Ayahnya membandingkan Yogyakarta dengan "akar" dan perjalanan hidup Laras sebagai "cabang".',
        'Artinya, nilai dan dukungan keluarga dari kampung halaman menjadi penopang kekuatan Laras di perantauan.',
      ],
      tipsCepat:
        'Hindari memilih jawaban yang memaknai kiasan secara harfiah (seperti opsi A dan C yang mengartikan akar/pohon secara fisik).',
    },
  },
  {
    id: 'smp-lit-3',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Inferensi Data Infografik Teks',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Data Kunjungan Perpustakaan Sekolah',
    stimulusText:
      'Perpustakaan SMP Harapan Yogyakarta mencatat tren peminjaman buku selama tiga bulan terakhir sebagai berikut:',
    dataTable: {
      headers: ['Bulan', 'Buku Fiksi', 'Buku Sains & Math', 'Buku Sejarah DIY'],
      rows: [
        ['Januari', '140 eksemplar', '95 eksemplar', '65 eksemplar'],
        ['Februari', '125 eksemplar', '130 eksemplar', '80 eksemplar'],
        ['Maret', '110 eksemplar', '175 eksemplar', '95 eksemplar'],
      ],
    },
    questionText:
      'Simpulan yang paling tepat berdasarkan tabel tren peminjaman buku tersebut adalah ....',
    options: [
      'A. Total peminjaman buku di perpustakaan mengalami penurunan setiap bulan',
      'B. Peminjaman buku fiksi selalu lebih tinggi dibanding buku Sains & Math tiap bulan',
      'C. Peminjaman buku Sains & Math dan Sejarah DIY terus meningkat dari Januari hingga Maret',
      'D. Pada bulan Februari, buku Sejarah DIY paling banyak dipinjam oleh siswa',
    ],
    correctAnswer:
      'C. Peminjaman buku Sains & Math dan Sejarah DIY terus meningkat dari Januari hingga Maret',
    explanation: {
      konsepDasar:
        'Membaca tabel memerlukan verifikasi angka baris demi baris dan kolom demi kolom.',
      langkahPengerjaan: [
        'Cek opsi A: Total Jan = 300, Feb = 335, Mar = 380 → Justru meningkat, jadi A salah.',
        'Cek opsi B: Di Februari fiksi (125) < Sains & Math (130), jadi B salah.',
        'Cek opsi C: Sains & Math (95 → 130 → 175) naik terus; Sejarah DIY (65 → 80 → 95) naik terus → Benar!',
        'Cek opsi D: Di Februari, Sejarah DIY (80) justru paling sedikit → Salah.',
      ],
      tipsCepat:
        'Bandingkan setiap opsi satu per satu langsung dengan angka di tabel agar tidak terjebak asumsi.',
    },
  },
  {
    id: 'smp-lit-4',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Fakta, Opini, & Evaluasi Argumen',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Transformasi KRL Commuter Line Yogyakarta–Solo',
    stimulusText:
      '(1) Sejak dioperasikan penuh pada awal 2021, KRL Commuter Line lintas Yogyakarta–Solo menggantikan peran kereta api Prambanan Ekspres. (2) Kereta bertenaga listrik ini melayani 13 stasiun mulai dari Stasiun Tugu Yogyakarta hingga Stasiun Palur dengan tarif flat Rp8.000 per perjalanan. (3) Kehadiran KRL menjadikan mobilitas pelajar dan pekerja antar-kota terasa jauh lebih modern serta bebas polusi asap. (4) Ke depannya, frekuensi perjalanan pada jam pulang sekolah perlu ditambah agar penumpang tidak berdesakan.',
    questionText:
      'Kalimat yang memuat gagasan berupa saran atau rekomendasi penulis ditunjukkan oleh nomor ....',
    options: ['A. (1)', 'B. (2)', 'C. (3)', 'D. (4)'],
    correctAnswer: 'D. (4)',
    explanation: {
      konsepDasar:
        'Kalimat rekomendasi/saran dalam teks eksposisi ditandai oleh verba modalitas seperti "perlu", "sebaiknya", atau "hendaknya".',
      langkahPengerjaan: [
        'Kalimat (1) dan (2) berisi fakta historis dan data tarif/jumlah stasiun.',
        'Kalimat (3) berisi opini evaluatif ("jauh lebih modern").',
        'Kalimat (4) memuat frasa "perlu ditambah" yang merupakan rekomendasi penulis.',
      ],
      tipsCepat:
        'Langsung cari kata kunci anjuran ("perlu", "sebaiknya", "harus") pada akhir paragraf.',
    },
  },
  {
    id: 'smp-lit-5',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Makna Simbolis & Analisis Cerpen',
    type: 'pilihan_ganda',
    difficulty: 'HOTS',
    stimulusTitle: 'Suara Gamelan di Pendopo Kecamatan',
    stimulusText:
      'Tiga bulan menjelang festival karawitan pelajar se-DIY, jari-jari Arga masih sering kaku memukul bilah saron. Beberapa temannya mulai jenuh dan memilih pulang lebih awal untuk bermain gim daring. Namun, Arga tetap bertahan menabuh pelan mengikuti ketukan kendang Pak Mardi hingga senja turun. Baginya, setiap tabuhan yang sumbang hari ini adalah tangga batu yang harus ia daki sebelum mampu memainkan gending dengan merdu.',
    questionText:
      'Sudut pandang dan watak tokoh Arga yang tergambar dalam kutipan cerpen tersebut adalah ....',
    options: [
      'A. Orang pertama pelaku utama; mudah menyerah saat menghadapi kesulitan',
      'B. Orang ketiga serba tahu; tekun dan pantang menyerah dalam berlatih',
      'C. Orang pertama pelaku sampingan; gemar menasihati teman-temannya',
      'D. Orang ketiga pengamat; ceroboh dan tergesa-gesa dalam bermain gamelan',
    ],
    correctAnswer:
      'B. Orang ketiga serba tahu; tekun dan pantang menyerah dalam berlatih',
    explanation: {
      konsepDasar:
        'Sudut pandang orang ketiga serba tahu menggunakan nama tokoh ("Arga") serta mampu menggambarkan isi pikiran/perasaan batin tokoh ("Baginya, setiap tabuhan...").',
      langkahPengerjaan: [
        'Narator menyebut nama "Arga" dan kata ganti "ia", bukan "aku" → Orang ketiga.',
        'Narator mengetahui pandangan batin Arga → Serba tahu.',
        'Arga tetap berlatih meski jarinya kaku dan teman-temannya pulang → Tekun dan pantang menyerah.',
      ],
      tipsCepat:
        'Jika tidak ada kata "aku/saya" di luar dialog, pasti sudut pandang orang ketiga!',
    },
  },
  {
    id: 'smp-lit-6',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Inferensi Data Infografik Teks',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Statistik Wisatawan Candi Ratu Boko',
    stimulusText:
      'Pengelola Taman Wisata Candi Ratu Boko mencatat jumlah kunjungan wisatawan nusantara dan mancanegara selama tiga periode libur panjang:',
    dataTable: {
      headers: ['Periode Libur', 'Wisatawan Nusantara', 'Wisatawan Mancanegara'],
      rows: [
        ['Libur Idulfitri', '18.500 orang', '1.500 orang'],
        ['Libur Sekolah Juni', '22.000 orang', '2.400 orang'],
        ['Libur Akhir Tahun', '25.500 orang', '3.100 orang'],
      ],
    },
    questionText:
      'Pernyataan inferensi yang paling tepat berdasarkan data tabel di atas adalah ....',
    options: [
      'A. Kunjungan wisatawan mancanegara selalu lebih banyak daripada wisatawan nusantara',
      'B. Kenaikan jumlah wisatawan nusantara selalu sejalan dengan kenaikan wisatawan mancanegara pada setiap periode',
      'C. Total seluruh wisatawan pada Libur Sekolah Juni melampaui 25.000 orang',
      'D. Persentase wisatawan mancanegara pada Libur Idulfitri mencapai 15% dari total pengunjung',
    ],
    correctAnswer:
      'B. Kenaikan jumlah wisatawan nusantara selalu sejalan dengan kenaikan wisatawan mancanegara pada setiap periode',
    explanation: {
      konsepDasar:
        'Inferensi data membandingkan pola tren antar-kolom dan menguji kebenaran hitungannya.',
      langkahPengerjaan: [
        'Cek tren Nusantara: 18.500 → 22.000 → 25.500 (terus naik).',
        'Cek tren Mancanegara: 1.500 → 2.400 → 3.100 (juga terus naik). Maka opsi B benar.',
        'Cek opsi C: 22.000 + 2.400 = 24.400 (belum melampaui 25.000).',
        'Cek opsi D: 1.500 ÷ 20.000 = 7,5%, bukan 15%.',
      ],
      tipsCepat:
        'Uji setiap opsi menggunakan angka pasti di tabel; eliminasi opsi yang hitungan penjumlahan atau persennya meleset.',
    },
  },
  {
    id: 'smp-lit-7',
    grade: 'SMP',
    subject: 'literasi',
    topic: 'Kohesi, Koherensi, & Kalimat Efektif',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Pengelolaan Sampah Mandiri di Sekolah',
    stimulusText:
      '(1) Banyak para siswa-siswa di SMPN Yogyakarta mulai membawa botol minum isi ulang dari rumah. (2) Kebiasaan ini terbukti mampu mengurangi timbulan sampah plastik sekali pakai di lingkungan kantin sekolah. (3) Selain lebih higienis, membawa bekal minum sendiri juga menghemat uang saku harian.',
    questionText:
      'Perbaikan yang tepat agar kalimat (1) menjadi kalimat efektif adalah ....',
    options: [
      'A. Menghilangkan kata "para" dan mengulang kata "siswa" menjadi "Banyak siswa-siswa"',
      'B. Menghilangkan kata "para" dan mengubah "siswa-siswa" menjadi "siswa"',
      'C. Mengganti kata "dari rumah" menjadi "dari rumahnya masing-masing"',
      'D. Menambahkan kata "sekali" setelah kata "Banyak"',
    ],
    correctAnswer:
      'B. Menghilangkan kata "para" dan mengubah "siswa-siswa" menjadi "siswa"',
    explanation: {
      konsepDasar:
        'Kalimat efektif menghindari kejamakan ganda (pleonasme). Kata "banyak", "para", dan bentuk ulang "siswa-siswa" semuanya sudah bermakna jamak.',
      langkahPengerjaan: [
        'Pada frasa "Banyak para siswa-siswa", terdapat tiga penanda jamak sekaligus.',
        'Cukup gunakan satu penanda jamak: "Banyak siswa di SMPN Yogyakarta..." (pilihan B).',
      ],
      tipsCepat:
        'Jika sudah ada kata "banyak", "semua", atau "para", kata benda di belakangnya tidak boleh diulang.',
    },
  },

  // SMP Numerasi (7 Soal)
  {
    id: 'smp-num-1',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Aritmatika Sosial (Diskon Bertingkat)',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Promo Toko Oleh-Oleh Bakpia Pathok',
    stimulusText:
      'Sebuah toko oleh-oleh di kawasan Pathok menjual 1 kotak bakpia premium seharga Rp60.000. Raka membeli 5 kotak bakpia untuk dibagikan kepada teman sekolahnya. Toko memberikan diskon promo 20% untuk pembelian minimal 3 kotak. Karena Raka membayar menggunakan kartu anggota koperasi pelajar, ia memperoleh tambahan potongan harga sebesar 10% dari harga setelah diskon pertama.',
    questionText: 'Berapakah total uang yang harus dibayar Raka?',
    options: ['A. Rp210.000', 'B. Rp216.000', 'C. Rp220.000', 'D. Rp240.000'],
    correctAnswer: 'B. Rp216.000',
    explanation: {
      konsepDasar:
        'Diskon bertingkat (d1 + d2) dihitung secara berurutan terhadap harga sisa, bukan dijumlahkan langsung menjadi 30%.',
      langkahPengerjaan: [
        'Hitung harga awal 5 kotak: 5 × Rp60.000 = Rp300.000.',
        'Diskon pertama 20%: 20% × Rp300.000 = Rp60.000. Harga menjadi Rp300.000 − Rp60.000 = Rp240.000.',
        'Tambahan diskon 10% dari harga setelah diskon pertama: 10% × Rp240.000 = Rp24.000.',
        'Total yang harus dibayar: Rp240.000 − Rp24.000 = Rp216.000.',
      ],
      tipsCepat:
        'Kalikan langsung faktor bayarnya: 300.000 × 0,8 × 0,9 = 300.000 × 0,72 = Rp216.000. (Perhatikan jebakan 30% yang menghasilkan Rp210.000 di opsi A).',
    },
  },
  {
    id: 'smp-num-2',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Sistem Persamaan Linear Dua Variabel (SPLDV)',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Sentra Kerajinan Gerabah Kasongan',
    stimulusText:
      'Bu Sinta berbelanja kerajinan tanah liat di Kasongan, Bantul. Jika membeli 3 vas bunga dan 2 guci kecil, total harganya Rp210.000. Sedangkan jika membeli 2 vas bunga dan 3 guci kecil dengan jenis yang sama, total harganya Rp240.000.',
    questionText:
      'Jika Bu Sinta hanya membeli 1 vas bunga dan 1 guci kecil, berapakah yang harus ia bayar?',
    options: ['A. Rp80.000', 'B. Rp85.000', 'C. Rp90.000', 'D. Rp95.000'],
    correctAnswer: 'C. Rp90.000',
    explanation: {
      konsepDasar:
        'SPLDV dapat diselesaikan dengan eliminasi-substitusi, atau dijumlahkan langsung jika koefisien x dan y simetris!',
      langkahPengerjaan: [
        'Misalkan harga 1 vas = v dan 1 guci = g.',
        'Persamaan 1: 3v + 2g = 210.000',
        'Persamaan 2: 2v + 3g = 240.000',
        'Jumlahkan kedua persamaan: (3v + 2v) + (2g + 3g) = 210.000 + 240.000 → 5v + 5g = 450.000.',
        'Bagi kedua ruas dengan 5: v + g = Rp90.000.',
      ],
      tipsCepat:
        'Jika ditanya nilai (x + y) dan koefisien kedua persamaan bertukar (3,2 dan 2,3), cukup jumlahkan kedua persamaan lalu bagi (3 + 2) = 5. Sangat hemat waktu saat simulasi TKAD!',
    },
  },
  {
    id: 'smp-num-3',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Bangun Ruang Sisi Lengkung',
    type: 'isian_singkat',
    difficulty: 'HOTS',
    stimulusTitle: 'Drum Penampung Air Hutan Wanagama',
    stimulusText:
      'Di pusat pembibitan hutan Wanagama Gunungkidul, terdapat wadah penyiraman berbentuk tabung tertutup bagian alas dengan jari-jari alas 14 cm dan tinggi 25 cm. Gunakan nilai π = 22/7.',
    questionText:
      'Berapakah volume air maksimal (dalam satuan cm³) yang dapat ditampung wadah tersebut jika terisi penuh? (Tulis angkanya saja tanpa titik)',
    correctAnswer: '15400',
    explanation: {
      konsepDasar: 'Volume tabung dirumuskan sebagai Luas Alas Lingkaran × Tinggi = π × r² × t.',
      langkahPengerjaan: [
        'Diketahui r = 14 cm, t = 25 cm, dan π = 22/7.',
        'Hitung luas alas: 22/7 × 14 × 14 = 22 × 2 × 14 = 616 cm².',
        'Kalikan dengan tinggi tabung: 616 × 25 = 15.400 cm³.',
      ],
      tipsCepat:
        'Untuk mengalikan dengan 25 secara cepat, bagi 4 lalu kalikan 100: (616 ÷ 4) × 100 = 154 × 100 = 15.400.',
    },
  },
  {
    id: 'smp-num-4',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Aritmatika Sosial & SPLDV',
    type: 'isian_singkat',
    difficulty: 'HOTS',
    stimulusTitle: 'Paket Wisata & Tiket Masuk Keraton',
    stimulusText:
      'Rombongan study tour membeli 3 tiket dewasa dan 2 tiket pelajar dengan total harga Rp65.000. Sementara itu, rombongan lain membeli 2 tiket dewasa dan 4 tiket pelajar dengan total harga Rp70.000.',
    questionText:
      'Berapa rupiah harga 1 tiket dewasa? (Tulis angkanya saja tanpa titik atau Rp)',
    correctAnswer: '15000',
    explanation: {
      konsepDasar:
        'Sistem Persamaan Linear Dua Variabel (SPLDV) diselesaikan dengan eliminasi dan substitusi.',
      langkahPengerjaan: [
        'Misalkan dewasa = d, pelajar = p. Persamaan (1): 3d + 2p = 65.000; Persamaan (2): 2d + 4p = 70.000.',
        'Kalikan persamaan (1) dengan 2 agar koefisien p sama: 6d + 4p = 130.000.',
        'Kurangkan dengan persamaan (2): (6d + 4p) − (2d + 4p) = 130.000 − 70.000 → 4d = 60.000.',
        'Diperoleh d = 60.000 ÷ 4 = 15.000.',
      ],
      tipsCepat:
        'Sederhanakan persamaan (2) dengan dibagi 2 menjadi d + 2p = 35.000, lalu langsung kurangkan dari 3d + 2p = 65.000 → 2d = 30.000 → d = 15.000!',
    },
  },
  {
    id: 'smp-num-5',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Bangun Ruang Sisi Lengkung & Pythagoras',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Tandon Air Hujan di Gunungkidul',
    stimulusText:
      'Sebuah tandon penampungan air hujan berbentuk tabung di Kecamatan Playen, Gunungkidul, memiliki diameter alas 140 cm dan tinggi 100 cm. (Gunakan π = 22/7).',
    questionText:
      'Berapa liter kapasitas air maksimal yang dapat ditampung tandon tersebut?',
    options: ['A. 1.540 liter', 'B. 3.080 liter', 'C. 6.160 liter', 'D. 15.400 liter'],
    correctAnswer: 'A. 1.540 liter',
    explanation: {
      konsepDasar:
        'Volume tabung = π × r² × t. Pastikan memakai jari-jari (r = ½ × diameter) dan mengonversi cm³ ke liter (÷ 1.000).',
      langkahPengerjaan: [
        'Hitung jari-jari: r = 140 cm ÷ 2 = 70 cm (atau 7 dm).',
        'Ubah tinggi ke dm: t = 100 cm = 10 dm.',
        'Hitung volume dalam dm³ (liter): V = (22/7) × 7 × 7 × 10 = 22 × 7 × 10 = 1.540 liter.',
      ],
      tipsCepat:
        'Selalu bagi dua diameter terlebih dahulu! Jika lupa membagi dua, hasilnya akan meleset menjadi 6.160 liter (jebakan opsi C).',
    },
  },
  {
    id: 'smp-num-6',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Barisan & Deret Aritmatika',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Susunan Kursi Gedung Pertunjukan Taman Budaya',
    stimulusText:
      'Ruang pertunjukan di Taman Budaya Yogyakarta memiliki 12 baris kursi. Baris paling depan (baris ke-1) berisi 18 kursi, baris kedua berisi 22 kursi, baris ketiga berisi 26 kursi, dan seterusnya selalu bertambah tetap 4 kursi pada setiap baris di belakangnya.',
    questionText: 'Berapa banyak kursi pada baris paling belakang (baris ke-12)?',
    options: ['A. 58 kursi', 'B. 62 kursi', 'C. 66 kursi', 'D. 70 kursi'],
    correctAnswer: 'B. 62 kursi',
    explanation: {
      konsepDasar:
        'Suku ke-n barisan aritmatika dirumuskan dengan Un = a + (n − 1) × b.',
      langkahPengerjaan: [
        'Diketahui suku pertama a = 18, beda b = 4, dan n = 12.',
        'U12 = 18 + (12 − 1) × 4 = 18 + 11 × 4 = 18 + 44 = 62 kursi.',
      ],
      tipsCepat:
        'Dari baris ke-1 ke baris ke-12 ada 11 lompatan (12 − 1). Tinggal hitung 18 + (11 × 4) = 62.',
    },
  },
  {
    id: 'smp-num-7',
    grade: 'SMP',
    subject: 'numerasi',
    topic: 'Peluang & Statistika Data',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Undian Doorprize Sepeda Santai Jogja',
    stimulusText:
      'Dalam acara sepeda santai memperingati HUT Kota Yogyakarta, panitia membagikan 150 kupon undian bernomor urut 1 sampai 150 kepada peserta yang hadir. Satu kupon akan diambil secara acak untuk memenangkan hadiah utama.',
    questionText:
      'Berapakah peluang terambilnya kupon undian yang bernomor kelipatan 15?',
    options: ['A. 1/15', 'B. 1/10', 'C. 3/25', 'D. 2/15'],
    correctAnswer: 'A. 1/15',
    explanation: {
      konsepDasar:
        'Peluang kejadian A dirumuskan dengan P(A) = n(A) ÷ n(S).',
      langkahPengerjaan: [
        'Banyak seluruh kupon n(S) = 150.',
        'Banyak bilangan kelipatan 15 antara 1 sampai 150: 150 ÷ 15 = 10 kupon (yaitu 15, 30, 45, ..., 150).',
        'Peluang P(A) = 10 / 150 = 1/15.',
      ],
      tipsCepat:
        'Untuk mencari banyak kelipatan k dari 1 sampai N, langsung bagi N dengan k: 150 ÷ 15 = 10.',
    },
  },

  // SMP Sains (7 Soal)
  {
    id: 'smp-sai-1',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Kalor & Perubahan Suhu',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Memanaskan Air Seduhan Wedang Uwuh',
    stimulusText:
      'Untuk menyeduh wedang uwuh khas Imogiri, sebanyak 0,5 kg air bersuhu awal 25°C dipanaskan di atas kompor hingga mencapai suhu 85°C. Diketahui kalor jenis air adalah 4.200 J/(kg·°C).',
    questionText: 'Berapakah besar kalor yang dibutuhkan untuk memanaskan air tersebut?',
    options: ['A. 63 kJ', 'B. 105 kJ', 'C. 126 kJ', 'D. 178,5 kJ'],
    correctAnswer: 'C. 126 kJ',
    explanation: {
      konsepDasar:
        'Kalor yang diperlukan untuk menaikkan suhu zat dihitung dengan rumus Q = m × c × ΔT.',
      langkahPengerjaan: [
        'Hitung kenaikan suhu: ΔT = 85°C − 25°C = 60°C.',
        'Substitusi ke rumus Q = m × c × ΔT: Q = 0,5 × 4.200 × 60.',
        'Q = 2.100 × 60 = 126.000 Joule.',
        'Konversi ke kilojoule (bagi 1.000): 126.000 J = 126 kJ.',
      ],
      tipsCepat:
        'Kalikan 0,5 × 60 = 30 terlebih dahulu, lalu 30 × 4.200 = 126.000 J = 126 kJ. Jauh lebih mudah daripada mengali angka besar di awal!',
    },
  },
  {
    id: 'smp-sai-2',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Pewarisan Sifat (Genetika)',
    type: 'pilihan_ganda',
    difficulty: 'HOTS',
    stimulusTitle: 'Pemuliaan Tanaman Salak di Sleman',
    stimulusText:
      'Seorang peneliti pertanian menyilangkan tanaman salak berbuah besar-rasa manis heterozigot (BbMm) dengan sesamanya (BbMm). Sifat buah besar (B) dominan terhadap buah kecil (b), dan rasa manis (M) dominan terhadap rasa asam (m). Dari persilangan dihibrid tersebut diperoleh 320 bibit tanaman baru.',
    questionText:
      'Perkiraan jumlah bibit tanaman salak yang berfenotipe buah besar dan rasa manis adalah ....',
    options: ['A. 20 bibit', 'B. 60 bibit', 'C. 180 bibit', 'D. 240 bibit'],
    correctAnswer: 'C. 180 bibit',
    explanation: {
      konsepDasar:
        'Persilangan dihibrid antar-heterozigot (BbMm × BbMm) menghasilkan perbandingan fenotipe klasik 9 : 3 : 3 : 1.',
      langkahPengerjaan: [
        'Total bagian perbandingan fenotipe dihibrid = 9 + 3 + 3 + 1 = 16 bagian.',
        'Proporsi fenotipe dominan ganda (buah besar & rasa manis, B_M_) adalah 9/16.',
        'Hitung jumlah bibit: 9/16 × 320 = 9 × 20 = 180 bibit.',
      ],
      tipsCepat:
        'Hafalkan rasio fenotipe persilangan BbMm × BbMm yaitu 9 : 3 : 3 : 1 (9 dominan-dominan, 3 dominan-resesif, 3 resesif-dominan, 1 resesif-resesif).',
    },
  },
  {
    id: 'smp-sai-3',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Energi & Daya Listrik',
    type: 'isian_singkat',
    difficulty: 'Menengah',
    stimulusTitle: 'Hemat Energi Listrik di Ruang Belajar',
    stimulusText:
      'Di ruang belajarnya, Dimas menyalakan sebuah lampu belajar LED berdaya 12 watt selama 5 jam setiap malam. Tarif dasar listrik yang berlaku adalah Rp1.500 per kWh.',
    questionText:
      'Berapa rupiah biaya listrik khusus untuk lampu belajar tersebut selama 30 hari pemakaian? (Tulis angkanya saja tanpa titik atau Rp)',
    correctAnswer: '2700',
    explanation: {
      konsepDasar:
        'Energi listrik dalam kWh = (Daya dalam Watt × Lama pemakaian total dalam jam) ÷ 1.000.',
      langkahPengerjaan: [
        'Hitung total waktu pemakaian selama 30 hari: 5 jam/hari × 30 hari = 150 jam.',
        'Hitung energi dalam Wh: 12 Watt × 150 jam = 1.800 Wh.',
        'Ubah menjadi kWh: 1.800 ÷ 1.000 = 1,8 kWh.',
        'Kalikan dengan tarif per kWh: 1,8 × Rp1.500 = Rp2.700.',
      ],
      tipsCepat:
        'Pastikan selalu membagi dengan 1.000 untuk mengubah Watt-jam (Wh) ke kilowatt-jam (kWh) sebelum dikalikan tarif.',
    },
  },
  {
    id: 'smp-sai-4',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Kalor, Energi, & Listrik Dinamis',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Penggunaan Lampu Belajar Hemat Energi',
    stimulusText:
      'Rafi menggunakan 2 buah lampu belajar LED masing-masing berdaya 15 Watt dan sebuah kipas angin berdaya 45 Watt selama 4 jam setiap malam untuk belajar persiapan TKAD. Tarif dasar listrik golongan rumah tangga adalah Rp1.500 per kWh.',
    questionText:
      'Berapa biaya listrik yang harus dibayar untuk pemakaian peralatan tersebut selama 30 hari?',
    options: ['A. Rp9.000', 'B. Rp13.500', 'C. Rp18.000', 'D. Rp27.000'],
    correctAnswer: 'B. Rp13.500',
    explanation: {
      konsepDasar:
        'Energi (kWh) = (Total Daya Watt × Jam per hari × Jumlah hari) ÷ 1.000.',
      langkahPengerjaan: [
        'Hitung total daya: (2 × 15 Watt) + 45 Watt = 30 + 45 = 75 Watt.',
        'Hitung total waktu selama 30 hari: 4 jam/hari × 30 hari = 120 jam.',
        'Hitung energi dalam kWh: (75 Watt × 120 jam) ÷ 1.000 = 9.000 Wh ÷ 1.000 = 9 kWh.',
        'Kalikan tarif: 9 kWh × Rp1.500 = Rp13.500.',
      ],
      tipsCepat:
        'Jangan lupa mengalikan jumlah lampu LED (ada 2 buah lampu = 30 Watt)!',
    },
  },
  {
    id: 'smp-sai-5',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Sistem Organ & Pewarisan Sifat',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Pemuliaan Tanaman Cabai di Lahan Pasir Pantai',
    stimulusText:
      'Peneliti pertanian di Kulon Progo menyilangkan tanaman cabai berbuah lebat-tidak pedas (LLtt) dengan tanaman cabai berbuah sedikit-pedas (llTT). Sifat berbuah lebat (L) dan rasa pedas (T) bersifat dominan penuh. Selanjutnya, keturunan pertama (F1) disilangkan sesamanya.',
    questionText:
      'Jika dihasilkan 320 tanaman pada keturunan kedua (F2), berapa tanaman yang diharapkan memiliki sifat unggul berbuah lebat dan rasa pedas?',
    options: ['A. 20 tanaman', 'B. 60 tanaman', 'C. 180 tanaman', 'D. 240 tanaman'],
    correctAnswer: 'C. 180 tanaman',
    explanation: {
      konsepDasar:
        'Persilangan dihibrid antar-heterozigot (LlTt × LlTt) menghasilkan perbandingan fenotipe 9 : 3 : 3 : 1 (total 16 bagian).',
      langkahPengerjaan: [
        'F1 hasil persilangan LLtt × llTT adalah LlTt (100% lebat-pedas).',
        'F1 × F1 (LlTt × LlTt) menghasilkan proporsi fenotipe dominan-dominan (L_T_) sebanyak 9/16 bagian.',
        'Jumlah tanaman lebat-pedas = (9/16) × 320 = 9 × 20 = 180 tanaman.',
      ],
      tipsCepat:
        'Hafalkan rasio klasik dihibrid 9 : 3 : 3 : 1. Sifat ganda dominan selalu bernilai 9/16!',
    },
  },
  {
    id: 'smp-sai-6',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Gaya, Tekanan, & Gerak Benda',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Tekanan Hidrostatis di Embung Nglanggeran',
    stimulusText:
      'Embung Nglanggeran di Gunungkidul menampung air tawar dengan massa jenis 1.000 kg/m³. Sebuah katup saluran pembuangan berada pada kedalaman 3 meter di bawah permukaan air embung (percepatan gravitasi g = 10 m/s²).',
    questionText:
      'Besar tekanan hidrostatis yang dialami katup saluran tersebut adalah ....',
    options: ['A. 3.000 Pa', 'B. 10.000 Pa', 'C. 30.000 Pa', 'D. 300.000 Pa'],
    correctAnswer: 'C. 30.000 Pa',
    explanation: {
      konsepDasar:
        'Tekanan hidrostatis dirumuskan dengan Ph = ρ × g × h (h diukur dari permukaan air ke titik benda).',
      langkahPengerjaan: [
        'Diketahui ρ = 1.000 kg/m³, g = 10 m/s², dan kedalaman h = 3 m.',
        'Ph = 1.000 × 10 × 3 = 30.000 N/m² (Pascal).',
      ],
      tipsCepat:
        'Pastikan h adalah kedalaman dari permukaan air, bukan jarak dari dasar kolam!',
    },
  },
  {
    id: 'smp-sai-7',
    grade: 'SMP',
    subject: 'sains',
    topic: 'Getaran, Gelombang, & Bunyi',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Gema Tebing Breksi Sleman',
    stimulusText:
      'Saat melakukan percobaan akustik di sekitar tebing batu kapur Tebing Breksi, seorang siswa membunyikan peluit dan mendengar bunyi pantulnya kembali tepat 0,8 detik kemudian. Jika cepat rambat bunyi di udara saat itu adalah 340 m/s.',
    questionText: 'Berapa meter jarak antara siswa tersebut dengan dinding tebing?',
    options: ['A. 136 meter', 'B. 272 meter', 'C. 425 meter', 'D. 544 meter'],
    correctAnswer: 'A. 136 meter',
    explanation: {
      konsepDasar:
        'Untuk mengukur jarak pemantul bunyi (gema), digunakan rumus s = (v × t) ÷ 2 karena bunyi menempuh jarak bolak-balik.',
      langkahPengerjaan: [
        'Diketahui v = 340 m/s dan waktu bolak-balik t = 0,8 s.',
        's = (340 × 0,8) ÷ 2 = 272 ÷ 2 = 136 meter.',
      ],
      tipsCepat:
        'Jangan lupa dibagi 2! Tanpa dibagi 2 hasilnya 272 m (jebakan opsi B) yang merupakan jarak bolak-balik.',
    },
  },

  // ================= SMP BAHASA INGGRIS (9 SOAL KHUSUS TKAD SMP DIY) =================
  {
    id: 'smp-ing-1',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Functional Text (Notice, Announcement, & Label)',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'Visitor Notice at Prambanan Temple Zone 1',
    stimulusText:
      'ATTENTION ALL VISITORS\nTo preserve the ancient stone relief of Prambanan Temple, visitors are strictly prohibited from climbing, sitting on, or touching the temple carvings. Please stay within the designated wooden pathways. Thank you for helping us protect our world heritage.',
    questionText: 'What is the main purpose of the notice above?',
    options: [
      'A. To invite tourists to take photos on the temple stones',
      'B. To warn visitors not to damage or touch the temple reliefs',
      'C. To announce the ticket price for entering Prambanan Temple',
      'D. To guide visitors to the nearest souvenir market',
    ],
    correctAnswer: 'B. To warn visitors not to damage or touch the temple reliefs',
    explanation: {
      konsepDasar:
        'Notice berisi peringatan atau larangan singkat di ruang publik agar pengunjung mematuhi aturan keselamatan/pelestarian.',
      langkahPengerjaan: [
        'Perhatikan frasa kunci "strictly prohibited from climbing, sitting on, or touching the temple carvings" (dilarang keras memanjat, menduduki, atau menyentuh ukiran candi).',
        'Tujuannya adalah memperingatkan pengunjung agar tidak menyentuh atau merusak relief candi (pilihan B).',
      ],
      tipsCepat:
        'Kata "prohibited / forbidden / not allowed" selalu berpasangan dengan tujuan "to warn / to forbid / to prohibit".',
    },
  },
  {
    id: 'smp-ing-2',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Functional Text (Notice, Announcement, & Label)',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'School Announcement: TKAD Simulation Schedule',
    stimulusText:
      'ANNOUNCEMENT\nTo: All Ninth-Grade Students of SMP Negeri Yogyakarta\nPlease be informed that the Regional Academic Readiness Test (TKAD) Simulation will be held from Monday, February 10 to Thursday, February 13, 2025, starting at 07.30 WIB sharp in the computer laboratories. Every student must bring their participant card, a blue-ink pen, and arrive 20 minutes earlier for device verification. Electronic gadgets and smartwatches are not permitted inside the testing room.',
    questionText:
      'Based on the announcement, what should the students do before entering the testing room?',
    options: [
      'A. Bring a smartwatch to check the remaining test time',
      'B. Arrive at the school laboratory at 07.10 WIB at the latest',
      'C. Register their names at 07.30 WIB sharp',
      'D. Submit their participant cards a day before Monday',
    ],
    correctAnswer: 'B. Arrive at the school laboratory at 07.10 WIB at the latest',
    explanation: {
      konsepDasar:
        'Soal pemahaman detail pada announcement menuntut penghitungan waktu sederhana atau penyimpulan syarat wajib.',
      langkahPengerjaan: [
        'Ujian dimulai pukul 07.30 WIB ("starting at 07.30 WIB sharp").',
        'Siswa wajib hadir 20 menit lebih awal ("arrive 20 minutes earlier") → 07.30 − 20 menit = 07.10 WIB.',
        'Opsi A salah karena smartwatch dilarang ("not permitted").',
      ],
      tipsCepat:
        'Perhatikan angka waktu pada teks announcement dan hitung selisihnya dengan cermat.',
    },
  },
  {
    id: 'smp-ing-3',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Functional Text (Notice, Announcement, & Label)',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Herbal Wedang Ginger Drink Label',
    stimulusText:
      'JOGJA HERBAL GINGER INSTANT DRINK\nNet Weight: 250 g (10 sachets @ 25 g)\nIngredients: Red ginger extract, palm sugar, lemongrass, cinnamon, clove.\nDirection: Pour 1 sachet into a cup, add 150 ml of hot water, stir well, and serve warm.\nStorage: Keep in a cool, dry place away from direct sunlight.\nBest Before: 18 November 2026',
    questionText:
      'How much hot water is needed if Rina wants to make three cups of this ginger drink using three sachets?',
    options: ['A. 150 ml', 'B. 300 ml', 'C. 450 ml', 'D. 750 ml'],
    correctAnswer: 'C. 450 ml',
    explanation: {
      konsepDasar:
        'Membaca bagian "Direction" (petunjuk penyajian) pada label produk dan mengalikan takaran sesuai jumlah penyajian.',
      langkahPengerjaan: [
        'Pada petunjuk penyajian tertulis: 1 sachet membutuhkan 150 ml air panas ("Pour 1 sachet into a cup, add 150 ml of hot water").',
        'Untuk 3 sachet (3 cangkir): 3 × 150 ml = 450 ml.',
      ],
      tipsCepat:
        'Jangan tertipu angka "250 g" pada Net Weight; fokus pada bagian "Direction" untuk takaran penyajian.',
    },
  },
  {
    id: 'smp-ing-4',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Narrative, Recount, & Descriptive Text',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Exploring Pindul Cave in Gunungkidul',
    stimulusText:
      'Last month, my classmates and I went on a study trip to Pindul Cave in Bejiharjo, Gunungkidul. Before entering the underground river, the local guides provided us with life jackets, rubber tubes, and headlamps. As we floated gently along the calm emerald water, we were amazed by the sparkling stalactites hanging from the cave ceiling. At the middle of the cave, there was a wide opening where sunlight shone straight down onto the water, creating a magical pillar of light. We felt both thrilled and grateful to witness such natural beauty.',
    questionText: 'What is the main idea of the paragraph above?',
    options: [
      'A. The safety equipment needed for cave tubing in Gunungkidul',
      'B. The writer’s memorable experience exploring Pindul Cave with classmates',
      'C. How stalactites and stalagmites are formed inside underground caves',
      'D. The history of Bejiharjo village as a tourist destination',
    ],
    correctAnswer:
      'B. The writer’s memorable experience exploring Pindul Cave with classmates',
    explanation: {
      konsepDasar:
        'Recount text menceritakan pengalaman masa lalu (ditandai past tense: went, provided, floated, felt). Ide pokoknya merangkum keseluruhan pengalaman tersebut.',
      langkahPengerjaan: [
        'Kalimat pertama memperkenalkan kegiatan utama: perjalanan wisata ke Gua Pindul bersama teman sekelas.',
        'Kalimat-kalimat berikutnya menjelaskan perlengkapan, pemandangan stalaktit, dan perasaan kagum penulis.',
        'Pilihan B merangkum keseluruhan isi paragraf recount tersebut.',
      ],
      tipsCepat:
        'Untuk Recount Text, ide pokok biasanya berupa "The writer’s experience in/at..." (pengalaman penulis di...).',
    },
  },
  {
    id: 'smp-ing-5',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Narrative, Recount, & Descriptive Text',
    type: 'pilihan_ganda',
    difficulty: 'HOTS',
    stimulusTitle: 'The Legend of Roro Jonggrang (Excerpt)',
    stimulusText:
      'Realizing that Bandung Bondowoso’s genie army had nearly finished building a thousand temples before dawn, Roro Jonggrang woke the village women up. She asked them to pound rice mortars and burn straw in the east so that the roosters would crow early. Hearing the sounds and seeing the bright red sky, the genies thought morning had arrived and fled immediately. When Bandung Bondowoso discovered the trick, he became furious because only 999 temples had been completed.',
    questionText:
      'The word "them" in the sentence "She asked them to pound rice mortars..." refers to ....',
    options: [
      'A. the thousand temples',
      'B. Bandung Bondowoso’s genies',
      'C. the village women',
      'D. the roosters',
    ],
    correctAnswer: 'C. the village women',
    explanation: {
      konsepDasar:
        'Pronoun reference (rujukan kata ganti): "them" adalah kata ganti objek jamak (plural) yang merujuk pada kelompok orang/benda jamak yang disebut tepat sebelumnya.',
      langkahPengerjaan: [
        'Baca kalimat sebelum kata "them": "...Roro Jonggrang woke the village women up."',
        'Subjek yang dibangunkan dan diminta menumbuk lesung adalah "the village women" (para wanita desa).',
      ],
      tipsCepat:
        'Cek kata benda jamak terdekat di kalimat sebelumnya yang paling masuk akal melakukan kata kerja setelahnya ("pound rice mortars").',
    },
  },
  {
    id: 'smp-ing-6',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Report & Procedural Text',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Javanese Hawk-Eagle (Elang Jawa)',
    stimulusText:
      'The Javanese Hawk-Eagle (Nisaetus bartelsi) is an endangered raptor endemic to the mountainous forests of Java, including the slopes of Mount Merapi in Yogyakarta. This medium-sized bird of prey is easily recognized by its prominent crest of three to four black feathers on top of its head. It feeds mainly on small mammals, reptiles, and smaller birds. Unfortunately, habitat loss and illegal poaching have significantly reduced its population in the wild.',
    questionText:
      'Why is the population of the Javanese Hawk-Eagle decreasing according to the text?',
    options: [
      'A. Because it cannot survive in mountainous forest areas',
      'B. Due to the destruction of its habitat and illegal hunting',
      'C. Because it has too many black feathers on its head',
      'D. Due to the lack of small mammals on Mount Merapi',
    ],
    correctAnswer:
      'B. Due to the destruction of its habitat and illegal hunting',
    explanation: {
      konsepDasar:
        'Mencari hubungan sebab-akibat ("Why ... decreasing") dalam Report Text.',
      langkahPengerjaan: [
        'Lihat kalimat terakhir teks: "Unfortunately, habitat loss and illegal poaching have significantly reduced its population in the wild."',
        'Kata "habitat loss" sepadan dengan "destruction of its habitat", dan "illegal poaching" sepadan dengan "illegal hunting" (pilihan B).',
      ],
      tipsCepat:
        'Padankan kosakata sinonim di soal dan opsi: "poaching" = perburuan liar ("illegal hunting"), "reduced" = "decreasing".',
    },
  },
  {
    id: 'smp-ing-7',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Grammar & Cloze Text (Conjunction & Tenses)',
    type: 'pilihan_ganda',
    difficulty: 'Menengah',
    stimulusTitle: 'Preparing for the Provincial Olympiad',
    stimulusText:
      'Nadia really wanted to join the English Storytelling Competition held by the Yogyakarta Education Office. ________ she had a sore throat two days before the event, she practiced her facial expressions and gestures diligently at home and finally won second place.',
    questionText:
      'Which conjunction best completes the blank space in the text above?',
    options: ['A. Because', 'B. Although', 'C. Therefore', 'D. Unless'],
    correctAnswer: 'B. Although',
    explanation: {
      konsepDasar:
        'Conjunction of contrast (kata hubung pertentangan): "Although" (meskipun) digunakan sebelum klausa (Subjek + Predikat) untuk menghubungkan dua hal yang bertolak belakang.',
      langkahPengerjaan: [
        'Klausa 1: ia mengalami sakit tenggorokan (kondisi negatif).',
        'Klausa 2: ia tetap berlatih giat dan meraih juara kedua (hasil positif).',
        'Hubungan kedua gagasan bersifat pertentangan, dan diikuti klausa lengkap ("she had a sore throat"), sehingga kata hubung yang tepat adalah "Although" (pilihan B).',
      ],
      tipsCepat:
        'Cek apakah kedua bagian kalimat saling bertentangan (sakit vs tetap juara). Jika bertentangan dan diikuti Subjek + Kata Kerja, pilih "Although / Even though".',
    },
  },
  {
    id: 'smp-ing-8',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Report & Procedural Text',
    type: 'pilihan_ganda',
    difficulty: 'Dasar',
    stimulusTitle: 'How to Make Traditional Wedang Ronde',
    stimulusText:
      'Steps to Prepare Warm Ginger Syrup:\n1. Wash 150 grams of fresh ginger thoroughly and roast it over low heat for 5 minutes until fragrant.\n2. Crush the roasted ginger gently to release its natural aroma.\n3. Boil 1 liter of water in a pot, then add the crushed ginger, 2 bruised lemongrass stalks, and 150 grams of palm sugar.\n4. Simmer on low heat for 15 minutes until the sugar dissolves completely.\n5. Strain the ginger syrup into serving bowls and add glutinous rice balls, roasted peanuts, and kolang-kaling.',
    questionText:
      'What should we do immediately after roasting the fresh ginger?',
    options: [
      'A. Strain the ginger syrup into serving bowls',
      'B. Crush the roasted ginger gently',
      'C. Add palm sugar and lemongrass stalks',
      'D. Boil 1 liter of water in a pot',
    ],
    correctAnswer: 'B. Crush the roasted ginger gently',
    explanation: {
      konsepDasar:
        'Procedure text memuat urutan langkah yang kronologis. Perhatikan kata kunci "immediately after" (segera setelah).',
      langkahPengerjaan: [
        'Langkah 1 adalah memanggang jahe ("roast it over low heat").',
        'Langkah 2 tepat setelahnya adalah mememarkan jahe bakar secara perlahan ("Crush the roasted ginger gently") (pilihan B).',
      ],
      tipsCepat:
        'Cari kata kerja pada pertanyaan ("roasting") di daftar langkah, lalu baca tepat satu nomor di bawahnya.',
    },
  },
  {
    id: 'smp-ing-9',
    grade: 'SMP',
    subject: 'inggris',
    topic: 'Narrative, Recount, & Descriptive Text',
    type: 'pilihan_ganda',
    difficulty: 'HOTS',
    stimulusTitle: 'The Honest Woodcutter of Menoreh Hills',
    stimulusText:
      'One afternoon in the Menoreh Hills, an old woodcutter accidentally dropped his iron axe into a deep river. Sitting sadly on the riverbank, he was suddenly approached by a kind forest spirit who dived into the water and brought up a gleaming golden axe. "Is this yours?" asked the spirit. The woodcutter shook his head honestly. Next, the spirit brought up a silver axe, yet the old man refused again. Finally, the spirit retrieved the worn iron axe, and the woodcutter smiled gratefully. Impressed by his honesty, the spirit rewarded him with all three axes.',
    questionText:
      'What moral value can we learn from the story above?',
    options: [
      'A. Hard work without rest always brings instant wealth',
      'B. Honesty is a noble virtue that brings unexpected rewards',
      'C. Never work near deep rivers in the afternoon',
      'D. Asking for help from strangers is always dangerous',
    ],
    correctAnswer:
      'B. Honesty is a noble virtue that brings unexpected rewards',
    explanation: {
      konsepDasar:
        'Moral value pada teks naratif disimpulkan dari sikap terpuji tokoh utama saat diuji dan akibat baik yang diterimanya.',
      langkahPengerjaan: [
        'Tokoh utama menolak kapak emas dan perak karena bukan miliknya, dan hanya mengakui kapak besi miliknya.',
        'Karena kejujurannya ("Impressed by his honesty"), ia justru dihadiahi ketiga kapak tersebut (pilihan B).',
      ],
      tipsCepat:
        'Temukan kata sifat positif yang menjadi inti konflik cerita ("honestly / honesty" → kejujuran).',
    },
  },
];