import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { GALERI_DATA } from "@/constants/Data";
import { Colors } from "@/constants/theme";
import { BorderRadius, Spacing, Typography } from "@/constants/Typography";
import type { GaleriItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");
const ITEM_SIZE = (W - Spacing.md * 2 - 8) / 3;

const KATEGORI_OPTS = ["ibadah", "hotel", "perjalanan", "kegiatan"] as const;

const emptyForm = (): Partial<GaleriItem> => ({
  judul: "",
  imageUrl: "",
  kategori: "ibadah",
  tanggal: new Date().toISOString().slice(0, 10),
  deskripsi: "",
});

export default function KelolaGaleriScreen() {
  const [items, setItems] = useState<GaleriItem[]>(GALERI_DATA);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<GaleriItem>>(emptyForm());
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setForm(emptyForm());
    setModalMode("add");
  };
  const openEdit = (g: GaleriItem) => {
    setForm(g);
    setModalMode("edit");
  };

  const handleDelete = (g: GaleriItem) =>
    Alert.alert("Hapus", `Hapus "${g.judul}"?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => setItems((prev) => prev.filter((x) => x.id !== g.id)),
      },
    ]);

  const handleSave = async () => {
    if (!form.judul?.trim() || !form.imageUrl?.trim()) {
      Alert.alert("Error", "Judul dan URL gambar wajib diisi");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    if (modalMode === "add") {
      setItems((prev) => [
        { ...emptyForm(), ...form, id: `g-${Date.now()}` } as GaleriItem,
        ...prev,
      ]);
    } else {
      setItems((prev) =>
        prev.map((x) => (x.id === form.id ? (form as GaleriItem) : x)),
      );
    }
    setSaving(false);
    setModalMode(null);
  };

  const setF = (key: keyof GaleriItem) => (val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kelola Galeri ({items.length})</Text>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Ionicons name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.gridImg} />
            <View style={styles.gridActions}>
              <TouchableOpacity
                style={styles.gridEdit}
                onPress={() => openEdit(item)}
              >
                <Ionicons
                  name="create"
                  size={12}
                  color={Colors.light.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.gridDelete}
                onPress={() => handleDelete(item)}
              >
                <Ionicons name="trash" size={12} color={Colors.light.error} />
              </TouchableOpacity>
            </View>
            <Text style={styles.gridLabel} numberOfLines={1}>
              {item.judul}
            </Text>
          </View>
        )}
      />

      <Modal
        visible={!!modalMode}
        animationType="slide"
        transparent
        onRequestClose={() => setModalMode(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalMode === "add" ? "Tambah Foto" : "Edit Foto"}
              </Text>
              <TouchableOpacity onPress={() => setModalMode(null)}>
                <Ionicons name="close" size={22} color={Colors.light.text} />
              </TouchableOpacity>
            </View>
            <Input
              label="Judul Foto"
              value={form.judul ?? ""}
              onChangeText={setF("judul")}
              icon="image-outline"
              required
              placeholder="Contoh: Tawaf di Masjidil Haram"
            />
            <Input
              label="URL Gambar"
              value={form.imageUrl ?? ""}
              onChangeText={setF("imageUrl")}
              icon="link-outline"
              required
              placeholder="https://..."
            />
            <Input
              label="Deskripsi (opsional)"
              value={form.deskripsi ?? ""}
              onChangeText={setF("deskripsi")}
              icon="text-outline"
            />
            <Input
              label="Tanggal"
              value={form.tanggal ?? ""}
              onChangeText={setF("tanggal")}
              icon="calendar-outline"
              placeholder="2025-01-01"
            />
            <Text style={styles.formLabel}>Kategori</Text>
            <View style={styles.katRow}>
              {KATEGORI_OPTS.map((k) => (
                <TouchableOpacity
                  key={k}
                  style={[
                    styles.katChip,
                    form.kategori === k && styles.katChipActive,
                  ]}
                  onPress={() => setF("kategori")(k)}
                >
                  <Text
                    style={[
                      styles.katChipText,
                      form.kategori === k && styles.katChipTextActive,
                    ]}
                  >
                    {k}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              label={modalMode === "add" ? "Simpan Foto" : "Update Foto"}
              onPress={handleSave}
              loading={saving}
              size="lg"
              fullWidth
              icon="checkmark-circle"
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.backgroundSoft },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderLight,
  },
  headerTitle: {
    fontSize: Typography.size.lg,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
  },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: { padding: Spacing.md },
  gridRow: { gap: 4, marginBottom: 4 },
  gridItem: { width: ITEM_SIZE, position: "relative" },
  gridImg: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: BorderRadius.sm,
  },
  gridActions: {
    position: "absolute",
    top: 4,
    right: 4,
    flexDirection: "column",
    gap: 3,
  },
  gridEdit: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  gridDelete: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  gridLabel: {
    fontSize: 9.5,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.lg,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: Typography.size.xl,
    fontWeight: "800",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.extraBold,
  },
  formLabel: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.light.text,
    marginBottom: 8,
  },
  katRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  katChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.light.backgroundMuted,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
  },
  katChipActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  katChipText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },
  katChipTextActive: {
    color: "#FFF",
    fontFamily: Typography.fontFamily.semiBold,
  },
});
