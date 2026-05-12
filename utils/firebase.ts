// ═══════════════════════════════════════════════════════
// utils/firebase.ts — Firebase Configuration
// ═══════════════════════════════════════════════════════

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * Firebase Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a new project or select existing
 * 3. Go to Project Settings (⚙️ icon)
 * 4. Copy the Web config values below
 * 5. Replace the placeholder values
 * 
 * For production, use environment variables instead:
 * - Create .env.local file
 * - Add: EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
 * - Add: EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
 * - etc.
 */

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "your-project.firebaseapp.com",
  projectId:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "your-project.appspot.com",
  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abc123",
};

// ── Initialize Firebase ──────────────────────────────────
const app = initializeApp(firebaseConfig);

// ── Export Firebase Services ─────────────────────────────
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
