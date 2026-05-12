# 🔥 Firebase Setup Guide untuk Lamahu Tour

## ✅ Sudah Dikerjakan

Firebase SDK dan helper files sudah dibuat:

### File-file Baru:
1. **`utils/firebase.ts`** — Konfigurasi Firebase dengan env variables
2. **`utils/firestoreQueries.ts`** — Helper untuk Firestore (CRUD users, paket, berita, galeri)
3. **`utils/firebaseAuth.ts`** — Helper untuk Firebase Auth
4. **`utils/firebaseStorage.ts`** — Helper untuk upload file ke Storage
5. **`.env.example`** & **`.env.local`** — Template environment variables

---

## 📋 Langkah-Langkah Setup

### 1️⃣ Buat Firebase Project

1. Buka https://console.firebase.google.com
2. Klik **"Add project"**
3. Isikan nama project: `lamahu-tour` (atau sesuai keinginan)
4. Pilih lokasi: **Indonesia**
5. Tunggu project selesai dibuat

### 2️⃣ Setup Firestore Database

1. Di Firebase Console, klik **"Firestore Database"**
2. Klik **"Create Database"**
3. Pilih **"Start in test mode"** (untuk development)
4. Pilih lokasi: **asia-southeast1 (Singapore)** atau **asia-northeast1 (Tokyo)**
5. Tunggu database selesai dibuat

### 3️⃣ Setup Authentication

1. Di Firebase Console, klik **"Authentication"**
2. Klik tab **"Sign-in method"**
3. Tambahkan:
   - ✅ **Phone Number** (untuk login di app)
   - ✅ **Email/Password** (untuk admin/future)

### 4️⃣ Setup Storage

1. Di Firebase Console, klik **"Storage"**
2. Klik **"Get Started"**
3. Pilih lokasi: sama seperti Firestore
4. Di Firestore, buat folder: `galeri/`, `paket/`, `berita/`

### 5️⃣ Copy Firebase Credentials

1. Di Firebase Console, klik ⚙️ **"Project Settings"**
2. Scroll ke bawah, cari **"Web"** apps section
3. Copy config object yang terlihat seperti:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "lamahu-tour.firebaseapp.com",
  projectId: "lamahu-tour",
  storageBucket: "lamahu-tour.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:123456:web:abc..."
};
```

### 6️⃣ Update `.env.local`

Edit file `c:\Users\ACER\lamahu\.env.local`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=lamahu-tour.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=lamahu-tour
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=lamahu-tour.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456...
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456:web:abc...
```

### 7️⃣ Restart Expo

```bash
npm start
```

---

## 🗂️ Firestore Collection Structure (Recommended)

Buat collections di Firestore Console:

```
firestore
├── users/
│   └── {userId}
│       ├── nama: "Ahmad Fauzi"
│       ├── nomorWA: "081234567890"
│       ├── asalDaerah: "Jakarta"
│       ├── isProfileComplete: true
│       ├── isAdmin: false
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── paket/
│   └── {paketId}
│       ├── nama: "Umroh Plus 9 Hari"
│       ├── harga: 25000000
│       ├── kuota: 20
│       ├── durasi: "9 hari 8 malam"
│       ├── deskripsi: "Paket umroh dengan fasilitas..."
│       ├── imageUrl: "gs://bucket/paket/..."
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── berita/
│   └── {beritaId}
│       ├── judul: "Tips Mempersiapkan Umroh"
│       ├── ringkasan: "Berikut tips-tips penting..."
│       ├── konten: "Konten lengkap artikel..."
│       ├── tanggal: "2025-01-15"
│       ├── penulis: "Ustadz Ahmad"
│       ├── kategori: "tips" | "berita" | "video" | "info"
│       ├── imageUrl: "gs://bucket/berita/..."
│       ├── isPublished: true
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
└── galeri/
    └── {galeriId}
        ├── imageUrl: "gs://bucket/galeri/..."
        ├── caption: "Jamaah sedang beribadah di Masjidil Haram"
        ├── tanggal: "2025-01-10"
        └── createdAt: timestamp
```

---

## 🔐 Firestore Security Rules (Development)

Untuk development, gunakan test mode rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Izinkan semua untuk development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ PENTING:** Untuk production, ubah ke rules yang proper:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users hanya bisa baca/tulis data mereka sendiri
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Public read untuk paket, berita, galeri
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth.uid == "ADMIN_USER_ID";
    }
  }
}
```

---

## 📱 Contoh Penggunaan di App

### Fetch Paket Data

```typescript
import { fetchPaketData } from "@/utils/firestoreQueries";

export function PaketScreen() {
  const [paket, setPaket] = useState([]);
  
  useEffect(() => {
    fetchPaketData().then(data => setPaket(data));
  }, []);
  
  return (
    // Render paket list
  );
}
```

### Upload Image Galeri

```typescript
import { uploadGaleriImage } from "@/utils/firebaseStorage";

const handleUpload = async (imageUri: string) => {
  const result = await uploadGaleriImage(imageUri, "image_001.jpg");
  if (result.success) {
    console.log("Image uploaded:", result.url);
    // Simpan result.url ke Firestore
  }
};
```

### Save User Profile

```typescript
import { saveUserProfile } from "@/utils/firestoreQueries";

const handleSaveProfile = async (userId: string, profile: UserProfile) => {
  const success = await saveUserProfile(userId, profile);
  if (success) {
    console.log("Profile saved!");
  }
};
```

---

## ⚠️ Troubleshooting

### Error: "Firebase is not initialized"
- Pastikan `.env.local` sudah diisi dengan benar
- Restart Expo: `npm start`

### Error: "Permission denied" di Firestore
- Buka Firestore Console → Rules
- Ubah ke test mode: `allow read, write: if true;`

### Error: "Storage bucket not found"
- Pastikan Storage sudah enabled di Firebase Console
- Pastikan folder struktur sudah dibuat

---

## 🚀 Next Steps

1. ✅ Setup Firebase credentials di `.env.local`
2. ✅ Buat collections di Firestore
3. ✅ Update `store/useUserStore.ts` untuk pakai Firebase Auth (optional)
4. ✅ Ganti data dummy dengan Firebase queries di halaman-halaman
5. ✅ Setup CI/CD untuk production deployment

---

**Need help?** Tanya saja! 🙂
