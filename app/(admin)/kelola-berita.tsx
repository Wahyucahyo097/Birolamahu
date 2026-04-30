import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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
    Alert,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const KATEGORI_OPTS = ["info", "panduan", "promo", "video"] as const;

const emptyForm = (): Partial<BeritaItem> => ({
  judul: "",
  ringkasan: "",
  konten: "",
  imageUrl:
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
  kategori: "info",
  tanggal: new Date().toISOString().slice(0, 10),
  penulis: "Tim Lamahu Tour",
  videoUrl: "",
  isPublished: false,
});

export default function KelolaBeritaScreen() {
  const [items, setItems] = useState<BeritaItem[]>(BERITA_DATA);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<BeritaItem>>(emptyForm());
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setForm(emptyForm());
    setModalMode("add");
  };
  const openEdit = (b: BeritaItem) => {
    setForm(b);
    setModalMode("edit");
  };

  const handleDelete = (b: BeritaItem) =>
    Alert.alert("Hapus", `Hapus artikel "${b.judul}"?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => setItems((prev) => prev.filter((x) => x.id !== b.id)),
      },
    ]);

  const togglePublish = (id: string) =>
    setItems((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, isPublished: !x.isPublished } : x,
      ),
    );

  const handleSave = async () => {
    if (!form.judul?.trim()) {
      Alert.alert("Error", "Judul tidak boleh kosong");
      return;
    }
    if (!form.konten?.trim()) {
      Alert.alert("Error", "Konten tidak boleh kosong");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    if (modalMode === "add") {
      setItems((prev) => [
        { ...emptyForm(), ...form, id: `b-${Date.now()}` } as BeritaItem,
        ...prev,
      ]);
    } else {
      setItems((prev) =>
        prev.map((x) => (x.id === form.id ? (form as BeritaItem) : x)),
      );
    }
    setSaving(false);
    setModalMode(null);
  };

  const setF = (key: keyof BeritaItem) => (val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kelola Berita ({items.length})</Text>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Ionicons name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {items.map((b) => (
          <View key={b.id} style={styles.card}>
            <Image source={{ uri: b.imageUrl }} style={styles.cardImg} />
            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                <View style={styles.katPill}>
                  <Text style={styles.katText}>{b.kategori.toUpperCase()}</Text>
                </View>
                <View
                  style={[
                    styles.pubPill,
                    {
                      backgroundColor: b.isPublished
                        ? Colors.light.successLight
                        : Colors.light.errorLight,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.pubText,
                      {
                        color: b.isPublished
                          ? Colors.light.success
                          : Colors.light.error,
                      },
                    ]}
                  >
                    {b.isPublished ? "Published" : "Draft"}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardJudul} numberOfLines={2}>
                {b.judul}
              </Text>
              <Text style={styles.cardPenulis}>
                {b.penulis} · {formatTanggal(b.tanggal)}
              </Text>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => openEdit(b)}
                >
                  <Ionicons
                    name="create-outline"
                    size={13}
                    color={Colors.light.primary}
                  />
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(b)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={13}
                    color={Colors.light.error}
                  />
                  <Text style={styles.deleteBtnText}>Hapus</Text>
                </TouchableOpacity>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Publish</Text>
                  <Switch
                    value={b.isPublished}
                    onValueChange={() => togglePublish(b.id)}
                    trackColor={{
                      false: Colors.light.borderLight,
                      true: Colors.light.primaryLight,
                    }}
                    thumbColor={
                      b.isPublished
                        ? Colors.light.primary
                        : Colors.light.textMuted
                    }
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ── MODAL FORM ── */}
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
                {modalMode === "add" ? "Tulis Artikel" : "Edit Artikel"}
              </Text>
              <TouchableOpacity onPress={() => setModalMode(null)}>
                <Ionicons name="close" size={22} color={Colors.light.text} />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Input
                label="Judul Artikel"
                value={form.judul ?? ""}
                onChangeText={setF("judul")}
                icon="document-text-outline"
                required
                placeholder="Judul yang menarik..."
              />
              <Input
                label="Ringkasan"
                value={form.ringkasan ?? ""}
                onChangeText={setF("ringkasan")}
                icon="text-outline"
                placeholder="Ringkasan singkat 1-2 kalimat..."
              />
              <Input
                label="URL Gambar"
                value={form.imageUrl ?? ""}
                onChangeText={setF("imageUrl")}
                icon="image-outline"
              />
              <Input
                label="Penulis"
                value={form.penulis ?? ""}
                onChangeText={setF("penulis")}
                icon="person-outline"
              />
              <Input
                label="Tanggal"
                value={form.tanggal ?? ""}
                onChangeText={setF("tanggal")}
                icon="calendar-outline"
                placeholder="2025-01-01"
              />

              {/* Kategori */}
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

              {/* Video URL jika kategori video */}
              {form.kategori === "video" && (
                <Input
                  label="URL Video (YouTube)"
                  value={form.videoUrl ?? ""}
                  onChangeText={setF("videoUrl")}
                  icon="play-circle-outline"
                  placeholder="https://youtube.com/..."
                />
              )}

              {/* Konten */}
              <Text style={styles.formLabel}>
                Konten Artikel{" "}
                <Text style={{ color: Colors.light.error }}>*</Text>
              </Text>
              <TextInput
                style={styles.textArea}
                value={form.konten ?? ""}
                onChangeText={setF("konten")}
                multiline
                numberOfLines={8}
                placeholder="Tulis konten artikel di sini...\n\nGunakan **teks** untuk cetak tebal.\n\nBuat paragraf baru dengan baris kosong."
                placeholderTextColor={Colors.light.textMuted}
                textAlignVertical="top"
              />

              {/* Publish toggle */}
              <View style={styles.publishRow}>
                <View>
                  <Text style={styles.publishLabel}>Status Publikasi</Text>
                  <Text style={styles.publishSub}>
                    {form.isPublished
                      ? "Akan tampil di aplikasi"
                      : "Tersimpan sebagai draft"}
                  </Text>
                </View>
                <Switch
                  value={!!form.isPublished}
                  onValueChange={(v) => setF("isPublished")(v)}
                  trackColor={{
                    false: Colors.light.borderLight,
                    true: Colors.light.primaryLight,
                  }}
                  thumbColor={
                    form.isPublished
                      ? Colors.light.primary
                      : Colors.light.textMuted
                  }
                />
              </View>

              <Button
                label={
                  modalMode === "add" ? "Simpan Artikel" : "Update Artikel"
                }
                onPress={handleSave}
                loading={saving}
                size="lg"
                fullWidth
                icon="checkmark-circle"
                style={{ marginTop: 8 }}
              />
            </ScrollView>
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

  list: { padding: Spacing.md, gap: 12, paddingBottom: 40 },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    ...Shadow.md,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  cardImg: { width: 90, height: 120 },
  cardBody: { flex: 1, padding: 10 },
  cardTop: { flexDirection: "row", gap: 6, marginBottom: 5, flexWrap: "wrap" },
  katPill: {
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  katText: {
    fontSize: 9,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.bold,
    letterSpacing: 0.5,
  },
  pubPill: {
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pubText: { fontSize: 9, fontFamily: Typography.fontFamily.bold },
  cardJudul: {
    fontSize: Typography.size.sm,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    lineHeight: 17,
    marginBottom: 3,
  },
  cardPenulis: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 8,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editBtnText: {
    fontSize: 10,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.light.errorLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteBtnText: {
    fontSize: 10,
    color: Colors.light.error,
    fontFamily: Typography.fontFamily.semiBold,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginLeft: "auto" as any,
  },
  switchLabel: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
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
    maxHeight: "92%",
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
  katRow: { flexDirection: "row", gap: 8, marginBottom: 16, flexWrap: "wrap" },
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

  textArea: {
    borderWidth: 1.5,
    borderColor: Colors.light.borderLight,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.backgroundSoft,
    padding: 12,
    fontSize: Typography.size.base,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.regular,
    minHeight: 140,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  publishRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.backgroundSoft,
    borderRadius: BorderRadius.md,
    padding: 14,
    marginBottom: 8,
  },
  publishLabel: {
    fontSize: Typography.size.md,
    fontWeight: "600",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.semiBold,
  },
  publishSub: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 2,
  },
});
