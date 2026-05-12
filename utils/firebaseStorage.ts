// ═══════════════════════════════════════════════════════
// utils/firebaseStorage.ts — Firebase Storage Helpers
// ═══════════════════════════════════════════════════════

import {
    deleteObject,
    getDownloadURL,
    listAll,
    ref,
    uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";

/**
 * Convert Base64/URI to Blob
 */
async function uriToBlob(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  return response.blob();
}

/**
 * Upload File ke Firebase Storage
 * Path contoh: "galeri/image_1234567890.jpg"
 */
export async function uploadFile(
  uri: string,
  path: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const blob = await uriToBlob(uri);
    const fileRef = ref(storage, path);
    
    await uploadBytes(fileRef, blob);
    const downloadUrl = await getDownloadURL(fileRef);
    
    console.log("✅ File uploaded:", path);
    return { success: true, url: downloadUrl };
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("❌ Upload error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Upload Image untuk Galeri
 */
export async function uploadGaleriImage(
  uri: string,
  imageName: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  const timestamp = Date.now();
  const path = `galeri/${timestamp}_${imageName}`;
  return uploadFile(uri, path);
}

/**
 * Upload Image untuk Paket
 */
export async function uploadPaketImage(
  uri: string,
  paketId: string,
  imageName: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  const path = `paket/${paketId}/${imageName}`;
  return uploadFile(uri, path);
}

/**
 * Delete File dari Storage
 */
export async function deleteFile(path: string): Promise<boolean> {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
    console.log("✅ File deleted:", path);
    return true;
  } catch (error) {
    console.error("❌ Delete error:", error);
    return false;
  }
}

/**
 * List Files di Folder tertentu
 */
export async function listFiles(
  folderPath: string
): Promise<{ success: boolean; files?: string[]; error?: string }> {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    
    const fileUrls = await Promise.all(
      result.items.map((item) => getDownloadURL(item))
    );
    
    console.log("✅ Files listed:", fileUrls.length);
    return { success: true, files: fileUrls };
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("❌ List error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Get Download URL dari path tertentu
 */
export async function getFileUrl(
  path: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileRef = ref(storage, path);
    const url = await getDownloadURL(fileRef);
    console.log("✅ File URL retrieved:", path);
    return { success: true, url };
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("❌ Get URL error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
