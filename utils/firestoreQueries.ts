// ═══════════════════════════════════════════════════════
// utils/firestoreQueries.ts — Reimplemented using Supabase
// ═══════════════════════════════════════════════════════

import type { UserProfile } from "@/types";
import { db } from "./firebase";

// USERS
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await db.from("users").select("*").eq("id", userId).single();
    if (error) throw error;
    return (data as UserProfile) ?? null;
  } catch (error) {
    console.error("❌ Error getting user profile:", error);
    return null;
  }
}

export async function saveUserProfile(userId: string, profile: UserProfile): Promise<boolean> {
  try {
    const { error } = await db.from("users").insert([{ ...profile, id: userId }]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error saving user profile:", error);
    return false;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
  try {
    const { error } = await db.from("users").update(updates).eq("id", userId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    return false;
  }
}

// PAKET
export interface PaketData {
  id: string;
  nama: string;
  harga: number;
  kuota: number;
  deskripsi?: string;
  durasi?: string;
  imageUrl?: string;
  [key: string]: any;
}

export async function fetchPaketData(): Promise<PaketData[]> {
  try {
    const { data, error } = await db.from("paket").select("*").order("nama", { ascending: true });
    if (error) throw error;
    return (data as PaketData[]) || [];
  } catch (error) {
    console.error("❌ Error fetching paket:", error);
    return [];
  }
}

export async function fetchPaketById(id: string): Promise<PaketData | null> {
  try {
    const { data, error } = await db.from("paket").select("*").eq("id", id).single();
    if (error) throw error;
    return (data as PaketData) ?? null;
  } catch (error) {
    console.error("❌ Error fetching paket by id:", error);
    return null;
  }
}

export async function addPaket(paketId: string, data: PaketData): Promise<boolean> {
  try {
    const { error } = await db.from("paket").insert([{ ...data, id: paketId }]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error adding paket:", error);
    return false;
  }
}

export async function updatePaket(paketId: string, updates: Partial<PaketData>): Promise<boolean> {
  try {
    const { error } = await db.from("paket").update(updates).eq("id", paketId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error updating paket:", error);
    return false;
  }
}

export async function deletePaket(paketId: string): Promise<boolean> {
  try {
    const { error } = await db.from("paket").delete().eq("id", paketId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error deleting paket:", error);
    return false;
  }
}

// BERITA
export interface BeritaData {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  tanggal: string;
  penulis?: string;
  imageUrl?: string;
  kategori?: "berita" | "tips" | "video" | "info";
  isPublished?: boolean;
  [key: string]: any;
}

export async function fetchBeritaData(): Promise<BeritaData[]> {
  try {
    const { data, error } = await db.from("berita").select("*").eq("isPublished", true).order("tanggal", { ascending: false });
    if (error) throw error;
    return (data as BeritaData[]) || [];
  } catch (error) {
    console.error("❌ Error fetching berita:", error);
    return [];
  }
}

export async function fetchBeritaById(id: string): Promise<BeritaData | null> {
  try {
    const { data, error } = await db.from("berita").select("*").eq("id", id).single();
    if (error) throw error;
    return (data as BeritaData) ?? null;
  } catch (error) {
    console.error("❌ Error fetching berita by id:", error);
    return null;
  }
}

export async function addBerita(beritaId: string, data: BeritaData): Promise<boolean> {
  try {
    const { error } = await db.from("berita").insert([{ ...data, id: beritaId }]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error adding berita:", error);
    return false;
  }
}

export async function updateBerita(beritaId: string, updates: Partial<BeritaData>): Promise<boolean> {
  try {
    const { error } = await db.from("berita").update(updates).eq("id", beritaId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error updating berita:", error);
    return false;
  }
}

export async function deleteBerita(beritaId: string): Promise<boolean> {
  try {
    const { error } = await db.from("berita").delete().eq("id", beritaId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error deleting berita:", error);
    return false;
  }
}

// GALERI
export interface GaleriData {
  id: string;
  imageUrl: string;
  caption?: string;
  tanggal?: string;
  [key: string]: any;
}

export async function fetchGaleriData(): Promise<GaleriData[]> {
  try {
    const { data, error } = await db.from("galeri").select("*").order("tanggal", { ascending: false });
    if (error) throw error;
    return (data as GaleriData[]) || [];
  } catch (error) {
    console.error("❌ Error fetching galeri:", error);
    return [];
  }
}

export async function addGaleri(galeriId: string, data: GaleriData): Promise<boolean> {
  try {
    const { error } = await db.from("galeri").insert([{ ...data, id: galeriId }]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error adding galeri:", error);
    return false;
  }
}

export async function deleteGaleri(galeriId: string): Promise<boolean> {
  try {
    const { error } = await db.from("galeri").delete().eq("id", galeriId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error deleting galeri:", error);
    return false;
  }
}
