import { BERITA_DATA } from "@/constants/Data";
import { Colors } from "@/constants/theme";
import {
    BorderRadius,
    Shadow,
    Spacing,
    Typography,
} from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { formatTanggal } from "@/utils/formatCurrency";
import { openWhatsApp } from "@/utils/whatsapp";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
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

const KATEGORI_COLOR: Record<string, string> = {
  info: "#3B82F6",
  panduan: Colors.light.primary,
  promo: Colors.light.accent,
  video: "#EF4444",
};

export default function DetailBeritaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state } = useUserStore();
  const user = state.user;
  const berita = BERITA_DATA.find((b) => b.id === id);
  const katColor = KATEGORI_COLOR[berita?.kategori ?? "info"];

  if (!berita) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Artikel tidak ditemukan</Text>
      </View>
    );
  }

  const handleShare = async () => {
    await Share.share({
      message: `Baca artikel menarik dari Lamahu Tour:\n\n*${berita.judul}*\n\n${berita.ringkasan}`,
    });
  };

  const handleKonsultasi = async () => {
    if (!user) return;
    await openWhatsApp({
      namaUser: user.nama,
      asalUser: user.asalDaerah,
      nomorWA: user.nomorWA,
    });
  };

  // Render konten markdown sederhana (bold & paragraf)
  const renderKonten = (text: string) => {
    const paragraphs = text.split("\n\n");
    return paragraphs.map((para, i) => {
      if (para.startsWith("**") && para.endsWith("**")) {
        return (
          <Text key={i} style={styles.kontenHeading}>
            {para.replace(/\*\*/g, "")}
          </Text>
        );
      }
      // Inline bold
      const parts = para.split(/(\*\*[^*]+\*\*)/g);
      return (
        <Text key={i} style={styles.kontenPara}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <Text key={j} style={styles.kontenBold}>
                {part.replace(/\*\*/g, "")}
              </Text>
            ) : (
              part
            ),
          )}
        </Text>
      );
    });
  };

  // Artikel terkait
  const related = BERITA_DATA.filter(
    (b) => b.id !== berita.id && b.isPublished,
  ).slice(0, 2);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Hero Image ── */}
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: berita.imageUrl }}
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

          {berita.kategori === "video" && (
            <View style={styles.playCircle}>
              <Ionicons name="play" size={24} color="#FFF" />
            </View>
          )}
        </View>

        {/* ── Konten ── */}
        <View style={styles.content}>
          {/* Kategori & tanggal */}
          <View style={styles.metaRow}>
            <View style={[styles.katPill, { backgroundColor: katColor }]}>
              <Text style={styles.katPillText}>
                {berita.kategori.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.tanggalText}>
              {formatTanggal(berita.tanggal)}
            </Text>
          </View>

          <Text style={styles.judul}>{berita.judul}</Text>

          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <Ionicons name="person" size={14} color={Colors.light.primary} />
            </View>
            <Text style={styles.authorText}>{berita.penulis}</Text>
          </View>

          <Text style={styles.ringkasan}>{berita.ringkasan}</Text>

          <View style={styles.divider} />

          <View style={styles.konten}>{renderKonten(berita.konten)}</View>

          {/* ── Artikel Terkait ── */}
          {related.length > 0 && (
            <>
              <Text style={styles.relatedTitle}>Artikel Terkait</Text>
              {related.map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={styles.relatedCard}
                  onPress={() => router.replace(`/berita/${r.id}` as any)}
                >
                  <Image
                    source={{ uri: r.imageUrl }}
                    style={styles.relatedImg}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.relatedJudul} numberOfLines={2}>
                      {r.judul}
                    </Text>
                    <Text style={styles.relatedTgl}>
                      {formatTanggal(r.tanggal)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* ── CTA Konsultasi ── */}
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>
              Tertarik Ibadah ke Tanah Suci? 🕌
            </Text>
            <Text style={styles.ctaSub}>
              Konsultasikan dengan tim kami. Gratis, tanpa komitmen!
            </Text>
            <TouchableOpacity
              style={styles.waBtn}
              onPress={handleKonsultasi}
              activeOpacity={0.85}
            >
              <Ionicons name="logo-whatsapp" size={18} color="#FFF" />
              <Text style={styles.waBtnText}>Konsultasi via WhatsApp</Text>
              <Ionicons name="arrow-forward" size={15} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.light.white },
  scroll: { paddingBottom: 32 },
  notFound: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFoundText: {
    fontSize: Typography.size.md,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },

  heroWrap: { height: 240, position: "relative" },
  heroImg: { width: "100%", height: "100%" },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
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
  playCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -28,
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  content: { padding: Spacing.md },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  katPill: {
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  katPillText: {
    fontSize: 9.5,
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
    letterSpacing: 0.5,
  },
  tanggalText: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },

  judul: {
    fontSize: Typography.size["3xl"],
    fontWeight: "800",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.extraBold,
    lineHeight: 34,
    marginBottom: 10,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  authorText: {
    fontSize: Typography.size.sm,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },

  ringkasan: {
    fontSize: Typography.size.md,
    color: Colors.light.textSecondary,
    fontFamily: Typography.fontFamily.medium,
    lineHeight: 23,
    marginBottom: 14,
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.borderLight,
    marginBottom: 16,
  },

  konten: { gap: 12 },
  kontenPara: {
    fontSize: Typography.size.base,
    color: Colors.light.textSecondary,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 24,
  },
  kontenBold: {
    fontFamily: Typography.fontFamily.bold,
    color: Colors.light.text,
  },
  kontenHeading: {
    fontSize: Typography.size.lg,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginTop: 4,
  },

  relatedTitle: {
    fontSize: Typography.size.lg,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginTop: 24,
    marginBottom: 12,
  },
  relatedCard: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    backgroundColor: Colors.light.backgroundSoft,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    ...Shadow.sm,
  },
  relatedImg: { width: 80, height: 70 },
  relatedJudul: {
    fontSize: Typography.size.sm,
    fontWeight: "600",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.semiBold,
    lineHeight: 18,
    padding: 8,
    paddingBottom: 4,
  },
  relatedTgl: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    paddingHorizontal: 8,
  },

  ctaCard: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginTop: 24,
    alignItems: "center",
    gap: 8,
  },
  ctaTitle: {
    fontSize: Typography.size.xl,
    fontWeight: "800",
    color: "#FFF",
    fontFamily: Typography.fontFamily.extraBold,
    textAlign: "center",
  },
  ctaSub: {
    fontSize: Typography.size.sm,
    color: "rgba(255,255,255,0.75)",
    fontFamily: Typography.fontFamily.regular,
    textAlign: "center",
    lineHeight: 19,
  },
  waBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#25D366",
    borderRadius: BorderRadius.md,
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginTop: 4,
  },
  waBtnText: {
    fontSize: Typography.size.md,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },
});
