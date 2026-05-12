// ═══════════════════════════════════════════════════════
// Firebase Troubleshooting Guide
// ═══════════════════════════════════════════════════════

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Permission Denied                            │
// └─────────────────────────────────────────────────────┘

// Error Message:
// "Permission denied. Missing or insufficient permissions."

// Penyebab:
// - Security rules tidak membolehkan akses
// - User belum authenticated

// Solusi:
// 1. Firestore Console → Rules tab
// 2. Ubah menjadi test mode:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
// 3. Klik "Publish"
// 4. Restart Expo

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Firebase App Not Initialized                 │
// └─────────────────────────────────────────────────────┘

// Error Message:
// "No Firebase App '[DEFAULT]' has been created"
// atau
// "Cannot read property 'app' of undefined"

// Penyebab:
// - .env.local tidak diisi
// - Typo di path import
// - Expo belum di-restart

// Solusi:
// 1. Check .env.local:
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY_HERE
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
// (pastikan semua 6 variables diisi)

// 2. Check import:
import { db } from "@/utils/firebase";  // ✅ Benar
import { db } from "./firebase";         // ❌ Salah

// 3. Restart Expo:
// Terminal: Ctrl + C
// Lalu: npm start

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Storage Bucket Not Found                     │
// └─────────────────────────────────────────────────────┘

// Error Message:
// "Storage bucket not found"
// atau
// "Firebase Storage bucket is not set"

// Penyebab:
// - Storage belum di-enable
// - EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET typo atau kosong

// Solusi:
// 1. Check .env.local STORAGE_BUCKET:
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=lamahu-tour.appspot.com

// 2. Enable Storage di Firebase Console:
// - Firebase Console → Storage
// - Klik "Get Started"
// - Pilih region (asia-southeast1)
// - Klik "Create"

// 3. Create folder structure:
// - Klik "File" → "Create Folder"
// - Buat: galeri/, paket/, berita/

// 4. Restart Expo

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Authentication Failed                        │
// └─────────────────────────────────────────────────────┘

// Error Message:
// "auth/operation-not-allowed"
// atau
// "Phone provider not configured"

// Penyebab:
// - Phone authentication belum di-enable
// - Email/Password authentication belum di-enable

// Solusi:
// 1. Firebase Console → Authentication
// 2. Klik tab "Sign-in method"
// 3. Klik "Add new provider"
// 4. Enable:
//    - Phone Number
//    - Email/Password
// 5. Klik "Save"
// 6. Restart app

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Quota Exceeded                               │
// └─────────────────────────────────────────────────────┘

// Error Message:
// "Quota exceeded for quota metric 'read_requests' with result RESOURCE_EXHAUSTED"

// Penyebab:
// - Melebihi free tier Firebase (1.25M read operations/hari)
// - Banyak query tidak efisien

// Solusi - Upgrade:
// 1. Firebase Console → Settings (⚙️)
// 2. Klik tab "Billing"
// 3. Upgrade ke Blaze (pay-as-you-go)

// Solusi - Optimize:
// 1. Gunakan pagination:
const pageSize = 20;
const q = query(
  collection(db, "paket"),
  limit(pageSize)
);

// 2. Gunakan offline persistence:
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open
    } else if (err.code == 'unimplemented') {
      // Browser not supported
    }
  });

// 3. Cache data locally:
const [cache, setCache] = useState(data);
// Gunakan cache sebelum fetch baru

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Image Upload Failed                          │
// └─────────────────────────────────────────────────────┘

// Error Message:
// "Storage bucket not found"
// atau
// "Permission denied"

// Penyebab:
// - Storage belum di-enable
// - Storage rules tidak allow upload

// Solusi:
// 1. Enable Storage (lihat di atas)
// 2. Check Storage Rules:
// Storage Console → Rules tab
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read semua
    match /{allPaths=**} {
      allow read: if true;
    }
    // Allow write untuk authenticated users
    match /{userId}/{document=**} {
      allow write: if request.auth.uid == userId;
    }
  }
}
// 3. Publish rules

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Can't Read Property 'uid'                    │
// └─────────────────────────────────────────────────────┘

// Error Message:
// "Cannot read property 'uid' of undefined"

// Penyebab:
// - User belum login (auth.currentUser null)
// - Akses auth.currentUser tanpa cek

// Solusi:
// ❌ SALAH:
const userId = auth.currentUser.uid;

// ✅ BENAR:
const user = auth.currentUser;
if (user) {
  const userId = user.uid;
  // Gunakan userId
} else {
  console.log("User not authenticated");
}

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Collections Doesn't Exist                    │
// └─────────────────────────────────────────────────────┘

