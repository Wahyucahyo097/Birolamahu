import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/theme";
import { BorderRadius, Spacing, Typography } from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { isValidIndonesianPhone } from "@/utils/whatsapp";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const { setPhone } = useUserStore();
  const [phone, setPhoneLocal] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    const clean = phone.trim();
    if (!clean) {
      setError("Nomor HP tidak boleh kosong");
      return;
    }
    if (!isValidIndonesianPhone(clean)) {
      setError("Format nomor HP tidak valid (contoh: 081234567890)");
      return;
    }
    setError("");
    setPhone(clean);
    router.push("/(auth)/otp");
  };

  const handleAdminLogin = () => {
    router.push("/(auth)/admin-login" as any);
  };

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
        {/* ── Header Hijau ── */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="moon" size={28} color={Colors.light.accent} />
          </View>
          <Text style={styles.appName}>LAMAHU TOUR</Text>
          <Text style={styles.tagline}>Haji & Umrah</Text>
        </View>

        {/* ── Form Card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Selamat Datang 👋</Text>
          <Text style={styles.cardSubtitle}>
            Masukkan nomor HP Anda untuk mendapatkan kode OTP
          </Text>

          <View style={styles.flagRow}>
            <View style={styles.flag}>
              <Text style={styles.flagText}>🇮🇩 +62</Text>
            </View>
            <View style={styles.phoneInputWrap}>
              <Input
                placeholder="8xx xxxx xxxx"
                value={phone}
                onChangeText={(v) => {
                  setPhoneLocal(v);
                  setError("");
                }}
                keyboardType="phone-pad"
                maxLength={13}
                error={error}
                icon="call-outline"
                style={styles.phoneInput}
              />
            </View>
          </View>

          <Button
            label="Kirim Kode OTP"
            onPress={handleNext}
            size="lg"
            fullWidth
            icon="arrow-forward"
            iconPosition="right"
            style={styles.btn}
          />

          <Text style={styles.disclaimer}>
            Dengan melanjutkan, Anda menyetujui{" "}
            <Text style={styles.link}>Syarat & Ketentuan</Text> dan{" "}
            <Text style={styles.link}>Kebijakan Privasi</Text> kami.
          </Text>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Akreditasi A Sucofindo · Izin Kemenag No. 1082/2021
          </Text>
          <TouchableOpacity onPress={handleAdminLogin} style={styles.adminBtn}>
            <Ionicons
              name="settings-outline"
              size={12}
              color={Colors.light.textMuted}
            />
            <Text style={styles.adminText}>Masuk sebagai Admin</Text>
          </TouchableOpacity>
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
    paddingTop: 80,
    paddingBottom: 48,
    backgroundColor: Colors.light.primary,
  },
  logoCircle: {
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
  appName: {
    fontSize: Typography.size["3xl"],
    fontWeight: "900",
    color: Colors.light.white,
    letterSpacing: 2,
    fontFamily: Typography.fontFamily.extraBold,
  },
  tagline: {
    fontSize: Typography.size.md,
    color: Colors.light.accent,
    fontFamily: Typography.fontFamily.medium,
    marginTop: 2,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.lg,
    paddingTop: 32,
  },
  cardTitle: {
    fontSize: Typography.size["3xl"],
    fontWeight: "800",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.extraBold,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: Typography.size.base,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 21,
    marginBottom: 28,
  },

  flagRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 4,
  },
  flag: {
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: Colors.light.borderLight,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.backgroundSoft,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  flagText: {
    fontSize: Typography.size.md,
    fontFamily: Typography.fontFamily.semiBold,
  },
  phoneInputWrap: { flex: 1 },
  phoneInput: { marginBottom: 0 },

  btn: { marginTop: 8 },

  disclaimer: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    textAlign: "center",
    lineHeight: 17,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 16,
  },
  link: {
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.semiBold,
  },

  footer: {
    backgroundColor: Colors.light.white,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 32,
    paddingTop: 8,
    alignItems: "center",
    gap: 10,
  },
  footerText: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    textAlign: "center",
  },
  adminBtn: { flexDirection: "row", alignItems: "center", gap: 4, padding: 8 },
  adminText: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },
});
