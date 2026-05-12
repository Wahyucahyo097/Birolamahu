📚 # Firebase Documentation Index

Dokumentasi lengkap Firebase untuk Lamahu Tour sudah dibuat.
Pilih sesuai kebutuhan:

---

## 🚀 Panduan Lengkap

**File: [TUTORIAL_FIREBASE.md](TUTORIAL_FIREBASE.md)**

Untuk yang **baru pertama kali setup Firebase**, mulai dari sini:
- ✅ Membuat Firebase Project
- ✅ Setup Firestore Database
- ✅ Setup Authentication
- ✅ Setup Storage
- ✅ Integrasi ke Expo app
- ✅ Operasi CRUD (Create, Read, Update, Delete)
- ✅ Security Rules

**Waktu baca:** 30-45 menit

---

## 📖 Contoh Implementasi

**File: [FIREBASE_EXAMPLES.ts](FIREBASE_EXAMPLES.ts)**

Contoh kode **copy-paste ready** untuk:
- Fetch paket data
- Upload gambar galeri
- Save user profile
- Update & delete data
- Real-time user data
- Dan 5 contoh lainnya

**Waktu baca:** 15 menit

---

## ⚡ Quick Reference

**File: [FIREBASE_CHEATSHEET.ts](FIREBASE_CHEATSHEET.ts)**

Panduan singkat untuk:
- Setup variables
- Import statements
- Common CRUD patterns
- Data types reference
- Error handling patterns

**Waktu baca:** 5 menit (untuk reference cepat)

---

## 🔧 Troubleshooting

**File: [FIREBASE_TROUBLESHOOTING.md](FIREBASE_TROUBLESHOOTING.md)**

Solusi untuk error-error umum:
- Permission Denied
- Firebase App Not Initialized
- Storage Bucket Not Found
- Authentication Failed
- Quota Exceeded
- Image Upload Failed
- Dan lainnya...

**Waktu baca:** 20 menit

---

## 📁 Setup Guide

**File: [FIREBASE_SETUP.md](FIREBASE_SETUP.md)**

Panduan setup Firebase (ringkas):
- Buat Firebase Project
- Setup Firestore & Collections
- Setup Authentication
- Setup Storage
- Copy credentials
- Firestore structure & rules

**Waktu baca:** 15 menit

---

## 🛠️ Helper Files (Siap Pakai)

Sudah dibuat di folder `utils/`:

### `firebase.ts` 
Konfigurasi Firebase dengan environment variables

```typescript
import { db, auth, storage } from "@/utils/firebase";
```

### `firestoreQueries.ts`
Helper functions untuk Firestore CRUD:
```typescript
// Users
import { getUserProfile, saveUserProfile, updateUserProfile } from "@/utils/firestoreQueries";

// Paket
import { fetchPaketData, addPaket, updatePaket, deletePaket } from "@/utils/firestoreQueries";

// Berita
import { fetchBeritaData, addBerita, updateBerita, deleteBerita } from "@/utils/firestoreQueries";

// Galeri
import { fetchGaleriData, addGaleri, deleteGaleri } from "@/utils/firestoreQueries";
```

### `firebaseAuth.ts`
Helper functions untuk Authentication:
```typescript
import { logoutUser, loginWithEmail, registerWithEmail } from "@/utils/firebaseAuth";
import { getCurrentUser, isUserAuthenticated } from "@/utils/firebaseAuth";
```

### `firebaseStorage.ts`
Helper functions untuk Storage:
```typescript
import { uploadGaleriImage, uploadPaketImage, deleteFile, getFileUrl } from "@/utils/firebaseStorage";
```

---

## 📋 Setup Checklist

Ikuti checklist ini dari awal:

- [ ] Baca [TUTORIAL_FIREBASE.md](TUTORIAL_FIREBASE.md)
- [ ] Buat Firebase Project
- [ ] Setup Firestore + collections (users, paket, berita, galeri)
- [ ] Enable Authentication (Phone, Email/Password)
- [ ] Enable Storage
- [ ] Copy credentials ke `.env.local`
- [ ] Restart Expo (`npm start`)
- [ ] Test dengan contoh di [FIREBASE_EXAMPLES.ts](FIREBASE_EXAMPLES.ts)
- [ ] Jika error, lihat [FIREBASE_TROUBLESHOOTING.md](FIREBASE_TROUBLESHOOTING.md)

---

## 🎯 Recommended Reading Order

### Untuk Beginner:
1. [TUTORIAL_FIREBASE.md](TUTORIAL_FIREBASE.md) - 30 menit
2. [FIREBASE_CHEATSHEET.ts](FIREBASE_CHEATSHEET.ts) - 5 menit
3. [FIREBASE_EXAMPLES.ts](FIREBASE_EXAMPLES.ts) - 15 menit

### Untuk Development:
1. [FIREBASE_CHEATSHEET.ts](FIREBASE_CHEATSHEET.ts) - Quick reference
2. [FIREBASE_EXAMPLES.ts](FIREBASE_EXAMPLES.ts) - Copy-paste code
3. [FIREBASE_TROUBLESHOOTING.md](FIREBASE_TROUBLESHOOTING.md) - Jika ada error

### Untuk Production:
1. [FIREBASE_TROUBLESHOOTING.md](FIREBASE_TROUBLESHOOTING.md)
2. [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Security rules
3. Upgrade ke Blaze plan di Firebase Console

---

## 🔥 Quick Start (5 Minutes)

Jika sudah punya Firebase project:

1. **Update `.env.local`** dengan credentials Firebase
2. **Restart Expo**: `npm start`
3. **Test dengan**:
   ```typescript
   import { fetchPaketData } from "@/utils/firestoreQueries";
   
   const paket = await fetchPaketData();
   console.log("✅ Firebase works:", paket);
   ```
4. **Copy contoh dari [FIREBASE_EXAMPLES.ts](FIREBASE_EXAMPLES.ts)**
5. **Gunakan di screen app**

---

## 📞 Questions?

- Error? Lihat [FIREBASE_TROUBLESHOOTING.md](FIREBASE_TROUBLESHOOTING.md)
- Lupa syntax? Lihat [FIREBASE_CHEATSHEET.ts](FIREBASE_CHEATSHEET.ts)
- Mau contoh? Lihat [FIREBASE_EXAMPLES.ts](FIREBASE_EXAMPLES.ts)
- Setup awal? Lihat [TUTORIAL_FIREBASE.md](TUTORIAL_FIREBASE.md)

---

## 📚 Files Summary

| File | Purpose | Read Time |
|------|---------|-----------|
| [TUTORIAL_FIREBASE.md](TUTORIAL_FIREBASE.md) | Panduan lengkap setup Firebase dari awal | 30-45 min |
| [FIREBASE_SETUP.md](FIREBASE_SETUP.md) | Ringkasan setup Firebase | 15 min |
| [FIREBASE_EXAMPLES.ts](FIREBASE_EXAMPLES.ts) | Contoh kode copy-paste | 15 min |
| [FIREBASE_CHEATSHEET.ts](FIREBASE_CHEATSHEET.ts) | Reference cepat | 5 min |
| [FIREBASE_TROUBLESHOOTING.md](FIREBASE_TROUBLESHOOTING.md) | Solusi error umum | 20 min |

---

## ✅ Status

- ✅ Firebase SDK installed (`npm install firebase`)
- ✅ Helper files created (firebase.ts, firestoreQueries.ts, dll)
- ✅ Documentation complete
- ✅ Examples provided
- ✅ Troubleshooting guide ready

**Siap untuk mulai development! 🚀**
