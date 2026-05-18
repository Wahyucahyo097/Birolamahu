import { PAKET_DATA } from "@/constants/Data";
import { Colors } from "@/constants/theme";
import {
  BorderRadius,
  Shadow,
  Spacing,
  Typography,
} from "@/constants/Typography";
import type { PaketUmroh } from "@/types";
import { formatRupiah } from "@/utils/formatCurrency";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FILTERS = [
  { label: "Semua", value: "semua" },
  { label: "Umrah Reguler", value: "umrah-reguler" },
  { label: "Umrah Premium", value: "umrah-premium" },
  { label: "Haji Furoda", value: "haji-furoda" },
  { label: "B2B", value: "b2b" },
];

export default function PaketScreen() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("semua");

  const filtered = useMemo(() => {
    return PAKET_DATA.filter((p) => {
      const matchFilter = activeFilter === "semua" || p.jenis === activeFilter;
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch && p.isActive;
    });
  }, [search, activeFilter]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pilih Paket</Text>
        <Text style={styles.headerSub}>
          Temukan paket terbaik untuk perjalanan suci Anda
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={18}
          color={Colors.light.textMuted}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari paket umroh..."
          placeholderTextColor={Colors.light.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons
              name="close-circle"
              size={18}
              color={Colors.light.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[
                styles.filterChip,
                activeFilter === f.value && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(f.value)}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.filterText,
                  activeFilter === f.value && styles.filterTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons
              name="search"
              size={52}
              color={Colors.light.borderLight}
            />
            <Text style={styles.emptyText}>Paket tidak ditemukan</Text>
          </View>
        ) : (
          filtered.map((p) => <PaketListCard key={p.id} paket={p} />)
        )}
      </ScrollView>

      {/* Bottom promo */}
      <View style={styles.bottomBanner}>
        <Ionicons name="card-outline" size={16} color={Colors.light.accent} />
        <Text style={styles.bannerText}>
          Deposit Rp 2.500.000 · Cicilan 0% s/d 12 bulan
        </Text>
        <Ionicons
          name="shield-checkmark-outline"
          size={16}
          color={Colors.light.primary}
        />
      </View>
    </SafeAreaView>
  );
}

function PaketListCard({ paket }: { paket: PaketUmroh }) {
  const sisaPercent = Math.round((paket.tersisa / paket.kuota) * 100);
  const isLow = paket.tersisa <= 5;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/paket/${paket.id}` as any)}
      activeOpacity={0.82}
    >
      {/* Gambar */}
      <View style={styles.cardImgWrap}>
        <Image
          source={{ uri: paket.imageUrl }}
          style={styles.cardImg}
          resizeMode="cover"
        />
        {paket.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{paket.badge}</Text>
          </View>
        )}
        {isLow && (
          <View style={styles.lowStock}>
            <Text style={styles.lowStockText}>
              ⚠️ Sisa {paket.tersisa} kursi
            </Text>
          </View>
        )}
      </View>

      {/* Konten */}
      <View style={styles.cardBody}>
        {/* Maskapai */}
        <View style={styles.maskapaiRow}>
          <Ionicons name="airplane" size={12} color={Colors.light.primary} />
          <Text style={styles.maskapaiText}>
            {paket.maskapai} · Direct Flight
          </Text>
        </View>

        <Text style={styles.cardNama}>{paket.nama}</Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons
              name="time-outline"
              size={12}
              color={Colors.light.textMuted}
            />
            <Text style={styles.metaText}>{paket.durasi} Hari</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="star" size={12} color={Colors.light.accent} />
            <Text style={styles.metaText}>Bintang {paket.bintangHotel}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name="location-outline"
              size={12}
              color={Colors.light.textMuted}
            />
            <Text style={styles.metaText}>Makkah & Madinah</Text>
          </View>
        </View>

        {/* Kuota bar */}
        <View style={styles.kuotaRow}>
          <Text style={styles.kuotaText}>
            Kuota tersisa: {paket.tersisa}/{paket.kuota}
          </Text>
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
        </View>

        {/* Harga + tombol */}
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.mulaiDari}>Mulai dari</Text>
            <Text style={styles.harga}>{formatRupiah(paket.harga)}</Text>
          </View>
          <TouchableOpacity
            style={styles.detailBtn}
            onPress={() => router.push(`/paket/${paket.id}` as any)}
          >
            <Text style={styles.detailBtnText}>Lihat Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.white },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: 12,
    paddingBottom: 8,
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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: Spacing.md,
    marginVertical: 12,
    backgroundColor: Colors.light.white,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
    height: 48,
    ...Shadow.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.regular,
  },

  filterWrapper: {
    marginHorizontal: Spacing.md,
    marginBottom: 10,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.light.backgroundSoft,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
    ...Shadow.sm,
  },
  filterList: { paddingHorizontal: 4, gap: 10, alignItems: "center" },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
    minHeight: 42,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 140,
  },
  filterChipActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterText: {
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.semiBold,
    textAlign: "center",
  },
  filterTextActive: {
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },

  list: { padding: Spacing.md, gap: 14 },
  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: {
    fontSize: Typography.size.md,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },

  // Card
  card: {
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.xxl,
    overflow: "hidden",
    ...Shadow.lg,
    borderWidth: 0,
  },
  cardImgWrap: { position: "relative", height: 160 },
  cardImg: { width: "100%", height: "100%" },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: Colors.light.accent,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },
  lowStock: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.light.errorLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  lowStockText: {
    fontSize: 10,
    color: Colors.light.error,
    fontFamily: Typography.fontFamily.semiBold,
  },
  cardBody: { padding: Spacing.lg },
  maskapaiRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },
  maskapaiText: {
    fontSize: 11,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },
  cardNama: {
    fontSize: Typography.size.lg,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 8,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  metaText: {
    fontSize: 11,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },

  // Kuota bar
  kuotaRow: { marginBottom: 12 },
  kuotaText: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 4,
  },
  kuotaBarBg: {
    height: 4,
    backgroundColor: Colors.light.borderLight,
    borderRadius: 2,
  },
  kuotaBar: { height: 4, borderRadius: 2 },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mulaiDari: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },
  harga: {
    fontSize: Typography.size.xl,
    fontWeight: "800",
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.extraBold,
  },
  detailBtn: {
    backgroundColor: Colors.light.accent,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  detailBtnText: {
    fontSize: Typography.size.sm,
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },

  bottomBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.light.accentLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.accent,
    borderRadius: BorderRadius.lg,
    margin: Spacing.md,
    marginTop: 8,
  },
  bannerText: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },
});
