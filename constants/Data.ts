// ═══════════════════════════════════════════════════════
// constants/Data.ts — Mock Data Lengkap
// ═══════════════════════════════════════════════════════

import type { BeritaItem, GaleriItem, PaketUmroh } from "@/types";

// ── PAKET UMROH ──────────────────────────────────────
export const PAKET_DATA: PaketUmroh[] = [
  {
    id: "pkt-001",
    nama: "Umroh Spesial Musim Semi",
    jenis: "umrah-reguler",
    harga: 35_500_000,
    hargaDeposit: 2_500_000,
    durasi: 9,
    bintangHotel: 5,
    maskapai: "Garuda Indonesia",
    kotaKeberangkatan: "Jakarta / Gorontalo",
    imageUrl:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
    badge: "Paling Populer",
    deskripsi:
      "Paket umroh 9 hari dengan fasilitas bintang 5. Penerbangan langsung Garuda Indonesia, hotel mewah dekat Masjidil Haram dan Masjid Nabawi. Didampingi muthawif berpengalaman berbahasa Indonesia.",
    fasilitas: [
      "Tiket pesawat PP Garuda Indonesia",
      "Hotel bintang 5 Makkah & Madinah",
      "Makan 3x sehari menu Indonesia",
      "Muthawif berpengalaman",
      "Asuransi perjalanan",
      "Air zamzam 5 liter",
      "Perlengkapan ibadah (koper, kain ihram)",
      "Bus AC full AC selama perjalanan",
    ],
    itinerary: [
      {
        hari: 1,
        judul: "Jakarta/Gorontalo – Jeddah",
        deskripsi:
          "Berkumpul di bandara, check-in bagasi. Penerbangan langsung Garuda Indonesia. Tiba di Bandara King Abdulaziz Jeddah.",
        lokasi: "Bandara",
      },
      {
        hari: 2,
        judul: "Jeddah – Madinah",
        deskripsi:
          "Perjalanan ke Madinah dengan bus AC. Check-in hotel bintang 5. Shalat Ashar di Masjid Nabawi.",
        lokasi: "Madinah",
      },
      {
        hari: 3,
        judul: "Madinah (Ziarah)",
        deskripsi:
          "Ibadah di Masjid Nabawi, Raudhah, ziarah Makam Baqi, Masjid Quba, Masjid Qiblatayn.",
        lokasi: "Madinah",
      },
      {
        hari: 4,
        judul: "Madinah – Makkah (Miqot)",
        deskripsi:
          "Berihram di Bir Ali (Miqot). Perjalanan ke Makkah dengan Kereta Haramain. Umroh pertama.",
        lokasi: "Makkah",
      },
      {
        hari: 5,
        judul: "Makkah (Ibadah)",
        deskripsi:
          "Shalat 5 waktu di Masjidil Haram. Tawaf sunnah, sa'i sunnah. Ziarah sekitar Makkah.",
        lokasi: "Makkah",
      },
      {
        hari: 6,
        judul: "Makkah (Ibadah)",
        deskripsi:
          "Shalat 5 waktu di Masjidil Haram. Tawaf sunnah, sa'i sunnah. Waktu bebas ibadah.",
        lokasi: "Makkah",
      },
      {
        hari: 7,
        judul: "Makkah (Ziarah)",
        deskripsi:
          "Ziarah Jabal Nur, Jabal Tsur, Arafah, Muzdalifah, Mina. Shalat di Masjid Jin.",
        lokasi: "Makkah",
      },
      {
        hari: 8,
        judul: "Makkah – Jeddah",
        deskripsi:
          "Tawaf wada'. Perjalanan ke Jeddah. Waktu bebas belanja oleh-oleh. Check-in Bandara.",
        lokasi: "Jeddah",
      },
      {
        hari: 9,
        judul: "Jeddah – Jakarta/Gorontalo",
        deskripsi:
          "Penerbangan pulang ke tanah air. Tiba dengan selamat penuh berkah.",
        lokasi: "Bandara",
      },
    ],
    kuota: 45,
    tersisa: 12,
    isActive: true,
  },
  {
    id: "pkt-002",
    nama: "Umroh Premium Ramadhan",
    jenis: "umrah-premium",
    harga: 38_900_000,
    hargaDeposit: 2_500_000,
    durasi: 10,
    bintangHotel: 5,
    maskapai: "Garuda Indonesia",
    kotaKeberangkatan: "Jakarta / Gorontalo",
    imageUrl:
      "https://images.unsplash.com/photo-1563002090-a31bc9e30fd0?w=800&q=80",
    badge: "Ramadhan Special",
    deskripsi:
      "Rasakan keistimewaan ibadah di bulan Ramadhan di Tanah Suci. Paket premium 10 hari dengan hotel bintang 5 strategis. Berbuka dan sahur bersama di restoran hotel.",
    fasilitas: [
      "Tiket pesawat PP Garuda Indonesia",
      "Hotel bintang 5 (jarak 200m dari Masjidil Haram)",
      "Makan sahur & buka (Ramadhan)",
      "Muthawif senior berbahasa Indonesia",
      "Asuransi perjalanan & jiwa",
      "Air zamzam 10 liter",
      "Perlengkapan ibadah premium",
      "Free wifi di hotel",
      "Laundry 2x selama perjalanan",
    ],
    itinerary: [
      {
        hari: 1,
        judul: "Keberangkatan dari Indonesia",
        deskripsi:
          "Berkumpul di bandara, penerbangan ke Jeddah dengan Garuda Indonesia.",
        lokasi: "Bandara",
      },
      {
        hari: 2,
        judul: "Madinah",
        deskripsi:
          "Tiba Madinah. Ibadah di Masjid Nabawi. Berbuka pertama di Madinah.",
        lokasi: "Madinah",
      },
      {
        hari: 3,
        judul: "Madinah",
        deskripsi: "Ziarah Madinah: Raudhah, Makam Baqi, Masjid Quba.",
        lokasi: "Madinah",
      },
      {
        hari: 4,
        judul: "Madinah",
        deskripsi: "Waktu bebas ibadah di Masjid Nabawi.",
        lokasi: "Madinah",
      },
      {
        hari: 5,
        judul: "Makkah (Umroh)",
        deskripsi: "Miqot di Bir Ali. Tiba Makkah. Pelaksanaan umroh.",
        lokasi: "Makkah",
      },
      {
        hari: 6,
        judul: "Makkah",
        deskripsi: "Shalat tarawih di Masjidil Haram. Ibadah malam.",
        lokasi: "Makkah",
      },
      {
        hari: 7,
        judul: "Makkah",
        deskripsi: "Ziarah sekitar Makkah. Tawaf sunnah.",
        lokasi: "Makkah",
      },
      {
        hari: 8,
        judul: "Makkah",
        deskripsi: "Qiyamul lail, i'tikaf di Masjidil Haram.",
        lokasi: "Makkah",
      },
      {
        hari: 9,
        judul: "Makkah – Jeddah",
        deskripsi: "Tawaf wada'. Perjalanan ke Jeddah. Belanja oleh-oleh.",
        lokasi: "Jeddah",
      },
      {
        hari: 10,
        judul: "Pulang ke Indonesia",
        deskripsi: "Penerbangan pulang ke tanah air.",
        lokasi: "Bandara",
      },
    ],
    kuota: 30,
    tersisa: 8,
    isActive: true,
  },
  {
    id: "pkt-003",
    nama: "Umroh Plus Turki & Eropa",
    jenis: "umrah-premium",
    harga: 52_900_000,
    hargaDeposit: 3_000_000,
    durasi: 14,
    bintangHotel: 5,
    maskapai: "Turkish Airlines",
    kotaKeberangkatan: "Jakarta",
    imageUrl:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    badge: "Wisata + Ibadah",
    deskripsi:
      "Paket umroh premium dengan wisata Istanbul Turki. 14 hari perjalanan berkesan, mengunjungi Hagia Sophia, Blue Mosque, Grand Bazaar, sebelum ibadah di Tanah Suci.",
    fasilitas: [
      "Tiket pesawat PP Turkish Airlines",
      "Hotel bintang 5 semua kota",
      "Makan 3x sehari",
      "Muthawif & Tour Guide",
      "Asuransi perjalanan",
      "City tour Istanbul",
      "Air zamzam 5 liter",
      "Perlengkapan ibadah",
    ],
    itinerary: [
      {
        hari: 1,
        judul: "Jakarta – Istanbul",
        deskripsi: "Penerbangan ke Istanbul, Turki dengan Turkish Airlines.",
        lokasi: "Istanbul",
      },
      {
        hari: 2,
        judul: "Istanbul (City Tour)",
        deskripsi: "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar.",
        lokasi: "Istanbul",
      },
      {
        hari: 3,
        judul: "Istanbul – Jeddah",
        deskripsi: "Penerbangan dari Istanbul ke Jeddah untuk ibadah umroh.",
        lokasi: "Jeddah",
      },
      {
        hari: 4,
        judul: "Madinah",
        deskripsi: "Tiba Madinah. Ibadah di Masjid Nabawi.",
        lokasi: "Madinah",
      },
      {
        hari: 14,
        judul: "Pulang ke Indonesia",
        deskripsi: "Penerbangan pulang via Istanbul.",
        lokasi: "Bandara",
      },
    ],
    kuota: 25,
    tersisa: 15,
    isActive: true,
  },
  {
    id: "pkt-004",
    nama: "Haji Furoda 1446H",
    jenis: "haji-furoda",
    harga: 250_000_000,
    hargaDeposit: 10_000_000,
    durasi: 21,
    bintangHotel: 5,
    maskapai: "Garuda Indonesia",
    kotaKeberangkatan: "Jakarta / Gorontalo",
    imageUrl:
      "https://images.unsplash.com/photo-1548407260-da850faa41e3?w=800&q=80",
    badge: "Tanpa Antri",
    deskripsi:
      "Haji Furoda (Haji Mujamalah) resmi dengan visa haji mujamalah dari pemerintah Arab Saudi. Tanpa antri, langsung berangkat tahun ini. Fasilitas VIP setara bintang 5.",
    fasilitas: [
      "Visa haji mujamalah resmi",
      "Tiket pesawat PP Garuda Indonesia",
      "Hotel VIP bintang 5",
      "Makan 3x sehari menu premium",
      "Pembimbing ibadah berpengalaman",
      "Transportasi VIP (mobil pribadi)",
      "Asuransi haji premium",
      "Perlengkapan haji lengkap",
    ],
    itinerary: [
      {
        hari: 1,
        judul: "Keberangkatan",
        deskripsi: "Penerbangan ke Jeddah, check-in hotel VIP.",
        lokasi: "Jeddah",
      },
      {
        hari: 8,
        judul: "Wukuf Arafah",
        deskripsi:
          "Inti ibadah haji: Wukuf di Arafah, Mabit Muzdalifah, Lempar Jumroh.",
        lokasi: "Arafah",
      },
      {
        hari: 21,
        judul: "Kepulangan",
        deskripsi: "Penerbangan kembali ke Indonesia membawa predikat Mabrur.",
        lokasi: "Bandara",
      },
    ],
    kuota: 10,
    tersisa: 4,
    isActive: true,
  },
];

