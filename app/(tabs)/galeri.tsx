import { GALERI_DATA } from "@/constants/Data";
import { Colors } from "@/constants/theme";
import {
  BorderRadius,
  Shadow,
  Spacing,
  Typography,
} from "@/constants/Typography";
import type { GaleriItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");
const IMG_SIZE = (W - Spacing.md * 2 - 8) / 3;

const KATEGORI_FILTER = [
  { label: "Semua", value: "semua" },
  { label: "🕌 Ibadah", value: "ibadah" },
  { label: "🏨 Hotel", value: "hotel" },
  { label: "✈️ Perjalanan", value: "perjalanan" },
  { label: "👥 Kegiatan", value: "kegiatan" },
];

export default function GaleriScreen() {
  const [activeKat, setActiveKat] = useState("semua");
  const [selected, setSelected] = useState<GaleriItem | null>(null);

  const filtered = GALERI_DATA.filter(
    (g) => activeKat === "semua" || g.kategori === activeKat,
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Galeri Foto</Text>
        <Text style={styles.headerSub}>
          Momen kegiatan umroh bersama Lamahu Tour
        </Text>
      </View>

      {/* Filter kategori */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {KATEGORI_FILTER.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[styles.chip, activeKat === f.value && styles.chipActive]}
              onPress={() => setActiveKat(f.value)}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.chipText,
                  activeKat === f.value && styles.chipTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Jumlah foto */}
      <Text style={styles.countText}>{filtered.length} foto ditemukan</Text>

      {/* Grid foto */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setSelected(item)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.gridImg} />
            <View style={styles.gridOverlay}>
              <Ionicons name="expand-outline" size={14} color="#FFF" />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="images-outline"
              size={52}
              color={Colors.light.borderLight}
            />
            <Text style={styles.emptyText}>Belum ada foto di kategori ini</Text>
          </View>
        }
      />

      {/* ── MODAL PREVIEW ── */}
      <Modal
        visible={!!selected}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalBg}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setSelected(null)}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>

          {selected && (
            <>
              <Image
                source={{ uri: selected.imageUrl }}
                style={styles.modalImg}
                resizeMode="contain"
              />
              <View style={styles.modalInfo}>
                <View style={styles.modalKatPill}>
                  <Text style={styles.modalKatText}>
                    {selected.kategori.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.modalJudul}>{selected.judul}</Text>
                {selected.deskripsi && (
                  <Text style={styles.modalDesk}>{selected.deskripsi}</Text>
                )}
                <Text style={styles.modalTgl}>
                  📅{" "}
                  {new Date(selected.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </>
          )}

          {/* Navigasi prev / next */}
          {selected &&
            (() => {
              const idx = filtered.findIndex((g) => g.id === selected.id);
              return (
                <View style={styles.modalNav}>
                  <TouchableOpacity
                    style={[styles.navBtn, idx === 0 && styles.navBtnDisabled]}
                    onPress={() => idx > 0 && setSelected(filtered[idx - 1])}
                    disabled={idx === 0}
                  >
                    <Ionicons name="chevron-back" size={22} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.navCount}>
                    {idx + 1} / {filtered.length}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.navBtn,
                      idx === filtered.length - 1 && styles.navBtnDisabled,
                    ]}
                    onPress={() =>
                      idx < filtered.length - 1 &&
                      setSelected(filtered[idx + 1])
                    }
                    disabled={idx === filtered.length - 1}
                  >
                    <Ionicons name="chevron-forward" size={22} color="#FFF" />
                  </TouchableOpacity>
                </View>
              );
            })()}
        </View>
      </Modal>
    </SafeAreaView>
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
    maxWidth: 140,
  },
  chipActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
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

  countText: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    paddingHorizontal: Spacing.md,
    marginBottom: 6,
  },

  grid: { paddingHorizontal: Spacing.md, paddingBottom: 32 },
  gridRow: { gap: 4, marginBottom: 4 },
  gridItem: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
    position: "relative",
  },
  gridImg: { width: "100%", height: "100%" },
  gridOverlay: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: {
    fontSize: Typography.size.md,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },

  // Modal
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 28,
  },
  modalClose: {
    position: "absolute",
    top: 52,
    right: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  modalImg: {
    width: W,
    height: W,
    maxHeight: "62%",
    borderRadius: BorderRadius.lg,
  },
  modalInfo: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 18,
    alignSelf: "flex-start",
    width: W,
  },
  modalKatPill: {
    backgroundColor: Colors.light.accent,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  modalKatText: {
    fontSize: 9.5,
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },
  modalJudul: {
    fontSize: Typography.size.xl,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 6,
  },
  modalDesk: {
    fontSize: Typography.size.sm,
    color: "rgba(255,255,255,0.75)",
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 19,
    marginBottom: 6,
  },
  modalTgl: {
    fontSize: Typography.size.sm,
    color: "rgba(255,255,255,0.55)",
    fontFamily: Typography.fontFamily.regular,
  },

  modalNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginTop: 20,
    paddingHorizontal: Spacing.xl,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnDisabled: { opacity: 0.3 },
  navCount: {
    fontSize: Typography.size.md,
    color: "#FFF",
    fontFamily: Typography.fontFamily.semiBold,
  },
});
