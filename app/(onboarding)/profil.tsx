import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/theme";
import { BorderRadius, Spacing, Typography } from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { isValidIndonesianPhone } from "@/utils/whatsapp";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface FormState {
  nama: string;
  nomorWA: string;
  asalDaerah: string;
}

interface FormErrors {
  nama?: string;
  nomorWA?: string;
  asalDaerah?: string;
}

const DAERAH_EXAMPLES = [
  "Gorontalo",
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Makassar",
  "Medan",
  "Semarang",
  "Yogyakarta",
  "Manado",
  "Palu",
];

export default function ProfilScreen() {
  const { saveProfile } = useUserStore();
  const [form, setForm] = useState<FormState>({
    nama: "",
    nomorWA: "",
    asalDaerah: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormState) => (val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.nama.trim() || form.nama.trim().length < 2)
      errs.nama = "Nama minimal 2 karakter";
    if (!form.nomorWA.trim())
      errs.nomorWA = "Nomor WhatsApp tidak boleh kosong";
    else if (!isValidIndonesianPhone(form.nomorWA))
      errs.nomorWA = "Format nomor WA tidak valid (contoh: 081234567890)";
    if (!form.asalDaerah.trim())
      errs.asalDaerah = "Asal daerah tidak boleh kosong";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    await saveProfile({
      nama: form.nama.trim(),
      nomorWA: form.nomorWA.trim(),
      asalDaerah: form.asalDaerah.trim(),
    });
    setLoading(false);
    // AuthGuard otomatis redirect ke (tabs)/
  };

  const steps = [
    { icon: "person-outline", label: "Isi Data Diri" },
    { icon: "home-outline", label: "Jelajahi Paket" },
    { icon: "logo-whatsapp", label: "Konsultasi Langsung" },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.light.primary}
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Ionicons name="person-add" size={32} color={Colors.light.accent} />
          </View>
          <Text style={styles.headerTitle}>Lengkapi Data Diri</Text>
          <Text style={styles.headerSub}>
            Data Anda akan digunakan otomatis saat konsultasi via WhatsApp
          </Text>
        </View>

        {/* ── Alur Singkat ── */}
        <View style={styles.stepsRow}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    i === 0 && styles.stepCircleActive,
                  ]}
                >
                  <Ionicons
                    name={s.icon as any}
                    size={16}
                    color={i === 0 ? "#FFF" : Colors.light.textMuted}
                  />
                </View>
                <Text
                  style={[styles.stepLabel, i === 0 && styles.stepLabelActive]}
                >
                  {s.label}
                </Text>
              </View>
              {i < steps.length - 1 && (
                <View
                  style={[styles.stepLine, i === 0 && styles.stepLineActive]}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* ── Form ── */}
        <View style={styles.card}>
          <Input
            label="Nama Lengkap"
            placeholder="Contoh: Bapak Ahmad Fauzi"
            value={form.nama}
            onChangeText={set("nama")}
            error={errors.nama}
            icon="person-outline"
            autoCapitalize="words"
            required
          />

          <Input
            label="Nomor WhatsApp Aktif"
            placeholder="081234567890"
            value={form.nomorWA}
            onChangeText={set("nomorWA")}
            error={errors.nomorWA}
            icon="logo-whatsapp"
            keyboardType="phone-pad"
            maxLength={13}
            hint="Digunakan untuk konfirmasi & konsultasi"
            required
          />

          <Input
            label="Asal Daerah / Kota"
            placeholder="Contoh: Gorontalo"
            value={form.asalDaerah}
            onChangeText={set("asalDaerah")}
            error={errors.asalDaerah}
            icon="location-outline"
            autoCapitalize="words"
            required
          />

          {/* Daerah Quick Select */}
          <Text style={styles.quickLabel}>Pilih cepat:</Text>
          <View style={styles.quickRow}>
            {DAERAH_EXAMPLES.map((d) => (
              <Button
                key={d}
                label={d}
                onPress={() => {
                  set("asalDaerah")(d);
                }}
                variant={form.asalDaerah === d ? "primary" : "outline"}
                size="sm"
                style={styles.quickBtn}
              />
            ))}
          </View>

          {/* Info box */}
          <View style={styles.infoBox}>
            <Ionicons
              name="shield-checkmark"
              size={18}
              color={Colors.light.primary}
            />
            <Text style={styles.infoText}>
              Data Anda aman dan hanya digunakan untuk keperluan konsultasi
              perjalanan ibadah Anda.
            </Text>
          </View>

          <Button
            label="Simpan & Mulai Jelajahi"
            onPress={handleSave}
            loading={loading}
            size="lg"
            fullWidth
            icon="arrow-forward"
            iconPosition="right"
            style={styles.saveBtn}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.light.primary },
  scroll: { flexGrow: 1 },

  header: {
    alignItems: "center",
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: Spacing.md,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 2,
    borderColor: Colors.light.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: Typography.size["3xl"],
    fontWeight: "800",
    color: Colors.light.white,
    fontFamily: Typography.fontFamily.extraBold,
    marginBottom: 8,
  },
  headerSub: {
    fontSize: Typography.size.base,
    color: "rgba(255,255,255,0.78)",
    fontFamily: Typography.fontFamily.regular,
    textAlign: "center",
    lineHeight: 21,
  },

  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    marginBottom: 0,
  },
  stepItem: { alignItems: "center", gap: 4, flex: 1 },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: { backgroundColor: Colors.light.accent },
  stepLabel: {
    fontSize: 9,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    fontFamily: Typography.fontFamily.medium,
  },
  stepLabelActive: {
    color: Colors.light.white,
    fontFamily: Typography.fontFamily.bold,
  },
  stepLine: { height: 2, flex: 0.4, backgroundColor: "rgba(255,255,255,0.2)" },
  stepLineActive: { backgroundColor: Colors.light.accent },

  card: {
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.lg,
    paddingTop: 28,
    marginTop: 20,
  },

  quickLabel: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
    marginBottom: 8,
  },
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  quickBtn: {},

  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.md,
    padding: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 18,
  },

  saveBtn: {},
});
