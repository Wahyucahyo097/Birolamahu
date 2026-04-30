import { BERITA_DATA, PAKET_DATA } from "@/constants/Data";
import { Colors } from "@/constants/theme";
import {
  BorderRadius,
  Shadow,
  Spacing,
  Typography,
} from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { formatRupiah } from "@/utils/formatCurrency";
import { openWhatsApp } from "@/utils/whatsapp";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

const QUICK_MENU = [
  {
    id: "paket",
    label: "Umrah\nReguler",
    icon: "business-outline",
    route: "/(tabs)/paket",
  },
  {
    id: "haji",
    label: "Haji\nFuroda",
    icon: "cube-outline",
    route: "/(tabs)/paket",
  },
  {
    id: "galeri",
    label: "Galeri\nFoto",
    icon: "images-outline",
    route: "/(tabs)/galeri",
  },
  {
    id: "berita",
    label: "Berita\n& Info",
    icon: "newspaper-outline",
    route: "/(tabs)/berita",
  },
];

export default function BerandaScreen() {
  const { state } = useUserStore();
  const user = state.user;

  const handleKonsultasi = async () => {
    if (!user) return;
    await openWhatsApp({
      namaUser: user.nama,
      asalUser: user.asalDaerah,
      nomorWA: user.nomorWA,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.light.primary}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ══ 1. HERO HEADER ══ */}
        <View style={styles.headerWrapper}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
            }}
            style={styles.heroBg}
            imageStyle={styles.heroImg}
          >
            <View style={styles.heroOverlay} />

            {/* Top bar */}
            <View style={styles.topBar}>
              <View>
                <Text style={styles.greeting}>Assalamu&apos;alaikum 👋</Text>
                <Text style={styles.userName}>{user?.nama ?? "Jamaah"}</Text>
              </View>
              <TouchableOpacity style={styles.notifBtn}>
                <Ionicons name="notifications-outline" size={22} color="#FFF" />
                <View style={styles.notifDot} />
              </TouchableOpacity>
            </View>

            {/* Hero text */}
            <View style={styles.heroText}>
              <Text style={styles.heroHeadline}>
                Perjalanan Suci,{"\n"}Nyaman & Berkesan
              </Text>
              <Text style={styles.heroSub}>
                Bersama Lamahu Tour, ibadah lebih tenang dan berkesan.
              </Text>
            </View>
          </ImageBackground>

          {/* ══ 2. FLOATING TRUST BADGE ══ */}
          <View style={styles.trustCard}>
            <View style={styles.trustItem}>
              <View style={styles.trustIcon}>
                <Ionicons
                  name="document-text"
                  size={18}
                  color={Colors.light.primary}
                />
              </View>
              <View>
                <Text style={styles.trustLabel}>Izin Resmi Kemenag</Text>
                <Text style={styles.trustValue}>No. 1082 Tahun 2021</Text>
              </View>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <View style={[styles.trustIcon, styles.trustIconGold]}>
                <Text style={styles.trustA}>A</Text>
              </View>
              <View>
                <Text style={styles.trustLabel}>Akreditasi Sucofindo</Text>
                <Text style={styles.trustValue}>No. U.516/2021</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ══ 3. QUICK MENU ══ */}
        <View style={styles.section}>
          <View style={styles.menuGrid}>
            {QUICK_MENU.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={styles.menuCard}
                onPress={() => router.push(m.route as any)}
                activeOpacity={0.75}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name={m.icon as any}
                    size={24}
                    color={Colors.light.primary}
                  />
                </View>
                <Text style={styles.menuLabel}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ══ 4. PAKET UNGGULAN ══ */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Paket Unggulan</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/paket")}>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hList}
        >
          {PAKET_DATA.slice(0, 3).map((p) => (
            <TouchableOpacity
              key={p.id}
              style={styles.paketCard}
              onPress={() => router.push(`/paket/${p.id}` as any)}
            >
              <Image source={{ uri: p.imageUrl }} style={styles.paketImg} />
              {p.badge && (
                <View style={styles.paketBadge}>
                  <Text style={styles.paketBadgeText}>{p.badge}</Text>
                </View>
              )}
              <View style={styles.paketInfo}>
                <Text style={styles.paketNama} numberOfLines={1}>
                  {p.nama}
                </Text>
                <View style={styles.paketMeta}>
                  <Ionicons
                    name="time-outline"
                    size={11}
                    color={Colors.light.textMuted}
                  />
                  <Text style={styles.paketMetaText}>{p.durasi} Hari</Text>
                  <Ionicons name="star" size={11} color={Colors.light.accent} />
                  <Text style={styles.paketMetaText}>
                    Bintang {p.bintangHotel}
                  </Text>
                </View>
                <Text style={styles.paketHarga}>{formatRupiah(p.harga)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ══ 5. BERITA TERBARU ══ */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Berita Terbaru</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/berita")}>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {BERITA_DATA.slice(0, 2).map((b) => (
          <TouchableOpacity
            key={b.id}
            style={styles.beritaCard}
            onPress={() => router.push(`/berita/${b.id}` as any)}
          >
            <Image source={{ uri: b.imageUrl }} style={styles.beritaImg} />
            <View style={styles.beritaInfo}>
              <View style={styles.beritaKategoriPill}>
                <Text style={styles.beritaKategoriText}>
                  {b.kategori.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.beritaJudul} numberOfLines={2}>
                {b.judul}
              </Text>
              <Text style={styles.beritaSub} numberOfLines={2}>
                {b.ringkasan}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* ══ 6. TOMBOL KONSULTASI WHATSAPP ══ */}
        <View style={styles.waSection}>
          <View style={styles.waCard}>
            <View style={styles.waLeft}>
              <Text style={styles.waTitle}>Butuh Panduan?</Text>
              <Text style={styles.waSub}>
                Konsultasi langsung dengan tim kami.{"\n"}
                Gratis & tanpa komitmen! 🤲
              </Text>
            </View>
            <Ionicons
              name="chatbubble-ellipses"
              size={36}
              color="rgba(255,255,255,0.3)"
            />
          </View>
          <TouchableOpacity
            style={styles.waBtn}
            onPress={handleKonsultasi}
            activeOpacity={0.85}
          >
            <Ionicons name="logo-whatsapp" size={22} color="#FFF" />
            <Text style={styles.waBtnText}>Konsultasi via WhatsApp</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.waNote}>
            📲 Data Anda ({user?.nama}, {user?.asalDaerah}) akan terkirim
            otomatis
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.primary },
  content: { paddingBottom: 32, backgroundColor: Colors.light.backgroundSoft },

  // Header
  headerWrapper: { paddingBottom: 44, backgroundColor: Colors.light.primary },
  heroBg: {
    height: 290,
    justifyContent: "space-between",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },
  heroImg: { opacity: 0.4 },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.primary,
    opacity: 0.55,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingTop: 16,
  },
  greeting: {
    fontSize: Typography.size.sm,
    color: "rgba(255,255,255,0.75)",
    fontFamily: Typography.fontFamily.regular,
  },
  userName: {
    fontSize: Typography.size.lg,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.error,
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
  },
  heroText: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 24,
    flex: 1,
    justifyContent: "flex-end",
  },
  heroHeadline: {
    fontSize: Typography.size["4xl"],
    fontWeight: "800",
    color: "#FFF",
    fontFamily: Typography.fontFamily.extraBold,
    lineHeight: 36,
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroSub: {
    fontSize: Typography.size.base,
    color: "rgba(255,255,255,0.8)",
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 20,
  },

  // Trust badge
  trustCard: {
    position: "absolute",
    bottom: 0,
    left: 14,
    right: 14,
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.lg,
    paddingVertical: 13,
    paddingHorizontal: 14,
    alignItems: "center",
    ...Shadow.lg,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  trustItem: { flexDirection: "row", alignItems: "center", gap: 9, flex: 1 },
  trustIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "rgba(6,95,70,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  trustIconGold: { backgroundColor: "rgba(184,134,11,0.10)" },
  trustA: {
    fontSize: 16,
    fontWeight: "900",
    color: Colors.light.accent,
    fontFamily: Typography.fontFamily.extraBold,
  },
  trustLabel: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },
  trustValue: {
    fontSize: 11.5,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.semiBold,
  },
  trustDivider: {
    width: 1,
    height: 34,
    backgroundColor: Colors.light.borderLight,
    marginHorizontal: 8,
  },

  // Section
  section: { backgroundColor: Colors.light.backgroundSoft, paddingTop: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
  },
  seeAll: {
    fontSize: Typography.size.base,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },

  // Quick menu
  menuGrid: {
    flexDirection: "row",
    paddingHorizontal: Spacing.md,
    gap: 10,
  },
  menuCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.lg,
    paddingVertical: 14,
    alignItems: "center",
    gap: 6,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  menuIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 10,
    color: Colors.light.text,
    textAlign: "center",
    fontFamily: Typography.fontFamily.bold,
    lineHeight: 14,
  },

  // Paket cards
  hList: { paddingLeft: Spacing.md, paddingRight: 4, paddingBottom: 4 },
  paketCard: {
    width: W * 0.64,
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.lg,
    marginRight: 12,
    overflow: "hidden",
    ...Shadow.md,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  paketImg: { width: "100%", height: 120 },
  paketBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: Colors.light.accent,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  paketBadgeText: {
    fontSize: 9.5,
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },
  paketInfo: { padding: 12 },
  paketNama: {
    fontSize: Typography.size.base,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
  },
  paketMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  paketMetaText: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginRight: 6,
  },
  paketHarga: {
    fontSize: Typography.size.md,
    fontWeight: "800",
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.extraBold,
  },

  // Berita
  beritaCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: 10,
    overflow: "hidden",
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  beritaImg: { width: 90, height: 90 },
  beritaInfo: { flex: 1, padding: 10 },
  beritaKategoriPill: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 4,
  },
  beritaKategoriText: {
    fontSize: 9,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.bold,
  },
  beritaJudul: {
    fontSize: Typography.size.sm,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    lineHeight: 17,
    marginBottom: 3,
  },
  beritaSub: {
    fontSize: 11,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 15,
  },

  // WhatsApp CTA section
  waSection: { margin: Spacing.md },
  waCard: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  waLeft: { flex: 1 },
  waTitle: {
    fontSize: Typography.size.lg,
    fontWeight: "800",
    color: "#FFF",
    fontFamily: Typography.fontFamily.extraBold,
    marginBottom: 4,
  },
  waSub: {
    fontSize: Typography.size.sm,
    color: "rgba(255,255,255,0.78)",
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 18,
  },
  waBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#25D366",
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    ...Shadow.md,
  },
  waBtnText: {
    fontSize: Typography.size.md,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },
  waNote: {
    fontSize: 11,
    color: Colors.light.textMuted,
    textAlign: "center",
    marginTop: 8,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 16,
  },
});
