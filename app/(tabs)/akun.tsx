import Button, { isValidIndonesia } from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import {
    BorderRadius,
    Shadow,
    Spacing,
    Typography,
} from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { openWhatsApp } from "@/utils/whatsapp";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/ui/Input";

export default function AkunScreen() {
  const { state, logout, updateProfile } = useUserStore();
  const user = state.user;
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    nama: user?.nama ?? "",
    nomorWA: user?.nomorWA ?? "",
    asalDaerah: user?.asalDaerah ?? "",
  });
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    console.log("DEBUG: handleLogout invoked");

    const confirmLogout = async () => {
      console.log("DEBUG: state before logout", state);
      const success = await logout();
      console.log("DEBUG: logout result", success);
      // pastikan navigasi ke login tetap dilakukan meskipun ada masalah
      setTimeout(() => router.replace("/(auth)/login"), 50);
    };

    if (Platform.OS === "web") {
      const ok = window.confirm("Yakin ingin keluar dari akun ini?");
      if (ok) confirmLogout();
      return;
    }

    Alert.alert("Keluar", "Yakin ingin keluar dari akun ini?", [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", style: "destructive", onPress: () => confirmLogout() },
    ]);
  };

  const handleKonsultasi = async () => {
    await openWhatsApp({
      namaUser: user.nama,
      asalUser: user.asalDaerah,
      nomorWA: user.nomorWA,
    });
  };

  const handleSaveEdit = async () => {
    const errs: Record<string, string> = {};
    if (!editForm.nama.trim() || editForm.nama.trim().length < 2)
      errs.nama = "Nama minimal 2 karakter";
    if (!isValidIndonesia(editForm.nomorWA))
      errs.nomorWA = "Format nomor WA tidak valid";
    if (!editForm.asalDaerah.trim())
      errs.asalDaerah = "Asal daerah tidak boleh kosong";
    if (Object.keys(errs).length > 0) {
      setEditErrors(errs);
      return;
    }
    setSaving(true);
    await updateProfile({
      nama: editForm.nama.trim(),
      nomorWA: editForm.nomorWA.trim(),
      asalDaerah: editForm.asalDaerah.trim(),
    });
    setSaving(false);
    setEditModal(false);
    setEditErrors({});
  };

  const MENU = [
    {
      icon: "create-outline",
      label: "Edit Profil",
      onPress: () => setEditModal(true),
    },
    {
      icon: "logo-whatsapp",
      label: "Konsultasi via WA",
      onPress: handleKonsultasi,
      color: "#25D366",
    },
    { icon: "help-circle-outline", label: "Bantuan & FAQ", onPress: () => {} },
    {
      icon: "document-text-outline",
      label: "Syarat & Ketentuan",
      onPress: () => {},
    },
    {
      icon: "shield-checkmark-outline",
      label: "Kebijakan Privasi",
      onPress: () => {},
    },
    {
      icon: "log-out-outline",
      label: "Keluar",
      onPress: handleLogout,
      color: Colors.light.error,
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.light.primary}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ── Profile Header ── */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>
                {user.nama.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>{user.nama}</Text>
          <Text style={styles.userPhone}>{user.nomorWA}</Text>
          <View style={styles.asalPill}>
            <Ionicons name="location" size={12} color={Colors.light.accent} />
            <Text style={styles.asalText}>{user.asalDaerah}</Text>
          </View>
          <View style={styles.memberBadge}>
            <Ionicons name="star" size={11} color={Colors.light.accent} />
            <Text style={styles.memberText}>Member Lamahu Tour</Text>
          </View>
        </View>

        {/* ── Data Saya ── */}
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Data Saya</Text>
          <Text style={styles.dataNote}>
            📋 Data ini akan dikirim otomatis saat konsultasi via WhatsApp
          </Text>
          {[
            { icon: "person-outline", label: "Nama Lengkap", value: user.nama },
            {
              icon: "logo-whatsapp",
              label: "Nomor WhatsApp",
              value: user.nomorWA,
            },
            {
              icon: "location-outline",
              label: "Asal Daerah",
              value: user.asalDaerah,
            },
          ].map((row, i) => (
            <View
              key={i}
              style={[styles.dataRow, i < 2 && styles.dataRowBorder]}
            >
              <View style={styles.dataIcon}>
                <Ionicons
                  name={row.icon as any}
                  size={16}
                  color={Colors.light.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.dataLabel}>{row.label}</Text>
                <Text style={styles.dataValue}>{row.value}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.editDataBtn}
            onPress={() => setEditModal(true)}
          >
            <Ionicons
              name="create-outline"
              size={14}
              color={Colors.light.primary}
            />
            <Text style={styles.editDataText}>Ubah Data</Text>
          </TouchableOpacity>
        </View>

        {/* ── Konsultasi CTA ── */}
        <TouchableOpacity
          style={styles.waCard}
          onPress={handleKonsultasi}
          activeOpacity={0.85}
        >
          <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
          <View style={{ flex: 1 }}>
            <Text style={styles.waTitle}>Konsultasi Gratis via WhatsApp</Text>
            <Text style={styles.waSub}>
              Tim kami siap membantu pilihkan paket terbaik untuk Anda
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={Colors.light.textMuted}
          />
        </TouchableOpacity>

        {/* ── Menu ── */}
        <View style={styles.menuCard}>
          {MENU.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.menuItem,
                i < MENU.length - 1 && styles.menuBorder,
              ]}
              onPress={item.onPress}
            >
              <View
                style={[
                  styles.menuIcon,
                  item.color === Colors.light.error && styles.menuIconDanger,
                  item.color === "#25D366" && styles.menuIconWA,
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={item.color ?? Colors.light.primary}
                />
              </View>
              <Text
                style={[styles.menuLabel, item.color && { color: item.color }]}
              >
                {item.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.light.borderLight}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>
          Lamahu Tour v1.0.0 · Akreditasi A Sucofindo
        </Text>
      </ScrollView>

      {/* ── MODAL EDIT PROFIL ── */}
      <Modal
        visible={editModal}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profil</Text>
              <TouchableOpacity onPress={() => setEditModal(false)}>
                <Ionicons name="close" size={22} color={Colors.light.text} />
              </TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Input
                label="Nama Lengkap"
                value={editForm.nama}
                onChangeText={(v) => setEditForm((f) => ({ ...f, nama: v }))}
                error={editErrors.nama}
                icon="person-outline"
                autoCapitalize="words"
                required
              />
              <Input
                label="Nomor WhatsApp"
                value={editForm.nomorWA}
                onChangeText={(v) => setEditForm((f) => ({ ...f, nomorWA: v }))}
                error={editErrors.nomorWA}
                icon="logo-whatsapp"
                keyboardType="phone-pad"
                required
              />
              <Input
                label="Asal Daerah"
                value={editForm.asalDaerah}
                onChangeText={(v) =>
                  setEditForm((f) => ({ ...f, asalDaerah: v }))
                }
                error={editErrors.asalDaerah}
                icon="location-outline"
                autoCapitalize="words"
                required
              />
              <Button
                label="Simpan Perubahan"
                onPress={handleSaveEdit}
                loading={saving}
                size="lg"
                fullWidth
                icon="checkmark-circle"
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
  scroll: { paddingBottom: 36 },

  profileHeader: {
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: Spacing.md,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
    ...Shadow.lg,
  },
  avatarWrap: { marginBottom: 12 },
  avatarCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: Colors.light.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.32)",
  },
  avatarInitial: {
    fontSize: Typography.size["4xl"],
    fontWeight: "900",
    color: "#FFF",
    fontFamily: Typography.fontFamily.extraBold,
  },
  userName: {
    fontSize: Typography.size.xl,
    fontWeight: "700",
    color: "#FFF",
    fontFamily: Typography.fontFamily.bold,
  },
  userPhone: {
    fontSize: Typography.size.sm,
    color: "rgba(255,255,255,0.7)",
    fontFamily: Typography.fontFamily.regular,
    marginTop: 2,
  },
  asalPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
  },
  asalText: {
    fontSize: Typography.size.sm,
    color: "#FFF",
    fontFamily: Typography.fontFamily.medium,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(184,134,11,0.4)",
    marginTop: 8,
  },
  memberText: {
    fontSize: Typography.size.xs,
    color: Colors.light.accent,
    fontFamily: Typography.fontFamily.semiBold,
  },

  // Data card
  dataCard: {
    backgroundColor: "#FFF",
    margin: Spacing.md,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
    borderWidth: 0,
    marginTop: -26,
  },
  dataTitle: {
    fontSize: Typography.size.md,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 6,
  },
  dataNote: {
    fontSize: Typography.size.xs,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.regular,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.sm,
    padding: 8,
    marginBottom: 12,
    lineHeight: 16,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  dataRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderLight,
  },
  dataIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  dataLabel: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },
  dataValue: {
    fontSize: Typography.size.base,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.semiBold,
    marginTop: 1,
  },
  editDataBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 12,
    alignSelf: "flex-end",
  },
  editDataText: {
    fontSize: Typography.size.sm,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },

  // WA card
  waCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFF",
    marginHorizontal: Spacing.md,
    marginBottom: 14,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
    borderWidth: 0,
  },
  waTitle: {
    fontSize: Typography.size.base,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
  },
  waSub: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 2,
  },

  // Menu
  menuCard: {
    backgroundColor: "#FFF",
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    ...Shadow.sm,
    borderWidth: 0,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: 16,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderLight,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconDanger: { backgroundColor: Colors.light.errorLight },
  menuIconWA: { backgroundColor: "#D1FAE5" },
  menuLabel: {
    flex: 1,
    fontSize: Typography.size.md,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.semiBold,
  },

  version: {
    textAlign: "center",
    fontSize: Typography.size.xs,
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
    maxHeight: "88%",
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
});
