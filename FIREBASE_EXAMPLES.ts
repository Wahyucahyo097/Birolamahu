// ═══════════════════════════════════════════════════════
// CONTOH: Firebase Integration di App
// File ini menunjukkan cara menggunakan Firebase functions
// Copy-paste kode sesuai kebutuhan
// ═══════════════════════════════════════════════════════

// ── CONTOH 1: Fetch Paket Data (Home Screen) ──────────
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { fetchPaketData, type PaketData } from "@/utils/firestoreQueries";

export function HomeScreenExample() {
  const [paket, setPaket] = useState<PaketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPaketData();
        setPaket(data);
        console.log("✅ Paket loaded:", data.length);
      } catch (err) {
        setError("Gagal memuat paket");
        console.error("❌ Error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;
  if (paket.length === 0) return <Text>Tidak ada paket</Text>;

  return (
    <FlatList
      data={paket}
      renderItem={({ item }) => (
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.nama}</Text>
          <Text>Harga: Rp{item.harga.toLocaleString("id-ID")}</Text>
          <Text>Kuota: {item.kuota} tempat</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

// ── CONTOH 2: Upload Gambar Galeri ────────────────────
import * as ImagePicker from "expo-image-picker";
import { uploadGaleriImage } from "@/utils/firebaseStorage";
import { addGaleri } from "@/utils/firestoreQueries";

export async function handleUploadGaleri() {
  try {
    // Step 1: Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (result.canceled) return;

    const imageUri = result.assets[0].uri;

    // Step 2: Upload ke Storage
    console.log("📤 Uploading image...");
    const fileName = `galeri_${Date.now()}.jpg`;
    const uploadResult = await uploadGaleriImage(imageUri, fileName);

    if (!uploadResult.success) {
      console.error("❌ Upload gagal:", uploadResult.error);
      return;
    }

    // Step 3: Simpan URL ke Firestore
    console.log("💾 Saving to Firestore...");
    const galeriId = `g_${Date.now()}`;
    const success = await addGaleri(galeriId, {
      id: galeriId,
      imageUrl: uploadResult.url!,
      caption: "Foto dari galeri",
      tanggal: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    });

    if (success) {
      console.log("✅ Image saved successfully!");
      // Trigger refresh atau update UI
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// ── CONTOH 3: Save User Profile ────────────────────────
import { saveUserProfile } from "@/utils/firestoreQueries";
import { auth } from "@/utils/firebase";
import type { UserProfile } from "@/types";

export async function handleSaveProfile(profileData: {
  nama: string;
  nomorWA: string;
  asalDaerah: string;
}) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("❌ User not authenticated");
      return;
    }

    const profile: UserProfile = {
      id: user.uid,
      nama: profileData.nama,
      nomorWA: profileData.nomorWA,
      asalDaerah: profileData.asalDaerah,
      isProfileComplete: true,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };

    const success = await saveUserProfile(user.uid, profile);
    if (success) {
      console.log("✅ Profile saved!");
      // Navigate to home
    }
  } catch (error) {
    console.error("❌ Error saving profile:", error);
  }
}

// ── CONTOH 4: Update Paket (Admin) ─────────────────────
import { updatePaket } from "@/utils/firestoreQueries";

export async function handleUpdatePaket(
  paketId: string,
  updates: {
    harga?: number;
    kuota?: number;
    nama?: string;
  }
) {
  try {
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const success = await updatePaket(paketId, updatedData);
    if (success) {
      console.log("✅ Paket updated!");
      // Refresh data
    }
  } catch (error) {
    console.error("❌ Error updating paket:", error);
  }
}

// ── CONTOH 5: Delete Berita (Admin) ────────────────────
import { deleteBerita } from "@/utils/firestoreQueries";

export async function handleDeleteBerita(beritaId: string) {
  try {
    const confirmed = confirm("Yakin ingin menghapus berita?");
    if (!confirmed) return;

    const success = await deleteBerita(beritaId);
    if (success) {
      console.log("✅ Berita deleted!");
      // Refresh data
    }
  } catch (error) {
    console.error("❌ Error deleting berita:", error);
  }
}

// ── CONTOH 6: Fetch & Display Berita ───────────────────
import { fetchBeritaData, type BeritaData } from "@/utils/firestoreQueries";

export function BeritaScreenExample() {
  const [berita, setBerita] = useState<BeritaData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBeritaData();
        setBerita(data);
        console.log("✅ Berita loaded:", data.length);
      } catch (error) {
        console.error("❌ Error loading berita:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={berita}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.judul}</Text>
          <Text>{item.ringkasan}</Text>
          <Text style={{ color: "gray", fontSize: 12 }}>
            {item.tanggal} • {item.penulis}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

// ── CONTOH 7: Get Single Paket Detail ──────────────────
import { fetchPaketById } from "@/utils/firestoreQueries";

export function PaketDetailScreenExample({ paketId }: { paketId: string }) {
  const [paket, setPaket] = useState<PaketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPaketById(paketId);
        setPaket(data);
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [paketId]);

  if (loading) return <Text>Loading...</Text>;
  if (!paket) return <Text>Paket tidak ditemukan</Text>;

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{paket.nama}</Text>
      <Text>Durasi: {paket.durasi}</Text>
      <Text>Harga: Rp{paket.harga.toLocaleString("id-ID")}</Text>
      <Text>Kuota: {paket.kuota} tempat</Text>
      <Text>{paket.deskripsi}</Text>
    </View>
  );
}

// ── CONTOH 8: Real-time User Data (dengan Auth) ───────
import { auth } from "@/utils/firebase";
import { getUserProfile } from "@/utils/firestoreQueries";
import { onAuthStateChanged } from "firebase/auth";

export function UserProfileScreenExample() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (!userProfile) return <Text>User tidak login</Text>;

  return (
    <View>
      <Text>Nama: {userProfile.nama}</Text>
      <Text>WhatsApp: {userProfile.nomorWA}</Text>
      <Text>Asal: {userProfile.asalDaerah}</Text>
    </View>
  );
}

// ── CONTOH 9: Add New Berita (Admin) ───────────────────
import { addBerita, type BeritaData } from "@/utils/firestoreQueries";

export async function handleAddBerita(beritaData: {
  judul: string;
  ringkasan: string;
  konten: string;
  penulis: string;
  kategori: "berita" | "tips" | "video" | "info";
}) {
  try {
    const beritaId = `b_${Date.now()}`;
    const newBerita: BeritaData = {
      id: beritaId,
      ...beritaData,
      tanggal: new Date().toISOString().split("T")[0],
      imageUrl: "",
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const success = await addBerita(beritaId, newBerita);
    if (success) {
      console.log("✅ Berita added!");
      // Refresh atau navigate
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// ── CONTOH 10: Logout User ────────────────────────────
import { logoutUser } from "@/utils/firebaseAuth";

export async function handleLogout() {
  try {
    const success = await logoutUser();
    if (success) {
      console.log("✅ User logged out!");
      // Navigate ke login screen
    }
  } catch (error) {
    console.error("❌ Error logging out:", error);
  }
}

// ──────────────────────────────────────────────────────
// Tips:
// 1. Import functions yang diperlukan dari utils/
// 2. Gunakan try-catch untuk error handling
// 3. Tampilkan loading state saat fetch data
// 4. Handle error dengan message yang user-friendly
// 5. Refresh data setelah add/update/delete
// ──────────────────────────────────────────────────────