// ── GALERI ────────────────────────────────────────────
export const GALERI_DATA: GaleriItem[] = [
  {
    id: "g-001",
    judul: "Tawaf di Masjidil Haram",
    imageUrl:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&q=80",
    kategori: "ibadah",
    tanggal: "2024-03-15",
    deskripsi: "Jamaah Lamahu Tour melaksanakan tawaf di Masjidil Haram",
  },
  {
    id: "g-002",
    judul: "Masjid Nabawi Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1563002090-a31bc9e30fd0?w=400&q=80",
    kategori: "ibadah",
    tanggal: "2024-03-16",
    deskripsi: "Suasana Masjid Nabawi yang megah",
  },
  {
    id: "g-003",
    judul: "Hotel Bintang 5 Makkah",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
    kategori: "hotel",
    tanggal: "2024-03-14",
    deskripsi: "Kamar hotel bintang 5 kami di Makkah",
  },
  {
    id: "g-004",
    judul: "Keberangkatan Bersama",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    kategori: "kegiatan",
    tanggal: "2024-03-13",
    deskripsi: "Momen keberangkatan jamaah Lamahu Tour",
  },
  {
    id: "g-005",
    judul: "Ziarah Jabal Nur",
    imageUrl:
      "https://images.unsplash.com/photo-1548407260-da850faa41e3?w=400&q=80",
    kategori: "perjalanan",
    tanggal: "2024-03-17",
    deskripsi: "Perjalanan ke Jabal Nur (Gua Hira)",
  },
  {
    id: "g-006",
    judul: "Sa'i di Mas'a",
    imageUrl:
      "https://images.unsplash.com/photo-1591604466107-6a2a1bf7d864?w=400&q=80",
    kategori: "ibadah",
    tanggal: "2024-03-15",
    deskripsi: "Jamaah melaksanakan sa'i antara Shafa dan Marwa",
  },
  {
    id: "g-007",
    judul: "Makan Bersama Jamaah",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    kategori: "kegiatan",
    tanggal: "2024-03-16",
    deskripsi: "Santap malam bersama seluruh jamaah",
  },
  {
    id: "g-008",
    judul: "Kamar Hotel Madinah",
    imageUrl:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
    kategori: "hotel",
    tanggal: "2024-03-14",
    deskripsi: "Fasilitas kamar hotel bintang 5 di Madinah",
  },
  {
    id: "g-009",
    judul: "Kereta Haramain",
    imageUrl:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80",
    kategori: "perjalanan",
    tanggal: "2024-03-17",
    deskripsi: "Perjalanan Madinah–Makkah dengan Kereta Haramain",
  },
];

