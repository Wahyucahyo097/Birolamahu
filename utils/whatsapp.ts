// ═══════════════════════════════════════════════════════
// utils/whatsapp.ts — WhatsApp Integration
// ═══════════════════════════════════════════════════════

import { APP_CONFIG } from "@/constants/Data";
import type { WAPayload } from "@/types";
import { Alert, Linking } from "react-native";

/**
 * Generate pesan WhatsApp otomatis berdasarkan data user dan paket
 */
export function generateWAMessage(payload: WAPayload): string {
  const { namaUser, asalUser, nomorWA, namaPaket, pesanKustom } = payload;

  if (pesanKustom) return pesanKustom;

  if (namaPaket) {
    return (
      `Assalamu'alaikum, Lamahu Tour 🕌\n\n` +
      `Saya tertarik dengan *${namaPaket}* dan ingin mendapatkan informasi lebih lanjut.\n\n` +
      `*Data Saya:*\n` +
      `👤 Nama      : ${namaUser}\n` +
      `📍 Asal      : ${asalUser}\n` +
      `📱 No. WA    : ${nomorWA}\n\n` +
      `Mohon informasi mengenai:\n` +
      `• Jadwal keberangkatan terdekat\n` +
      `• Ketersediaan kuota\n` +
      `• Cara pendaftaran\n\n` +
      `Jazakallah khairan 🤲`
    );
  }

  return (
    `Assalamu'alaikum, Lamahu Tour 🕌\n\n` +
    `Saya ingin berkonsultasi mengenai paket umroh/haji.\n\n` +
    `*Data Saya:*\n` +
    `👤 Nama  : ${namaUser}\n` +
    `📍 Asal  : ${asalUser}\n` +
    `📱 No. WA: ${nomorWA}\n\n` +
    `Mohon informasi paket yang tersedia.\n\n` +
    `Jazakallah khairan 🤲`
  );
}

/**
 * Build URL WhatsApp dengan nomor admin dan pesan
 */
export function buildWAUrl(message: string, targetNumber?: string): string {
  const number = targetNumber ?? APP_CONFIG.waAdminNumber;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Buka WhatsApp dengan pesan otomatis
 * Melempar error jika WA tidak terinstall
 */
export async function openWhatsApp(payload: WAPayload): Promise<void> {
  const message = generateWAMessage(payload);
  const url = buildWAUrl(message);

  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    Alert.alert(
      "WhatsApp Tidak Ditemukan",
      "Pastikan WhatsApp sudah terinstall di perangkat Anda.",
      [{ text: "OK" }],
    );
    return;
  }

  await Linking.openURL(url);
}

/**
 * Format nomor HP ke format internasional (tanpa +)
 * Contoh: 081234567890 → 6281234567890
 */
export function formatPhoneToWA(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) return "62" + cleaned.slice(1);
  if (cleaned.startsWith("62")) return cleaned;
  return "62" + cleaned;
}

/**
 * Validasi nomor HP Indonesia
 */
export function isValidIndonesianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return /^(08|628)\d{8,11}$/.test(cleaned);
}
