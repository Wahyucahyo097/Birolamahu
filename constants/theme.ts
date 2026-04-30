// constants/Colors.ts

// Definisi warna utama dari desain Lamahu Tour
const emeraldGreen = "#065F46";
const luxuryGold = "#B8860B";

export const Colors = {
  light: {
    primary: "#065F46",
    primaryMid: "#047857",
    primaryLight: "#D1FAE5",
    primaryDark: "#064E3B",
    accent: "#B8860B",
    accentLight: "#FEF3C7",

    background: "#FFFFFF",
    backgroundSoft: "#F9FAFB",
    backgroundMuted: "#F3F4F6",

    text: "#1A1A1A",
    textSecondary: "#374151",
    textMuted: "#6B7280",
    textInverse: "#FFFFFF",

    border: "#D1D5DB",
    borderLight: "#E5E7EB",

    icon: "#6B7280",
    error: "#EF4444",
    errorLight: "#FEE2E2",
    success: "#10B981",
    successLight: "#D1FAE5",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",

    overlayDark: "rgba(0,0,0,0.55)",
    white: "#FFFFFF",
    black: "#000000",
  },
  dark: {
    // Bisa disamakan dulu jika fokus pada Light Mode sesuai desain
    text: "#ECEDEE",
    background: "#151718",
    tint: luxuryGold,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: luxuryGold,
  },
};

// Menambahkan pengaturan font agar konsisten memanggil Jakarta Sans
export const Fonts = {
  bold: "Jakarta-Bold",
  regular: "Jakarta-Regular",
};
export type ColorScheme = typeof Colors.light;
