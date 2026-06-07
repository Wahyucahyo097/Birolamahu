// ═══════════════════════════════════════════════════════
// utils/firebaseAuth.ts — Auth helpers rewritten to use Supabase
// ═══════════════════════════════════════════════════════

import { auth } from "./firebase";

function mapAuthError(message: string) {
  // Basic mapping — expand as needed
  if (!message) return "Terjadi kesalahan. Coba lagi nanti.";
  if (message.includes("invalid")) return "Format email tidak valid";
  if (message.includes("already")) return "Email sudah terdaftar";
  if (message.includes("password")) return "Password tidak valid";
  return message;
}

export async function logoutUser(): Promise<boolean> {
  try {
    const { error } = await auth.signOut();
    if (error) throw error;
    console.log("✅ User logged out (supabase)");
    return true;
  } catch (error: any) {
    console.error("❌ Logout error:", error);
    return false;
  }
}

export async function registerWithEmail(
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await auth.signUp({ email, password });
    if (res.error) throw res.error;
    console.log("✅ User registered (supabase)");
    return { success: true, message: "Registrasi berhasil" };
  } catch (error: any) {
    const msg = mapAuthError(error.message || String(error));
    console.error("❌ Registration error:", msg);
    return { success: false, message: msg };
  }
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await auth.signInWithPassword({ email, password });
    if (res.error) throw res.error;
    console.log("✅ User logged in (supabase)");
    return { success: true, message: "Login berhasil" };
  } catch (error: any) {
    const msg = mapAuthError(error.message || String(error));
    console.error("❌ Login error:", msg);
    return { success: false, message: msg };
  }
}

export async function resetPassword(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await auth.resetPasswordForEmail(email);
    if (res.error) throw res.error;
    console.log("✅ Password reset email sent (supabase)");
    return { success: true, message: "Email reset password telah dikirim ke email Anda" };
  } catch (error: any) {
    const msg = mapAuthError(error.message || String(error));
    console.error("❌ Password reset error:", msg);
    return { success: false, message: msg };
  }
}

export function getCurrentUser() {
  // Note: Supabase provides async `getUser()`; this returns null or user if stored locally
  try {
    // @ts-ignore
    const session = auth.session?.();
    return session?.user ?? null;
  } catch {
    return null;
  }
}

export function isUserAuthenticated(): boolean {
  const user = getCurrentUser();
  return !!user;
}
