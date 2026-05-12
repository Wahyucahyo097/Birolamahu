// ═══════════════════════════════════════════════════════
// Firebase Quick Reference - Copy & Paste Guide
// ═══════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────┐
// │ SETUP (Copy ke .env.local)                          │
// └─────────────────────────────────────────────────────┘

EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

// ┌─────────────────────────────────────────────────────┐
// │ IMPORTS                                             │
// └─────────────────────────────────────────────────────┘

// Firestore
import { fetchPaketData, fetchBeritaData, fetchGaleriData } from "@/utils/firestoreQueries";
import { fetchPaketById, fetchBeritaById, getUserProfile } from "@/utils/firestoreQueries";
import { addPaket, addBerita, addGaleri, saveUserProfile } from "@/utils/firestoreQueries";
import { updatePaket, updateBerita, updateUserProfile } from "@/utils/firestoreQueries";
import { deletePaket, deleteBerita, deleteGaleri } from "@/utils/firestoreQueries";

// Auth
import { auth } from "@/utils/firebase";
import { getCurrentUser, isUserAuthenticated, logoutUser } from "@/utils/firebaseAuth";

// Storage
import { uploadGaleriImage, uploadPaketImage, deleteFile, getFileUrl } from "@/utils/firebaseStorage";

// ┌─────────────────────────────────────────────────────┐
// │ FIRESTORE - CRUD OPERATIONS                         │
// └─────────────────────────────────────────────────────┘

// CREATE - Tambah Paket
const newPaket = {
  id: "p-001",
  nama: "Umroh Plus",
  harga: 25000000,
  kuota: 20,
};
await addPaket("p-001", newPaket);

// READ - Ambil semua paket
const paketList = await fetchPaketData();

// READ - Ambil paket by ID
const paket = await fetchPaketById("p-001");

// UPDATE - Edit paket
await updatePaket("p-001", { harga: 26000000 });

// DELETE - Hapus paket
await deletePaket("p-001");

// ┌─────────────────────────────────────────────────────┐
// │ AUTHENTICATION                                      │
// └─────────────────────────────────────────────────────┘

// Get current user
const user = auth.currentUser;
console.log(user?.uid); // User ID
console.log(user?.email); // Email (jika pakai email auth)

// Check authenticated
if (isUserAuthenticated()) {
  console.log("User logged in");
}

// Logout
await logoutUser();

// ┌─────────────────────────────────────────────────────┐
// │ STORAGE - UPLOAD & DELETE                           │
// └─────────────────────────────────────────────────────┘

// Upload image galeri
const result = await uploadGaleriImage(imageUri, "image_001.jpg");
if (result.success) {
  console.log("Image URL:", result.url);
}

// Upload image paket
const result = await uploadPaketImage(imageUri, "p-001", "image.jpg");

// Delete file
await deleteFile("galeri/image_001.jpg");

// Get file URL
const urlResult = await getFileUrl("galeri/image_001.jpg");
if (urlResult.success) {
  console.log("URL:", urlResult.url);
}

// ┌─────────────────────────────────────────────────────┐
// │ HOOKS - React Integration                           │
// └─────────────────────────────────────────────────────┘

// Fetch data dengan loading state
function PaketScreen() {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchPaketData();
      setPaket(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  return <FlatList data={paket} renderItem={...} />;
}

// Real-time user
function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUser(profile);
      }
    });
    return unsubscribe;
  }, []);

  return user ? <Text>{user.nama}</Text> : <Text>Login dulu</Text>;
}

// ┌─────────────────────────────────────────────────────┐
// │ DATA TYPES                                          │
// └─────────────────────────────────────────────────────┘

// User Profile
{
  id: string;
  nama: string;
  nomorWA: string;
  asalDaerah: string;
  isProfileComplete: boolean;
  isAdmin: boolean;
  createdAt: string;
}

// Paket
{
  id: string;
  nama: string;
  harga: number;
  kuota: number;
  durasi?: string;
  deskripsi?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Berita
{
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  tanggal: string;
  penulis: string;
  kategori: "berita" | "tips" | "video" | "info";
  imageUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Galeri
{
  id: string;
  imageUrl: string;
  caption?: string;
  tanggal?: string;
  createdAt: string;
}

// ┌─────────────────────────────────────────────────────┐
// │ ERROR HANDLING                                      │
// └─────────────────────────────────────────────────────┘

try {
  const data = await fetchPaketData();
  setPaket(data);
} catch (error) {
  console.error("Error:", error);
  Alert.alert("Error", "Gagal memuat data");
}

// ┌─────────────────────────────────────────────────────┐
// │ COMMON PATTERNS                                     │
// └─────────────────────────────────────────────────────┘

// Pattern 1: Fetch + Display
useEffect(() => {
  (async () => {
    const data = await fetchPaketData();
    setPaket(data);
  })();
}, []);

// Pattern 2: Upload + Save URL
const uploadResult = await uploadGaleriImage(uri, "name.jpg");
if (uploadResult.success) {
  await addGaleri(id, {
    imageUrl: uploadResult.url,
    caption: "...",
  });
}

// Pattern 3: Edit + Refresh
await updatePaket(id, updates);
const updated = await fetchPaketById(id);
setState(updated);

// Pattern 4: Delete with confirmation
if (window.confirm("Hapus?")) {
  await deletePaket(id);
  // Refresh
}

// ┌─────────────────────────────────────────────────────┐
// │ TESTING                                             │
// └─────────────────────────────────────────────────────┘

// Test Firestore
console.log(await fetchPaketData());

// Test Auth
console.log(auth.currentUser);

// Test Storage
const result = await uploadGaleriImage(uri, "test.jpg");
console.log(result.url);

// ┌─────────────────────────────────────────────────────┐
// │ TROUBLESHOOTING CHECKLIST                           │
// └─────────────────────────────────────────────────────┘

// [ ] .env.local diisi dengan semua variables
// [ ] Expo di-restart
// [ ] Firestore collections sudah dibuat (users, paket, berita, galeri)
// [ ] Authentication phone number di-enable
// [ ] Storage di-enable
// [ ] Security rules di-set ke test mode (development)
// [ ] No typos dalam import statements
// [ ] Try-catch di-wrap async functions

// ┌─────────────────────────────────────────────────────┐
// │ HELPFUL CONSOLE LOGS                                │
// └─────────────────────────────────────────────────────┘

console.log("✅ Success");
console.log("❌ Error");
console.log("📤 Uploading");
console.log("💾 Saving");
console.log("📥 Loading");
console.log("🔄 Updating");
console.log("🗑️ Deleting");