// Error Message:
// No error, tapi data kosong atau undefined

// Penyebab:
// - Collections belum dibuat di Firestore
// - Typo nama collection

// Solusi:
// 1. Firestore Console → Create collection
// 2. Collection names (harus eksak):
//    - users
//    - paket
//    - berita
//    - galeri

// 3. Check kode - pastikan nama sama:
const paketRef = collection(db, "paket"); // ✅ Benar
const paketRef = collection(db, "Paket"); // ❌ Salah (case-sensitive)

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: Data Type Mismatch                           │
// └─────────────────────────────────────────────────────┘

// Error Message:
// Type 'string' is not assignable to type 'number'

// Penyebab:
// - Field type di Firestore tidak match dengan type definition

// Solusi:
// Pastikan saat save, type data sesuai:

// ❌ SALAH:
const paket = {
  nama: "Umroh",
  harga: "25000000", // String, seharusnya number
  kuota: "20",       // String, seharusnya number
};

// ✅ BENAR:
const paket = {
  nama: "Umroh",
  harga: 25000000,   // Number
  kuota: 20,         // Number
};

// ┌─────────────────────────────────────────────────────┐
// │ ERROR: CORS Error                                   │
// └─────────────────────────────────────────────────────┘

// Error Message:
// "Access to XMLHttpRequest blocked by CORS policy"
// (Biasanya di web browser)

// Penyebab:
// - Firebase rules tidak allow akses

// Solusi:
// Test mode rules:
allow read, write: if true;

// Atau specific rules:
allow read: if true;
allow write: if request.auth != null;

// ┌─────────────────────────────────────────────────────┐
// │ DEBUGGING TIPS                                      │
// └─────────────────────────────────────────────────────┘

// Tip 1: Log Firebase Config
import app from "@/utils/firebase";
console.log("Firebase app:", app);
// Output harus object, bukan undefined

// Tip 2: Log Firestore Connection
import { db } from "@/utils/firebase";
console.log("Firestore db:", db);

// Tip 3: Test Firestore Query
async function testFirestore() {
  try {
    const paket = await fetchPaketData();
    console.log("✅ Firestore works:", paket);
  } catch (error) {
    console.error("❌ Firestore error:", error);
  }
}

// Tip 4: Check Auth State
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User logged in:", user.uid);
  } else {
    console.log("⚠️ User not logged in");
  }
});

// Tip 5: Check Storage
async function testStorage() {
  const result = await uploadGaleriImage(uri, "test.jpg");
  if (result.success) {
    console.log("✅ Storage works:", result.url);
  } else {
    console.error("❌ Storage error:", result.error);
  }
}

// ┌─────────────────────────────────────────────────────┐
// │ DEBUGGING CHECKLIST                                 │
// └─────────────────────────────────────────────────────┘

// [ ] .env.local diisi lengkap
// [ ] Semua 6 Firebase env variables ada
// [ ] Expo di-restart setelah edit .env
// [ ] Firestore collections exist (users, paket, berita, galeri)
// [ ] Phone Authentication di-enable
// [ ] Storage di-enable
// [ ] Security Rules di-set test mode
// [ ] Import paths benar (use @/utils/...)
// [ ] User authenticated sebelum akses user-specific data
// [ ] Type definitions match Firebase data
// [ ] Network connection OK (VPN bisa block Firebase)

// ┌─────────────────────────────────────────────────────┐
// │ TESTING COMMANDS                                    │
// └─────────────────────────────────────────────────────┘

// Test di console browser/react-native:

// Test 1: Check config
const config = { ...window.__FIREBASE_CONFIG__ };

// Test 2: List all functions
import * as fbQueries from "@/utils/firestoreQueries";
console.log(Object.keys(fbQueries));

// Test 3: Test single function
const testData = await fetchPaketData();
console.log("Data:", testData);

// ┌─────────────────────────────────────────────────────┐
// │ GETTING HELP                                        │
// └─────────────────────────────────────────────────────┘

// Resources:
// - Firebase Docs: https://firebase.google.com/docs
// - Firestore Guide: https://firebase.google.com/docs/firestore
// - Firebase Auth: https://firebase.google.com/docs/auth
// - Firebase Storage: https://firebase.google.com/docs/storage

// Error Code Reference:
// - auth/email-already-in-use
// - auth/user-not-found
// - auth/wrong-password
// - auth/too-many-requests
// - firestore/permission-denied
// - storage/object-not-found
