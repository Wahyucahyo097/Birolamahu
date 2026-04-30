import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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

// State paket dikelola local (di production: gunakan API / Supabase)
const usePaketStore = () => {
  const [pakets, setPakets] = useState<PaketUmroh[]>(PAKET_DATA);

  const addPaket = (p: PaketUmroh) => setPakets((prev) => [p, ...prev]);
  const updatePaket = (p: PaketUmroh) =>
    setPakets((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  const deletePaket = (id: string) =>
    setPakets((prev) => prev.filter((x) => x.id !== id));
  const toggleActive = (id: string) =>
    setPakets((prev) =>
      prev.map((x) => (x.id === id ? { ...x, isActive: !x.isActive } : x)),
    );

  return { pakets, addPaket, updatePaket, deletePaket, toggleActive };
};

// ── Form defaults ──
const emptyForm = (): Partial<PaketUmroh> => ({
  nama: "",
  jenis: "umrah-reguler",
  harga: 0,
  hargaDeposit: 2_500_000,
  durasi: 9,
  bintangHotel: 5,
  maskapai: "Garuda Indonesia",
  kotaKeberangkatan: "Jakarta / Gorontalo",
  imageUrl:
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
  deskripsi: "",
  kuota: 45,
  tersisa: 45,
  isActive: true,
  fasilitas: [],
  itinerary: [],
  badge: "",
});

export default function KelolapaketScreen() {
  const { pakets, addPaket, updatePaket, deletePaket, toggleActive } =
    usePaketStore();
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<PaketUmroh>>(emptyForm());
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setForm(emptyForm());
    setModalMode("add");
  };
  const openEdit = (p: PaketUmroh) => {
    setForm(p);
    setModalMode("edit");
  };

  const handleDelete = (p: PaketUmroh) => {
    Alert.alert("Hapus Paket", `Yakin hapus "${p.nama}"?`, [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: () => deletePaket(p.id) },
    ]);
  };

  const handleSave = async () => {
    if (!form.nama?.trim()) {
      Alert.alert("Error", "Nama paket tidak boleh kosong");
      return;
    }
    if (!form.harga || form.harga <= 0) {
      Alert.alert("Error", "Harga harus diisi");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600)); // Simulasi API call
    if (modalMode === "add") {
      addPaket({
        ...emptyForm(),
        ...form,
        id: `pkt-${Date.now()}`,
      } as PaketUmroh);
    } else {
      updatePaket(form as PaketUmroh);
    }
    setSaving(false);
    setModalMode(null);
  };

  const setF = (key: keyof PaketUmroh) => (val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kelola Paket</Text>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Ionicons name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.countText}>{pakets.length} paket terdaftar</Text>
        {pakets.map((p) => (
          <View key={p.id} style={styles.card}>
            <Image source={{ uri: p.imageUrl }} style={styles.cardImg} />
            <View style={styles.cardBody}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardNama} numberOfLines={1}>
                  {p.nama}
                </Text>
                <View
                  style={[
                    styles.activeDot,
                    {
                      backgroundColor: p.isActive
                        ? Colors.light.success
                        : Colors.light.error,
                    },
                  ]}
                />
              </View>
              <Text style={styles.cardHarga}>{formatRupiah(p.harga)}</Text>
              <View style={styles.cardMeta}>
                <Text style={styles.metaChip}>{p.durasi} Hari</Text>
                <Text style={styles.metaChip}>⭐ {p.bintangHotel}</Text>
                <Text style={styles.metaChip}>
                  {p.tersisa}/{p.kuota} kursi
                </Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => openEdit(p)}
                >
                  <Ionicons
                    name="create-outline"
                    size={14}
                    color={Colors.light.primary}
                  />
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(p)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={14}
                    color={Colors.light.error}
                  />
                  <Text style={styles.deleteBtnText}>Hapus</Text>
                </TouchableOpacity>
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>
                    {p.isActive ? "Aktif" : "Nonaktif"}
                  </Text>
                  <Switch
                    value={p.isActive}
                    onValueChange={() => toggleActive(p.id)}
                    trackColor={{
                      false: Colors.light.borderLight,
                      true: Colors.light.primaryLight,
                    }}
                    thumbColor={
                      p.isActive ? Colors.light.primary : Colors.light.textMuted
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
                {modalMode === "add" ? "Tambah Paket" : "Edit Paket"}
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
                label="Nama Paket"
                value={form.nama ?? ""}
                onChangeText={setF("nama")}
                icon="briefcase-outline"
                required
                placeholder="Contoh: Umroh Spesial Musim Semi"
              />
              <Input
                label="Harga (Rp)"
                value={form.harga ? String(form.harga) : ""}
                onChangeText={(v) =>
                  setF("harga")(Number(v.replace(/\D/g, "")))
                }
                keyboardType="numeric"
                icon="cash-outline"
                required
                placeholder="35500000"
              />
              <Input
                label="Harga Deposit (Rp)"
                value={form.hargaDeposit ? String(form.hargaDeposit) : ""}
                onChangeText={(v) =>
                  setF("hargaDeposit")(Number(v.replace(/\D/g, "")))
                }
                keyboardType="numeric"
                icon="wallet-outline"
                required
              />
              <Input
                label="Durasi (Hari)"
                value={form.durasi ? String(form.durasi) : ""}
                onChangeText={(v) => setF("durasi")(Number(v))}
                keyboardType="numeric"
                icon="time-outline"
                required
              />
              <Input
                label="Bintang Hotel"
                value={form.bintangHotel ? String(form.bintangHotel) : ""}
                onChangeText={(v) => setF("bintangHotel")(Number(v))}
                keyboardType="numeric"
                icon="star-outline"
              />
              <Input
                label="Maskapai"
                value={form.maskapai ?? ""}
                onChangeText={setF("maskapai")}
                icon="airplane-outline"
              />
              <Input
                label="Kota Keberangkatan"
                value={form.kotaKeberangkatan ?? ""}
                onChangeText={setF("kotaKeberangkatan")}
                icon="location-outline"
              />
              <Input
                label="URL Gambar"
                value={form.imageUrl ?? ""}
                onChangeText={setF("imageUrl")}
                icon="image-outline"
              />
              <Input
                label="Badge (opsional)"
                value={form.badge ?? ""}
                onChangeText={setF("badge")}
                icon="pricetag-outline"
                placeholder="Paling Populer"
              />
              <Input
                label="Kuota Total"
                value={form.kuota ? String(form.kuota) : ""}
                onChangeText={(v) => setF("kuota")(Number(v))}
                keyboardType="numeric"
                icon="people-outline"
              />
              <Input
                label="Sisa Kuota"
                value={form.tersisa ? String(form.tersisa) : ""}
                onChangeText={(v) => setF("tersisa")(Number(v))}
                keyboardType="numeric"
                icon="people-circle-outline"
              />
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Deskripsi</Text>
                <TextInput
                  style={styles.textArea}
                  value={form.deskripsi ?? ""}
                  onChangeText={setF("deskripsi")}
                  multiline
                  numberOfLines={4}
                  placeholder="Deskripsi lengkap paket..."
                  placeholderTextColor={Colors.light.textMuted}
                />
              </View>
              <Button
                label={modalMode === "add" ? "Simpan Paket" : "Update Paket"}
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
  list: { padding: Spacing.md, paddingBottom: 40, gap: 12 },
  countText: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 4,
  },

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
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  cardNama: {
    flex: 1,
    fontSize: Typography.size.sm,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
  },
  activeDot: { width: 8, height: 8, borderRadius: 4 },
  cardHarga: {
    fontSize: Typography.size.md,
    fontWeight: "800",
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.extraBold,
    marginBottom: 6,
  },
  cardMeta: { flexDirection: "row", gap: 6, marginBottom: 8, flexWrap: "wrap" },
  metaChip: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    backgroundColor: Colors.light.backgroundMuted,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  editBtnText: {
    fontSize: 11,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.light.errorLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  deleteBtnText: {
    fontSize: 11,
    color: Colors.light.error,
    fontFamily: Typography.fontFamily.semiBold,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: "auto" as any,
  },
  switchLabel: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },

  // Modal
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
  formField: { marginBottom: 16 },
  formLabel: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.light.text,
    marginBottom: 6,
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
    minHeight: 90,
    textAlignVertical: "top",
  },
});
