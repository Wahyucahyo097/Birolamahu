// ═══════════════════════════════════════════════════════
// utils/firebaseAuth.ts — Firebase Authentication Helpers
// ═══════════════════════════════════════════════════════

import {
    AuthError,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

/**
 * Handle Firebase Auth Errors dengan pesan user-friendly
 */
export function getAuthErrorMessage(error: AuthError): string {
  const errorCode = error.code;

  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "Email sudah terdaftar",
    "auth/invalid-email": "Format email tidak valid",
    "auth/operation-not-allowed": "Operasi tidak diizinkan",
    "auth/weak-password": "Password terlalu lemah (min 6 karakter)",
    "auth/user-disabled": "Akun ini telah dinonaktifkan",
    "auth/user-not-found": "Email tidak terdaftar",
    "auth/wrong-password": "Password salah",
    "auth/too-many-requests": "Terlalu banyak percobaan login. Coba lagi nanti",
    "auth/network-request-failed": "Koneksi internet gagal",
  };

  return errorMessages[errorCode] || "Terjadi kesalahan. Coba lagi nanti.";
}

/**
 * Logout User
 */
export async function logoutUser(): Promise<boolean> {
  try {
    await signOut(auth);
    console.log("✅ User logged out");
    return true;
  } catch (error) {
    console.error("❌ Logout error:", error);
    return false;
  }
}

/**
 * Register dengan Email & Password (untuk future enhancement)
 */
export async function registerWithEmail(
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("✅ User registered:", userCredential.user.uid);
    return { success: true, message: "Registrasi berhasil" };
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error as AuthError);
    console.error("❌ Registration error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

/**
 * Login dengan Email & Password (untuk future enhancement)
 */
export async function loginWithEmail(
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("✅ User logged in:", userCredential.user.uid);
    return { success: true, message: "Login berhasil" };
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error as AuthError);
    console.error("❌ Login error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

/**
 * Reset Password
 */
export async function resetPassword(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("✅ Password reset email sent");
    return {
      success: true,
      message: "Email reset password telah dikirim ke email Anda",
    };
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error as AuthError);
    console.error("❌ Password reset error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

/**
 * Get Current User
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Check if user is authenticated
 */
export function isUserAuthenticated(): boolean {
  return !!auth.currentUser;
}
