import { BERITA_DATA } from "@/constants/Data";
import { Colors } from "@/constants/theme";
import {
    BorderRadius,
    Shadow,
    Spacing,
    Typography,
} from "@/constants/Typography";
import type { BeritaItem } from "@/types";
import { formatTanggal } from "@/utils/formatCurrency";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

const KATEGORI_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
  }
> = {
  info: { label: "Info", icon: "information-circle", color: "#3B82F6" },
  panduan: { label: "Panduan", icon: "book", color: Colors.light.primary },
  promo: { label: "Promo", icon: "pricetag", color: Colors.light.accent },
  video: { label: "Video", icon: "play-circle", color: "#EF4444" },
};

const FILTERS = [
  { label: "Semua", value: "semua" },
  { label: "Info", value: "info" },
  { label: "Panduan", value: "panduan" },
  { label: "Promo", value: "promo" },
  { label: "Video", value: "video" },
];

export default function BeritaScreen() {
  const [activeFilter, setActiveFilter] = useState("semua");

  const featured = BERITA_DATA[0];
  const filtered = BERITA_DATA.filter(
    (b) =>
      (activeFilter === "semua" || b.kategori === activeFilter) &&
      b.isPublished,
  );
  const listItems = filtered.filter((b) => b.id !== featured.id);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Berita & Info</Text>
        <Text style={styles.headerSub}>
          Tips, panduan, dan informasi terbaru
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Featured Article ── */}
        {activeFilter === "semua" && (
          <TouchableOpacity
            style={styles.featured}
            onPress={() => router.push(`/berita/${featured.id}` as any)}
            activeOpacity={0.88}
          >
            <Image
              source={{ uri: featured.imageUrl }}
              style={styles.featuredImg}
            />
            <View style={styles.featuredOverlay} />
            <View style={styles.featuredContent}>
              <KategoriBadge kategori={featured.kategori} />
              <Text style={styles.featuredJudul} numberOfLines={2}>
                {featured.judul}
              </Text>
              <Text style={styles.featuredRing} numberOfLines={2}>
                {featured.ringkasan}
              </Text>
              <View style={styles.featuredMeta}>
                <Ionicons
                  name="person-circle-outline"
                  size={13}
                  color="rgba(255,255,255,0.7)"
                />
                <Text style={styles.featuredMetaText}>{featured.penulis}</Text>
                <Text style={styles.featuredMetaDot}>·</Text>
                <Text style={styles.featuredMetaText}>
                  {formatTanggal(featured.tanggal)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* ── Filter ── */}
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f.value}
                style={[
                  styles.chip,
                  activeFilter === f.value && styles.chipActive,
                ]}
                onPress={() => setActiveFilter(f.value)}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.chipText,
                    activeFilter === f.value && styles.chipTextActive,
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Article List ── */}
        <View style={styles.list}>
          {(activeFilter === "semua" ? listItems : filtered).map((b) => (
            <BeritaCard key={b.id} item={b} />
          ))}
        </View>

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons
              name="newspaper-outline"
              size={52}
              color={Colors.light.borderLight}
            />
            <Text style={styles.emptyText}>
              Belum ada artikel di kategori ini
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function KategoriBadge({ kategori }: { kategori: string }) {
  const cfg = KATEGORI_CONFIG[kategori] ?? KATEGORI_CONFIG.info;
  return (
    <View style={[styles.katBadge, { backgroundColor: cfg.color }]}>
      <Ionicons name={cfg.icon} size={11} color="#FFF" />
      <Text style={styles.katBadgeText}>{cfg.label.toUpperCase()}</Text>
    </View>
  );
}

function BeritaCard({ item }: { item: BeritaItem }) {
  const cfg = KATEGORI_CONFIG[item.kategori] ?? KATEGORI_CONFIG.info;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/berita/${item.id}` as any)}
      activeOpacity={0.84}
    >
      <View style={styles.cardImgWrap}>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImg} />
        {item.kategori === "video" && (
          <View style={styles.playBtn}>
            <Ionicons name="play" size={18} color="#FFF" />
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <View style={[styles.katPill, { backgroundColor: cfg.color + "18" }]}>
          <Text style={[styles.katPillText, { color: cfg.color }]}>
            {cfg.label}
          </Text>
        </View>
        <Text style={styles.cardJudul} numberOfLines={2}>
          {item.judul}
        </Text>
        <Text style={styles.cardRing} numberOfLines={2}>
          {item.ringkasan}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPenulis}>{item.penulis}</Text>
          <Text style={styles.cardTgl}>{formatTanggal(item.tanggal)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.white },
  scroll: { paddingBottom: 32 },

  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderLight,
  },
  headerTitle: {
    fontSize: Typography.size["2xl"],
    fontWeight: "800",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.extraBold,
  },
  headerSub: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 2,
  },

  // Featured
  featured: {
    height: 258,
    marginHorizontal: Spacing.md,
    marginTop: 16,
    borderRadius: BorderRadius.xxl,
    overflow: "hidden",
    ...Shadow.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  featuredImg: { width: "100%", height: "100%", position: "absolute" },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.34)",
  },
  featuredContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 22,
  },
  featuredJudul: {
    fontSize: Typography.size["2xl"],
    fontWeight: "800",
    color: "#FFF",
    fontFamily: Typography.fontFamily.extraBold,
    lineHeight: 32,
    marginVertical: 8,
  },
  featuredRing: {
    fontSize: Typography.size.sm,
    color: "rgba(255,255,255,0.8)",
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 18,
    marginBottom: 8,
  },
  featuredMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  featuredMetaText: {
    fontSize: Typography.size.xs,
    color: "rgba(255,255,255,0.65)",
    fontFamily: Typography.fontFamily.regular,
  },
  featuredMetaDot: {
    fontSize: Typography.size.xs,
    color: "rgba(255,255,255,0.4)",
  },

  katBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  katBadgeText: {
    fontSize: 9,
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
    letterSpacing: 0.5,
  },

  filterWrapper: {
    marginHorizontal: Spacing.md,
    marginBottom: 14,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.light.backgroundSoft,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
    ...Shadow.sm,
  },
  filterRow: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 10,
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
    minHeight: 42,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 120,
  },
  chipActive: {
    backgroundColor: Colors.light.accent,
    borderColor: Colors.light.accent,
  },
  chipText: {
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.semiBold,
    textAlign: "center",
  },
  chipTextActive: {
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },

  list: { paddingHorizontal: Spacing.md, gap: 12 },
  empty: { alignItems: "center", paddingTop: 48, gap: 12 },
  emptyText: {
    fontSize: Typography.size.md,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.xxl,
    overflow: "hidden",
    ...Shadow.sm,
  },
  cardImgWrap: { width: 110, height: 110, position: "relative" },
  cardImg: { width: "100%", height: "100%" },
  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -18,
    marginLeft: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: { flex: 1, padding: 14 },
  katPill: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light.accent,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  katPillText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: "#FFF",
  },
  cardJudul: {
    fontSize: Typography.size.sm,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    lineHeight: 17,
    marginBottom: 3,
  },
  cardRing: {
    fontSize: 11,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 15,
    marginBottom: 6,
  },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  cardPenulis: {
    fontSize: 10,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },
  cardTgl: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },
});