// ── BERITA ────────────────────────────────────────────
export const BERITA_DATA: BeritaItem[] = [
  {
    id: "b-001",
    judul: "Tips Mempersiapkan Diri Sebelum Umroh: Panduan Lengkap 2025",
    ringkasan:
      "Persiapan fisik, mental, dan spiritual sebelum berangkat ke Tanah Suci. Simak panduan lengkapnya di sini.",
    konten: `Perjalanan umroh adalah ibadah yang memerlukan persiapan matang. Berikut tips yang perlu Anda ketahui:\n\n**1. Persiapan Fisik**\nJaga kesehatan minimal 3 bulan sebelum keberangkatan. Olahraga ringan secara rutin, terutama jalan kaki, karena di Tanah Suci kita akan banyak berjalan.\n\n**2. Persiapan Dokumen**\n- Paspor dengan masa berlaku minimal 7 bulan\n- KTP dan Kartu Keluarga\n- Buku nikah (untuk suami istri)\n- Sertifikat vaksin meningitis\n- Foto background putih 4x6\n\n**3. Persiapan Mental & Spiritual**\nPerbanyak bacaan doa dan hafalan, serta pahami manasik umroh. Ikut bimbingan manasik yang diselenggarakan travel.\n\n**4. Persiapan Keuangan**\nSiapkan uang saku (Saudi Riyal). Estimasi kebutuhan: SAR 1.500–2.500 untuk oleh-oleh dan kebutuhan pribadi.`,
    imageUrl:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
    kategori: "panduan",
    tanggal: "2025-01-15",
    penulis: "Tim Lamahu Tour",
    isPublished: true,
  },
  {
    id: "b-002",
    judul: "Promo Spesial: Diskon 5% Untuk Pendaftaran Umroh Bulan Ini!",
    ringkasan:
      "Lamahu Tour menghadirkan promo spesial untuk pendaftaran umroh bulan ini. Dapatkan diskon 5% untuk semua paket.",
    konten: `Lamahu Tour hadir dengan promo spesial yang sayang untuk dilewatkan!\n\n**Ketentuan Promo:**\n- Berlaku untuk semua paket umroh reguler dan premium\n- Pendaftaran dan DP minimal Rp 2.500.000 sebelum akhir bulan\n- Diskon langsung 5% dari harga paket\n\n**Cara Mendaftar:**\n1. Hubungi tim kami via WhatsApp\n2. Pilih paket yang diinginkan\n3. Bayar DP\n4. Dapatkan diskon!\n\nJangan sampai ketinggalan! Kuota sangat terbatas.`,
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    kategori: "promo",
    tanggal: "2025-02-01",
    penulis: "Tim Marketing",
    isPublished: true,
  },
  {
    id: "b-003",
    judul: "Keistimewaan Umroh di Bulan Ramadhan yang Perlu Anda Tahu",
    ringkasan:
      "Umroh di bulan Ramadhan memiliki keutamaan setara haji bersama Rasulullah SAW. Pelajari keistimewaannya.",
    konten: `Rasulullah SAW bersabda: "Umroh di bulan Ramadhan menyamai (pahala) haji bersamaku." (HR. Bukhari & Muslim)\n\n**Keutamaan Umroh Ramadhan:**\n\n1. **Pahala berlipat ganda**\nSetiap amal di Ramadhan dilipatgandakan. Bayangkan tawaf, sa\'i, dan ibadah di Masjidil Haram dengan pahala berlipat!\n\n2. **Suasana spiritual yang berbeda**\nMasjidil Haram di Ramadhan penuh dengan jutaan jamaah. Shalat tarawih berjamaah bersama ribuan orang dari seluruh dunia.\n\n3. **Lailatul Qadar**\nKesempatan mendapatkan malam Lailatul Qadar (lebih baik dari 1000 bulan) di Tanah Suci adalah impian setiap Muslim.\n\n**Lamahu Tour hadir dengan Paket Umroh Premium Ramadhan**, dengan hotel bintang 5 dan pembimbing berpengalaman.`,
    imageUrl:
      "https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=800&q=80",
    kategori: "info",
    tanggal: "2025-01-28",
    penulis: "Ustadz Ahmad",
    isPublished: true,
  },
  {
    id: "b-004",
    judul: "Video: Testimoni Jamaah Umroh Lamahu Tour 2024",
    ringkasan:
      "Simak kesan dan pesan jamaah Lamahu Tour yang telah kembali dari Tanah Suci dengan pengalaman tak terlupakan.",
    konten: `Alhamdulillah, seluruh jamaah Lamahu Tour paket Umroh Spesial telah kembali ke tanah air dengan selamat dan penuh berkah.\n\nBerikut beberapa kesan dari jamaah kami:\n\n**Ibu Nurhayati (Gorontalo):**\n"Perjalanan umroh bersama Lamahu Tour sangat memuaskan. Hotel dekat, muthawif ramah, dan semua fasilitas sangat terjaga. Alhamdulillah."\n\n**Bapak Hendra (Jakarta):**\n"Saya sudah ikut beberapa travel umroh, tapi Lamahu Tour yang terbaik. Pembimbing ibadahnya kompeten dan penuh sabar."\n\n**Bapak & Ibu Ismail (Manado):**\n"Terima kasih Lamahu Tour, perjalanan umroh kami sangat berkesan. Insya Allah tahun depan berangkat lagi bersama keluarga!"`,
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    kategori: "video",
    tanggal: "2025-01-10",
    penulis: "Tim Lamahu Tour",
    isPublished: true,
  },
];

// ── CONFIG ────────────────────────────────────────────
export const APP_CONFIG = {
  waAdminNumber: "6281234567890", // Ganti dengan nomor WA admin
  appName: "Lamahu Tour",
  tagline: "Haji & Umrah",
  adminEmail: "admin@lamahugroup.com",
  adminPassword: "admin123", // Untuk demo — di production gunakan backend auth
};
