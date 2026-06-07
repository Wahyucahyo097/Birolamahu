// ═══════════════════════════════════════════════════════
// utils/firebaseStorage.ts — Storage helpers using Supabase Storage
// ═══════════════════════════════════════════════════════

import { storage } from "./firebase";

async function uriToBlob(uri: string): Promise<Blob> {
  const res = await fetch(uri);
  return res.blob();
}

const DEFAULT_BUCKET = "public";

export async function uploadFile(
  uri: string,
  path: string,
  bucket = DEFAULT_BUCKET
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const blob = await uriToBlob(uri);
    // @ts-ignore
    const { data, error } = await storage.from(bucket).upload(path, blob, { upsert: true });
    if (error) throw error;
    const { publicURL } = storage.from(bucket).getPublicUrl(path);
    console.log("✅ File uploaded (supabase):", path);
    return { success: true, url: publicURL };
  } catch (error: any) {
    console.error("❌ Upload error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

export async function uploadGaleriImage(
  uri: string,
  imageName: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  const timestamp = Date.now();
  const path = `galeri/${timestamp}_${imageName}`;
  return uploadFile(uri, path);
}

export async function uploadPaketImage(
  uri: string,
  paketId: string,
  imageName: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  const path = `paket/${paketId}/${imageName}`;
  return uploadFile(uri, path);
}

export async function deleteFile(path: string, bucket = DEFAULT_BUCKET): Promise<boolean> {
  try {
    // @ts-ignore
    const { error } = await storage.from(bucket).remove([path]);
    if (error) throw error;
    console.log("✅ File deleted (supabase):", path);
    return true;
  } catch (error) {
    console.error("❌ Delete error:", error);
    return false;
  }
}

export async function listFiles(
  folderPath: string,
  bucket = DEFAULT_BUCKET
): Promise<{ success: boolean; files?: string[]; error?: string }> {
  try {
    // @ts-ignore
    const { data, error } = await storage.from(bucket).list(folderPath, { limit: 100 });
    if (error) throw error;
    const urls = data.map((item: any) => storage.from(bucket).getPublicUrl(item.name).publicURL);
    return { success: true, files: urls };
  } catch (error: any) {
    return { success: false, error: error.message || String(error) };
  }
}

export async function getFileUrl(
  path: string,
  bucket = DEFAULT_BUCKET
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const { publicURL } = storage.from(bucket).getPublicUrl(path);
    return { success: true, url: publicURL };
  } catch (error: any) {
    return { success: false, error: error.message || String(error) };
  }
}
