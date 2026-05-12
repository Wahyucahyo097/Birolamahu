# 🔥 Tutorial Firebase untuk Lamahu Tour - Lengkap Dari Awal

---

## 📚 Daftar Isi

1. [Pengenalan Firebase](#pengenalan-firebase)
2. [Membuat Firebase Project](#membuat-firebase-project)
3. [Setup Firestore Database](#setup-firestore-database)
4. [Setup Authentication](#setup-authentication)
5. [Setup Storage](#setup-storage)
6. [Integrasi ke Expo App](#integrasi-ke-expo-app)
7. [Operasi CRUD](#operasi-crud)
8. [Security Rules](#security-rules)
9. [Troubleshooting](#troubleshooting)

---

## Pengenalan Firebase

### Apa itu Firebase?

Firebase adalah **Backend-as-a-Service (BaaS)** dari Google yang menyediakan:
- 🔐 **Authentication** - Sistem login pengguna
- 📊 **Firestore** - Database NoSQL real-time
- 📁 **Storage** - Penyimpanan file (foto, video, dll)
- ⚡ **Hosting** - Hosting website/API
- 📧 **Cloud Functions** - Serverless computing

### Mengapa gunakan Firebase?

✅ Setup cepat, tidak perlu server sendiri  
✅ Scalable (bisa handle jutaan pengguna)  
✅ Real-time sync data  
✅ Security built-in  
✅ Free tier cukup untuk development  

---

## Membuat Firebase Project

### Langkah 1: Buka Firebase Console

1. Buka https://console.firebase.google.com
2. Login dengan akun Google

### Langkah 2: Buat Project Baru

1. Klik **"Add project"** atau **"Create a project"**

   ![Firebase Console](https://imgur.com/a1b2c3d.png)

2. Isikan nama project:
   - **Project name**: `lamahu-tour`

   ![Create Project](https://imgur.com/e4f5g6h.png)

3. Klik **"Continue"**

### Langkah 3: Google Analytics (Optional)

1. Pilih **"Enable Google Analytics for this project"** (optional)
2. Atau uncheck jika tidak perlu
3. Klik **"Create project"**

### Langkah 4: Tunggu Project Selesai

Tunggu 1-2 menit sampai project selesai dibuat.

```
✅ Your Firebase project is ready!
```

---

## Setup Firestore Database

### Langkah 1: Buka Firestore Console

Di Firebase Console:
1. Di sidebar kiri, cari **"Build"** section
2. Klik **"Firestore Database"**

### Langkah 2: Buat Database

1. Klik **"Create database"**

   ![Create Firestore](https://imgur.com/i8j9k0l.png)

2. Pilih mode:
   - 🟢 **Start in test mode** (untuk development)
   - ⚪ Start in production mode (untuk production)
   
   **Pilih: "Start in test mode"**

   ![Firestore Mode](https://imgur.com/m1n2o3p.png)

3. Klik **"Next"**

### Langkah 3: Pilih Lokasi Database

1. Pilih lokasi region:
   ```
   - asia-southeast1 (Singapore) ← Recommended
   - asia-northeast1 (Tokyo)
   - us-central1 (Iowa)
   ```

   **Pilih: "asia-southeast1 (Singapore)"** (terdekat dari Indonesia)

2. Klik **"Enable"**

3. Tunggu database selesai dibuat (1-2 menit)

```
✅ Firestore Database created successfully
```

### Langkah 4: Buat Collections

Di Firestore, collections adalah seperti "table" di database tradisional.

#### Collection 1: `users`

1. Klik **"Start collection"**
2. Collection ID: `users`
3. Klik **"Next"**
4. Klik **"Save"** (jangan tambah document dulu)

Struktur `users` document:
```json
{
  "id": "user_123456789",
  "nama": "Ahmad Fauzi",
  "nomorWA": "081234567890",
  "asalDaerah": "Jakarta",
  "isProfileComplete": true,
  "isAdmin": false,
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

Tipe data field `users`:

| Field | Tipe | Contoh | Keterangan |
| --- | --- | --- | --- |
| `id` | `string` | `user_123456789` | Bisa pakai Document ID yang sama |
| `nama` | `string` | `Ahmad Fauzi` | Nama lengkap user |
| `nomorWA` | `string` | `081234567890` | Nomor WhatsApp user |
| `asalDaerah` | `string` | `Jakarta` | Kota/daerah asal user |
| `isProfileComplete` | `boolean` | `true` | Menandakan profile selesai |
| `isAdmin` | `boolean` | `false` | Untuk user biasa/admin |
| `createdAt` | `string` | `2025-01-15T10:30:00Z` | Timestamp ISO string |
| `updatedAt` | `string` | `2025-01-15T10:30:00Z` | Timestamp ISO string |

#### Collection 2: `paket`

1. Klik **"Start collection"**
2. Collection ID: `paket`
3. Klik **"Next"**
4. Klik **"Save"**

Struktur `paket` document:
```json
{
  "id": "p-001",
  "nama": "Umroh Plus 9 Hari",
  "harga": 25000000,
  "kuota": 20,
  "durasi": "9 hari 8 malam",
  "deskripsi": "Paket umroh dengan fasilitas lengkap...",
  "imageUrl": "gs://bucket/paket/image.jpg",
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

Tipe data field `paket`:

| Field | Tipe | Contoh | Keterangan |
| --- | --- | --- | --- |
| `id` | `string` | `p-001` | ID paket |
| `nama` | `string` | `Umroh Plus 9 Hari` | Nama paket |
| `harga` | `number` | `25000000` | Harga paket |
| `kuota` | `number` | `20` | Kuota peserta |
| `durasi` | `string` | `9 hari 8 malam` | Durasi perjalanan |
| `deskripsi` | `string` | `Paket umroh...` | Deskripsi paket |
| `imageUrl` | `string` | `gs://bucket/paket/image.jpg` | URL image storage |
| `createdAt` | `string` | `2025-01-15T10:30:00Z` | Timestamp ISO string |
| `updatedAt` | `string` | `2025-01-15T10:30:00Z` | Timestamp ISO string |

#### Collection 3: `berita`

1. Klik **"Start collection"**
2. Collection ID: `berita`
3. Klik **"Next"**
4. Klik **"Save"**

Struktur `berita` document:
```json
{
  "id": "b-001",
  "judul": "Tips Mempersiapkan Umroh",
  "ringkasan": "Berikut tips-tips penting...",
  "konten": "Konten lengkap artikel...",
  "tanggal": "2025-01-15",
  "penulis": "Ustadz Ahmad",
  "kategori": "tips",
  "imageUrl": "gs://bucket/berita/image.jpg",
  "isPublished": true,
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

Tipe data field `berita`:

| Field | Tipe | Contoh | Keterangan |
| --- | --- | --- | --- |
| `id` | `string` | `b-001` | ID berita |
| `judul` | `string` | `Tips Mempersiapkan Umroh` | Judul artikel |
| `ringkasan` | `string` | `Berikut tips-tips penting...` | Ringkasan berita |
| `konten` | `string` | `Konten lengkap artikel...` | Isi artikel |
| `tanggal` | `string` | `2025-01-15` | Tanggal publikasi |
| `penulis` | `string` | `Ustadz Ahmad` | Nama penulis |
| `kategori` | `string` | `tips` | kategori berita |
| `imageUrl` | `string` | `gs://bucket/berita/image.jpg` | URL image storage |
| `isPublished` | `boolean` | `true` | Status publikasi |
| `createdAt` | `string` | `2025-01-15T10:30:00Z` | Timestamp ISO string |
| `updatedAt` | `string` | `2025-01-15T10:30:00Z` | Timestamp ISO string |

#### Collection 4: `galeri`

1. Klik **"Start collection"**
2. Collection ID: `galeri`
3. Klik **"Next"**
4. Klik **"Save"**

Struktur `galeri` document:
```json
{
  "id": "g-001",
  "imageUrl": "gs://bucket/galeri/image.jpg",
  "caption": "Jamaah sedang beribadah di Masjidil Haram",
  "tanggal": "2025-01-10",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

Tipe data field `galeri`:

| Field | Tipe | Contoh | Keterangan |
| --- | --- | --- | --- |
| `id` | `string` | `g-001` | ID galeri |
| `imageUrl` | `string` | `gs://bucket/galeri/image.jpg` | URL image storage |
| `caption` | `string` | `Jamaah sedang beribadah...` | Keterangan foto |
| `tanggal` | `string` | `2025-01-10` | Tanggal gallery |
| `createdAt` | `string` | `2025-01-15T10:30:00Z` | Timestamp ISO string |

---

## Setup Authentication

### Langkah 1: Buka Authentication Console

Di Firebase Console:
1. Di sidebar kiri, klik **"Authentication"**

### Langkah 2: Mulai Setup

1. Klik **"Get Started"**

### Langkah 3: Tambah Sign-in Method

1. Klik tab **"Sign-in method"**
2. Klik **"Add new provider"**

#### Provider 1: Phone Number (Untuk App Login)

1. Pilih **"Phone"**
2. Toggle **"Enable"** → ON
3. Klik **"Save"**

```
✅ Phone Number authentication enabled
```

#### Provider 2: Email/Password (Optional - Untuk Admin)

1. Klik **"Add new provider"**
2. Pilih **"Email/Password"**
3. Toggle **"Enable"** → ON
4. Klik **"Save"**

```
✅ Email/Password authentication enabled
```

---

## Setup Storage

### Langkah 1: Buka Storage Console

Di Firebase Console:
1. Di sidebar kiri, cari **"Storage"**
2. Klik **"Storage"**

### Langkah 2: Buat Bucket

1. Klik **"Get Started"**

### Langkah 3: Setup Security Rules

Untuk development, pilih **"Start in test mode"**

```
allow read, write: if true;
```

Klik **"Create"**

### Langkah 4: Buat Folder Structure

Di Storage Console, buat folder:
1. Klik **"File"** → **"Create Folder"**
   - Folder name: `galeri`
   
2. Ulangi untuk folder:
   - `paket/`
   - `berita/`

Struktur Storage:
```
gs://lamahu-tour.appspot.com/
├── galeri/
│   └── image_001.jpg
├── paket/
│   └── image_001.jpg
└── berita/
    └── image_001.jpg
```

---

## Integrasi ke Expo App

### Langkah 1: Copy Firebase Credentials

1. Di Firebase Console, klik ⚙️ **"Project Settings"**

   ![Project Settings](https://imgur.com/q1r2s3t.png)

2. Di tab **"General"**, scroll ke bawah
3. Cari bagian **"Your apps"** → pilih **"Web"** 

   ![Web App](https://imgur.com/u4v5w6x.png)

4. Klik icon **"<>"** untuk show config

5. Copy config JSON yang terlihat seperti:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxB...",
  authDomain: "lamahu-tour.firebaseapp.com",
  projectId: "lamahu-tour",
  storageBucket: "lamahu-tour.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};
```

### Langkah 2: Update `.env.local`

Edit file `c:\Users\ACER\lamahu\.env.local`:

```bash
# Dari config di atas:
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyDxB...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=lamahu-tour.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=lamahu-tour
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=lamahu-tour.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
EXPO_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123def456
```

### Langkah 3: Restart Expo

```bash
# Terminal 1 (Kill server lama)
Ctrl + C

# Terminal 2
npm start
```

---

## Operasi CRUD

### CREATE - Tambah Data

#### Tambah User Baru

```typescript
import { saveUserProfile } from "@/utils/firestoreQueries";

const newUser = {
  id: "user_123",
  nama: "Ahmad Fauzi",
  nomorWA: "081234567890",
  asalDaerah: "Jakarta",
  isProfileComplete: true,
  isAdmin: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const success = await saveUserProfile("user_123", newUser);
if (success) {
  console.log("✅ User berhasil disimpan");
}
```

#### Tambah Paket

```typescript
import { addPaket } from "@/utils/firestoreQueries";

const newPaket = {
  id: "p-001",
  nama: "Umroh Plus 9 Hari",
  harga: 25000000,
  kuota: 20,
  durasi: "9 hari 8 malam",
  deskripsi: "Paket umroh dengan fasilitas lengkap",
  imageUrl: "gs://bucket/paket/image.jpg",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const success = await addPaket("p-001", newPaket);
if (success) {
  console.log("✅ Paket berhasil ditambahkan");
}
```

### READ - Ambil Data

#### Ambil Semua Paket

```typescript
import { fetchPaketData } from "@/utils/firestoreQueries";

export function HomeScreen() {
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

  return (
    <FlatList
      data={paket}
      renderItem={({ item }) => <Text>{item.nama}</Text>}
      keyExtractor={(item) => item.id}
    />
  );
}
```

#### Ambil Data User

```typescript
import { getUserProfile } from "@/utils/firestoreQueries";
import { auth } from "@/utils/firebase";

const user = auth.currentUser;
if (user) {
  const profile = await getUserProfile(user.uid);
  console.log("Nama:", profile?.nama);
}
```

### UPDATE - Edit Data

```typescript
import { updatePaket } from "@/utils/firestoreQueries";

const updates = {
  harga: 26000000,
  kuota: 15,
  updatedAt: new Date().toISOString(),
};

const success = await updatePaket("p-001", updates);
if (success) {
  console.log("✅ Paket berhasil diupdate");
}
```

### DELETE - Hapus Data

```typescript
import { deletePaket } from "@/utils/firestoreQueries";

const success = await deletePaket("p-001");
if (success) {
  console.log("✅ Paket berhasil dihapus");
}
```

---

## Upload File ke Storage

### Upload Gambar Galeri

```typescript
import { uploadGaleriImage } from "@/utils/firebaseStorage";
import * as ImagePicker from "expo-image-picker";

const handlePickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [16, 9],
    quality: 1,
  });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    const fileName = `image_${Date.now()}.jpg`;
    
    const uploadResult = await uploadGaleriImage(imageUri, fileName);
    
    if (uploadResult.success) {
      console.log("✅ Image uploaded:", uploadResult.url);
      
      // Simpan URL ke Firestore
      await addGaleri(`g_${Date.now()}`, {
        id: `g_${Date.now()}`,
        imageUrl: uploadResult.url,
        caption: "Foto dari galeri",
        tanggal: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
      });
    } else {
      console.error("❌ Upload failed:", uploadResult.error);
    }
  }
};
```

---

## Security Rules

### Development Rules (Test Mode)

Untuk development, gunakan test mode:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Untuk mengubah:**
1. Di Firestore Console, klik tab **"Rules"**
2. Edit rules di editor
3. Klik **"Publish"**

### Production Rules

Untuk production, gunakan rules yang proper:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - user hanya bisa baca/edit data mereka sendiri
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Public read untuk paket, berita, galeri
    match /paket/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid == "ADMIN_USER_ID";
    }
    
    match /berita/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid == "ADMIN_USER_ID";
    }
    
    match /galeri/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid == "ADMIN_USER_ID";
    }
  }
}
```

### Storage Security Rules

Di Storage, edit rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Semua bisa baca
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Hanya authenticated user bisa upload
    match /{userId}/{document=**} {
      allow write: if request.auth.uid == userId;
    }
  }
}
```

---

## Troubleshooting

### Error 1: "Permission denied"

**Penyebab:** Security rules tidak membolehkan akses

**Solusi:**
1. Buka Firestore/Storage Rules
2. Ubah ke test mode: `allow read, write: if true;`
3. Klik **"Publish"**

### Error 2: "Firebase app not initialized"

**Penyebab:** Config Firebase belum benar

**Solusi:**
1. Cek `.env.local` - semua env var harus diisi
2. Restart Expo: `npm start`
3. Pastikan semua credentials benar (copas dari Firebase Console)

### Error 3: "Storage bucket not found"

**Penyebab:** Storage belum di-enable

**Solusi:**
1. Buka Firebase Console → Storage
2. Klik "Get Started"
3. Pilih lokasi region
4. Klik "Create"

### Error 4: "Quota exceeded"

**Penyebab:** Melebihi free tier quota

**Solusi:**
1. Upgrade ke Blaze plan (pay-as-you-go)
2. Atau optimize queries (kurangi read/write operations)

### Error 5: "Authentication failed"

**Penyebab:** Phone authentication belum di-enable

**Solusi:**
1. Firebase Console → Authentication
2. Tab "Sign-in method"
3. Enable "Phone"
4. Klik "Save"

---

## Testing Firebase Connections

### Test 1: Check Config

```typescript
// utils/firebase.ts
import app from "@/utils/firebase";

console.log("Firebase Config:", app);
// Should print app object, tidak error
```

### Test 2: Test Firestore Read

```typescript
import { fetchPaketData } from "@/utils/firestoreQueries";

async function testFirestore() {
  const data = await fetchPaketData();
  console.log("✅ Firestore connected:", data);
}

testFirestore();
```

### Test 3: Test Storage Upload

```typescript
import { uploadGaleriImage } from "@/utils/firebaseStorage";

async function testStorage() {
  const result = await uploadGaleriImage(
    "file:///path/to/image.jpg",
    "test.jpg"
  );
  console.log("✅ Storage connected:", result.url);
}

testStorage();
```

---

## Checklist Setup Firebase

- [ ] Firebase Project dibuat
- [ ] Firestore Database dibuat & collections created
- [ ] Authentication (Phone) di-enable
- [ ] Storage di-enable
- [ ] Credentials dicopy ke `.env.local`
- [ ] Expo di-restart
- [ ] Firebase queries di-test di app
- [ ] Security rules di-setup untuk production

---

## 🎉 Selesai!

Firebase sudah siap digunakan di app Lamahu Tour. Silakan gunakan helper functions di `utils/` untuk CRUD operations.

**Questions?** Tanya saja! 🙂
