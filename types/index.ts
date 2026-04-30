export interface UserProfile {
  id: string;
  nama: string;
  nomorWA: string;
  asalDaerah: string;
  isProfileComplete: boolean;
  isAdmin?: boolean;
  createdAt: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isProfileComplete: boolean;
  user: UserProfile | null;
  phoneNumber: string;
}

// ── Paket Umroh ───────────────────────────────────────
export interface PaketUmroh {
  id: string;
  nama: string;
  jenis: "umrah-reguler" | "umrah-premium" | "haji-furoda" | "b2b";
  harga: number;
  hargaDeposit: number;
  durasi: number;
  bintangHotel: number;
  maskapai: string;
  kotaKeberangkatan: string;
  imageUrl: string;
  badge?: string;
  deskripsi: string;
  fasilitas: string[];
  itinerary: ItineraryHari[];
  kuota: number;
  tersisa: number;
  isActive: boolean;
}

export interface ItineraryHari {
  hari: number;
  judul: string;
  deskripsi: string;
  lokasi?: string;
}

// ── Galeri ────────────────────────────────────────────
export interface GaleriItem {
  id: string;
  judul: string;
  imageUrl: string;
  kategori: "ibadah" | "hotel" | "perjalanan" | "kegiatan";
  tanggal: string;
  deskripsi?: string;
}

// ── Berita ────────────────────────────────────────────
export interface BeritaItem {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  imageUrl: string;
  kategori: "info" | "panduan" | "promo" | "video";
  tanggal: string;
  penulis: string;
  videoUrl?: string;
  isPublished: boolean;
}

// ── WhatsApp ──────────────────────────────────────────
export interface WAPayload {
  namaUser: string;
  asalUser: string;
  nomorWA: string;
  namaPaket?: string;
  pesanKustom?: string;
}
