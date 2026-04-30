import { PAKET_DATA } from "@/constants/Data";
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
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");
type TabKey = "fasilitas" | "itinerary" | "syarat";

export default function DetailPaketScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useUserStore();
  const user = state.user;
  const paket = PAKET_DATA.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState<TabKey>("fasilitas");

  if (!paket) {
    return (
      <View style={styles.notFound}>
        <Ionicons
          name="alert-circle-outline"
          size={56}
          color={Colors.light.borderLight}
        />
        <Text style={styles.notFoundText}>Paket tidak ditemukan</Text>
        <TouchableOpacity style={styles.backBtn2} onPress={() => router.back()}>
          <Text style={styles.backBtn2Text}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Tombol KONSULTASI → kirim data user + nama paket otomatis ──
  const handleKonsultasi = async () => {
    if (!user) return;
    await openWhatsApp({
      namaUser: user.nama,
      asalUser: user.asalDaerah,
      nomorWA: user.nomorWA,
      namaPaket: paket.nama,
    });
  };

  const handleShare = async () => {
    await Share.share({
      message: `Cek paket umroh *${paket.nama}* dari Lamahu Tour!\n\nMulai dari ${formatRupiah(paket.harga)}\n\nInfo lebih lanjut hubungi tim kami.`,
      title: paket.nama,
    });
  };

  const sisaPercent = Math.round((paket.tersisa / paket.kuota) * 100);
  const isLow = paket.tersisa <= 5;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── HERO IMAGE ── */}
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: paket.imageUrl }}
            style={styles.heroImg}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          <SafeAreaView edges={["top"]} style={styles.heroNav}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBtn} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Jenis tag */}
          <View style={styles.jenisWrap}>
            <View style={styles.jenisPill}>
              <Text style={styles.jenisPillText}>
                {paket.jenis.replace("-", " ").toUpperCase()}
              </Text>
            </View>
            {paket.badge && (
              <View style={styles.badgePill}>
                <Text style={styles.badgePillText}>⭐ {paket.badge}</Text>
              </View>
            )}
          </View>
        </View>

        {/* ── KONTEN ── */}
        <View style={styles.content}>
          {/* Nama & Rating */}
          <Text style={styles.namaPaket}>{paket.nama}</Text>
          <View style={styles.ratingRow}>
            {Array.from({ length: paket.bintangHotel }).map((_, i) => (
              <Ionicons
                key={i}
                name="star"
                size={14}
                color={Colors.light.accent}
              />
            ))}
            <Text style={styles.ratingText}>
              {" "}
              Hotel Bintang {paket.bintangHotel}
            </Text>
          </View>

          {/* Maskapai & rute */}
          <View style={styles.routeCard}>
            <Ionicons name="airplane" size={20} color={Colors.light.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.routeLabel}>Direct Flight</Text>
              <Text style={styles.routeValue}>
                {paket.kotaKeberangkatan} → Jeddah / Madinah
              </Text>
            </View>
            <Text style={styles.maskapaiChip}>{paket.maskapai}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              {
                icon: "time-outline",
                val: `${paket.durasi} Hari`,
                label: "Durasi",
              },
              {
                icon: "people-outline",
                val: `${paket.tersisa}`,
                label: "Sisa Kuota",
              },
              { icon: "calendar-outline", val: "Segera", label: "Jadwal" },
            ].map((s, i) => (
              <View
                key={i}
                style={[styles.statItem, i < 2 && styles.statBorder]}
              >
                <Ionicons
                  name={s.icon as any}
                  size={18}
                  color={Colors.light.primary}
                />
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Kuota bar */}
          {isLow && (
            <View style={styles.kuotaWarning}>
              <Ionicons name="warning" size={14} color={Colors.light.error} />
              <Text style={styles.kuotaWarningText}>
                Sisa {paket.tersisa} kursi! Segera daftarkan diri Anda.
              </Text>
            </View>
          )}
          <View style={styles.kuotaBarBg}>
            <View
              style={[
                styles.kuotaBar,
                {
                  width: `${sisaPercent}%` as any,
                  backgroundColor: isLow
                    ? Colors.light.error
                    : Colors.light.primary,
                },
              ]}
            />
          </View>
          <Text style={styles.kuotaText}>
            Tersedia {paket.tersisa} dari {paket.kuota} kuota
          </Text>

          {/* Deskripsi */}
          <Text style={styles.deskripsi}>{paket.deskripsi}</Text>

          {/* Promo deposit */}
          <View style={styles.promoRow}>
            <View style={styles.promoItem}>
              <Ionicons
                name="wallet-outline"
                size={16}
                color={Colors.light.primary}
              />
              <View>
                <Text style={styles.promoItemLabel}>Deposit Ringan</Text>
                <Text style={styles.promoItemVal}>
                  Mulai {formatRupiah(paket.hargaDeposit)}
                </Text>
              </View>
            </View>
            <View style={styles.promoDivider} />
            <View style={styles.promoItem}>
              <Ionicons
                name="gift-outline"
                size={16}
                color={Colors.light.accent}
              />
              <View>
                <Text
                  style={[
                    styles.promoItemLabel,
                    { color: Colors.light.accent },
                  ]}
                >
                  Promo Spesial
                </Text>
                <Text
                  style={[styles.promoItemVal, { color: Colors.light.accent }]}
                >
                  Free Passport{"\n"}Terbatas!
                </Text>
              </View>
            </View>
          </View>

          {/* ── TABS ── */}
          <View style={styles.tabRow}>
            {(["fasilitas", "itinerary", "syarat"] as TabKey[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tab, activeTab === t && styles.tabActive]}
                onPress={() => setActiveTab(t)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === t && styles.tabTextActive,
                  ]}
                >
                  {t === "fasilitas"
                    ? "Fasilitas"
                    : t === "itinerary"
                      ? "Itinerary"
                      : "Termasuk"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Fasilitas */}
          {activeTab === "fasilitas" && (
            <View style={styles.fasGrid}>
              {paket.fasilitas.map((f, i) => (
                <View key={i} style={styles.fasItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={Colors.light.primary}
                  />
                  <Text style={styles.fasText}>{f}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Itinerary */}
          {activeTab === "itinerary" && (
            <View style={styles.itineraryList}>
              {paket.itinerary.map((item, i) => (
                <View key={item.hari} style={styles.itItem}>
                  <View style={styles.itLeft}>
                    <View style={styles.itDot} />
                    {i < paket.itinerary.length - 1 && (
                      <View style={styles.itLine} />
                    )}
                  </View>
                  <View style={styles.itRight}>
                    <View style={styles.itHariRow}>
                      <View style={styles.itHariPill}>
                        <Text style={styles.itHariText}>Hari {item.hari}</Text>
                      </View>
                      {item.lokasi && (
                        <View style={styles.itLokasiRow}>
                          <Ionicons
                            name="location"
                            size={10}
                            color={Colors.light.accent}
                          />
                          <Text style={styles.itLokasiText}>{item.lokasi}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.itJudul}>{item.judul}</Text>
                    <Text style={styles.itDesk}>{item.deskripsi}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Termasuk / tidak */}
          {activeTab === "syarat" && (
            <View>
              <Text style={styles.syaratGroup}>✅ Sudah Termasuk</Text>
              {paket.fasilitas.map((f, i) => (
                <View key={i} style={styles.syaratItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={15}
                    color={Colors.light.success}
                  />
                  <Text style={styles.syaratText}>{f}</Text>
                </View>
              ))}
              <Text style={[styles.syaratGroup, { marginTop: 16 }]}>
                ❌ Tidak Termasuk
              </Text>
              {[
                "Biaya paspor & visa (jika belum memiliki)",
                "Pengeluaran pribadi & oleh-oleh",
                "Tips guide dan driver lokal",
              ].map((f, i) => (
                <View key={i} style={styles.syaratItem}>
                  <Ionicons
                    name="close-circle"
                    size={15}
                    color={Colors.light.error}
                  />
                  <Text style={styles.syaratText}>{f}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Note user */}
          {user && (
            <View style={styles.userNote}>
              <Ionicons
                name="information-circle"
                size={15}
                color={Colors.light.primary}
              />
              <Text style={styles.userNoteText}>
                Data Anda ({user.nama}, {user.asalDaerah}) akan terkirim
                otomatis saat konsultasi
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ── BOTTOM BAR ── */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.mulaiDari}>Harga Mulai</Text>
          <Text style={styles.harga}>{formatRupiah(paket.harga)}</Text>
        </View>
        <TouchableOpacity
          style={styles.waBtn}
          onPress={handleKonsultasi}
          activeOpacity={0.85}
        >
          <Ionicons name="logo-whatsapp" size={18} color="#FFF" />
          <Text style={styles.waBtnText}>Konsultasi</Text>
          <Ionicons name="arrow-forward" size={15} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.light.white },
  scroll: { paddingBottom: 100 },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  notFoundText: {
    fontSize: Typography.size.md,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },
  backBtn2: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
  },
  backBtn2Text: { color: "#FFF", fontFamily: Typography.fontFamily.bold },

  heroWrap: { height: 260, position: "relative" },
  heroImg: { width: "100%", height: "100%" },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  heroNav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingTop: 8,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  jenisWrap: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    flexDirection: "row",
    gap: 8,
  },
  jenisPill: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  jenisPillText: {
    fontSize: 10,
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
    letterSpacing: 0.5,
  },
  badgePill: {
    backgroundColor: Colors.light.accent,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgePillText: {
    fontSize: 10,
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },

  content: { padding: Spacing.md },
  namaPaket: {
    fontSize: Typography.size["3xl"],
    fontWeight: "800",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.extraBold,
    marginBottom: 6,
    lineHeight: 32,
  },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  ratingText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },

  routeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.md,
    padding: 12,
    marginBottom: 14,
  },
  routeLabel: {
    fontSize: Typography.size.xs,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },
  routeValue: {
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
  },
  maskapaiChip: {
    fontSize: Typography.size.xs,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
    textAlign: "right",
  },

  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.light.backgroundMuted,
    borderRadius: BorderRadius.md,
    marginBottom: 12,
  },
  statItem: { flex: 1, alignItems: "center", paddingVertical: 12, gap: 4 },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: Colors.light.borderLight,
  },
  statVal: {
    fontSize: Typography.size.md,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },

  kuotaWarning: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.light.errorLight,
    borderRadius: BorderRadius.sm,
    padding: 8,
    marginBottom: 8,
  },
  kuotaWarningText: {
    fontSize: Typography.size.xs,
    color: Colors.light.error,
    fontFamily: Typography.fontFamily.semiBold,
    flex: 1,
  },
  kuotaBarBg: {
    height: 5,
    backgroundColor: Colors.light.borderLight,
    borderRadius: 3,
    marginBottom: 4,
  },
  kuotaBar: { height: 5, borderRadius: 3 },
  kuotaText: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 14,
  },

  deskripsi: {
    fontSize: Typography.size.base,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 16,
  },

  promoRow: {
    flexDirection: "row",
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.md,
    padding: 14,
    marginBottom: 20,
  },
  promoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  promoDivider: {
    width: 1,
    backgroundColor: Colors.light.borderLight,
    marginHorizontal: 8,
  },
  promoItemLabel: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },
  promoItemVal: {
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.semiBold,
    lineHeight: 18,
  },

  tabRow: {
    flexDirection: "row",
    backgroundColor: Colors.light.backgroundMuted,
    borderRadius: BorderRadius.md,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: BorderRadius.sm - 2,
  },
  tabActive: { backgroundColor: "#FFF", ...Shadow.sm },
  tabText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },
  tabTextActive: {
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.bold,
  },

  fasGrid: { gap: 10 },
  fasItem: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  fasText: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 20,
  },

  itineraryList: { gap: 0 },
  itItem: { flexDirection: "row", gap: 12 },
  itLeft: { alignItems: "center", width: 14 },
  itDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
    marginTop: 4,
  },
  itLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.light.borderLight,
    marginVertical: 4,
  },
  itRight: { flex: 1, paddingBottom: 18 },
  itHariRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  itHariPill: {
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  itHariText: {
    fontSize: 10,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.bold,
  },
  itLokasiRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  itLokasiText: {
    fontSize: 10,
    color: Colors.light.accent,
    fontFamily: Typography.fontFamily.semiBold,
  },
  itJudul: {
    fontSize: Typography.size.md,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 3,
  },
  itDesk: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 18,
  },

  syaratGroup: {
    fontSize: Typography.size.md,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 10,
  },
  syaratItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
  },
  syaratText: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.regular,
  },

  userNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.md,
    padding: 10,
    marginTop: 20,
  },
  userNoteText: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 16,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
    ...Shadow.lg,
  },
  mulaiDari: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },
  harga: {
    fontSize: Typography.size.xl,
    fontWeight: "800",
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.extraBold,
  },
  waBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#25D366",
    borderRadius: BorderRadius.md,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  waBtnText: {
    fontSize: Typography.size.md,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },
});
