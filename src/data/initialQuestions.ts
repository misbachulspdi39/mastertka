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
  // SD Kelas 6
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

  // SMP Kelas 9
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
];

export const INITIAL_QUESTIONS: Question[] = [
  // ================= SD KELAS 6 (9 SOAL) =================
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

  // ================= SMP KELAS 9 (9 SOAL) =================
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
    options: [
      'A. (1) dan (2)',
      'B. (1) dan (3)',
      'C. (2) dan (4)',
      'D. (3) dan (4)',
    ],
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
];
