// ═══════════════════════════════════════════════════════
// utils/firestoreQueries.ts — Firestore Helper Functions
// ═══════════════════════════════════════════════════════

import type { UserProfile } from "@/types";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "./firebase";

// ── USERS ────────────────────────────────────────────────
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
  } catch (error) {
    console.error("❌ Error getting user profile:", error);
    return null;
  }
}

export async function saveUserProfile(
  userId: string,
  profile: UserProfile
): Promise<boolean> {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, profile);
    console.log("✅ User profile saved:", userId);
    return true;
  } catch (error) {
    console.error("❌ Error saving user profile:", error);
    return false;
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<boolean> {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updates);
    console.log("✅ User profile updated:", userId);
    return true;
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    return false;
  }
}

// ── PAKET (Packages) ─────────────────────────────────────
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
    const paketRef = collection(db, "paket");
    const q = query(paketRef, orderBy("nama", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as PaketData));
  } catch (error) {
    console.error("❌ Error fetching paket:", error);
    return [];
  }
}

export async function fetchPaketById(id: string): Promise<PaketData | null> {
  try {
    const paketRef = doc(db, "paket", id);
    const paketDoc = await getDoc(paketRef);
    return paketDoc.exists() ? ({ ...paketDoc.data(), id: paketDoc.id } as PaketData) : null;
  } catch (error) {
    console.error("❌ Error fetching paket by id:", error);
    return null;
  }
}

export async function addPaket(paketId: string, data: PaketData): Promise<boolean> {
  try {
    const paketRef = doc(db, "paket", paketId);
    await setDoc(paketRef, data);
    console.log("✅ Paket added:", paketId);
    return true;
  } catch (error) {
    console.error("❌ Error adding paket:", error);
    return false;
  }
}

export async function updatePaket(
  paketId: string,
  updates: Partial<PaketData>
): Promise<boolean> {
  try {
    const paketRef = doc(db, "paket", paketId);
    await updateDoc(paketRef, updates);
    console.log("✅ Paket updated:", paketId);
    return true;
  } catch (error) {
    console.error("❌ Error updating paket:", error);
    return false;
  }
}

export async function deletePaket(paketId: string): Promise<boolean> {
  try {
    const paketRef = doc(db, "paket", paketId);
    await deleteDoc(paketRef);
    console.log("✅ Paket deleted:", paketId);
    return true;
  } catch (error) {
    console.error("❌ Error deleting paket:", error);
    return false;
  }
}

// ── BERITA (News) ───────────────────────────────────────
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
    const beritaRef = collection(db, "berita");
    const q = query(
      beritaRef,
      where("isPublished", "==", true),
      orderBy("tanggal", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as BeritaData));
  } catch (error) {
    console.error("❌ Error fetching berita:", error);
    return [];
  }
}

export async function fetchBeritaById(id: string): Promise<BeritaData | null> {
  try {
    const beritaRef = doc(db, "berita", id);
    const beritaDoc = await getDoc(beritaRef);
    return beritaDoc.exists() ? ({ ...beritaDoc.data(), id: beritaDoc.id } as BeritaData) : null;
  } catch (error) {
    console.error("❌ Error fetching berita by id:", error);
    return null;
  }
}

export async function addBerita(beritaId: string, data: BeritaData): Promise<boolean> {
  try {
    const beritaRef = doc(db, "berita", beritaId);
    await setDoc(beritaRef, data);
    console.log("✅ Berita added:", beritaId);
    return true;
  } catch (error) {
    console.error("❌ Error adding berita:", error);
    return false;
  }
}

export async function updateBerita(
  beritaId: string,
  updates: Partial<BeritaData>
): Promise<boolean> {
  try {
    const beritaRef = doc(db, "berita", beritaId);
    await updateDoc(beritaRef, updates);
    console.log("✅ Berita updated:", beritaId);
    return true;
  } catch (error) {
    console.error("❌ Error updating berita:", error);
    return false;
  }
}

export async function deleteBerita(beritaId: string): Promise<boolean> {
  try {
    const beritaRef = doc(db, "berita", beritaId);
    await deleteDoc(beritaRef);
    console.log("✅ Berita deleted:", beritaId);
    return true;
  } catch (error) {
    console.error("❌ Error deleting berita:", error);
    return false;
  }
}

// ── GALERI (Gallery) ────────────────────────────────────
export interface GaleriData {
  id: string;
  imageUrl: string;
  caption?: string;
  tanggal?: string;
  [key: string]: any;
}

export async function fetchGaleriData(): Promise<GaleriData[]> {
  try {
    const galeriRef = collection(db, "galeri");
    const q = query(galeriRef, orderBy("tanggal", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as GaleriData));
  } catch (error) {
    console.error("❌ Error fetching galeri:", error);
    return [];
  }
}

export async function addGaleri(galeriId: string, data: GaleriData): Promise<boolean> {
  try {
    const galeriRef = doc(db, "galeri", galeriId);
    await setDoc(galeriRef, data);
    console.log("✅ Galeri added:", galeriId);
    return true;
  } catch (error) {
    console.error("❌ Error adding galeri:", error);
    return false;
  }
}

export async function deleteGaleri(galeriId: string): Promise<boolean> {
  try {
    const galeriRef = doc(db, "galeri", galeriId);
    await deleteDoc(galeriRef);
    console.log("✅ Galeri deleted:", galeriId);
    return true;
  } catch (error) {
    console.error("❌ Error deleting galeri:", error);
    return false;
  }
}
