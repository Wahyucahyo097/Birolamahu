import Button from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { BorderRadius, Spacing, Typography } from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const OTP_LENGTH = 6;
const DEMO_OTP = "123456";
const RESEND_SEC = 60;

export default function OtpScreen() {
  const { state, login } = useUserStore();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SEC);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError("");
    if (val && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, idx: number) => {
    if (key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Masukkan 6 digit kode OTP");
      return;
    }
    if (code !== DEMO_OTP) {
      setError(`Kode OTP salah. (Demo: gunakan ${DEMO_OTP})`);
      return;
    }
    setLoading(true);
    try {
      await login(state.phoneNumber);
      // AuthGuard akan redirect ke onboarding atau home secara otomatis
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setCountdown(RESEND_SEC);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  };

  const phone = state.phoneNumber;

  useEffect(() => {
    if (!phone) {
      router.replace("/(auth)/login");
    }
  }, [phone]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.light.primary}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.light.white} />
        </TouchableOpacity>
        <View style={styles.logoCircle}>
          <Ionicons
            name="shield-checkmark"
            size={28}
            color={Colors.light.accent}
          />
        </View>
        <Text style={styles.headerTitle}>Verifikasi OTP</Text>
        <Text style={styles.headerSub}>
          Kode dikirim ke <Text style={styles.highlight}>{phone}</Text>
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.hint}>
          💡 <Text style={styles.hintBold}>Mode Demo:</Text> Gunakan kode{" "}
          <Text style={styles.hintCode}>{DEMO_OTP}</Text>
        </Text>

        {/* OTP Input Boxes */}
        <View style={styles.otpRow}>
          {Array(OTP_LENGTH)
            .fill(null)
            .map((_, i) => (
              <TextInput
                key={i}
                ref={(r) => {
                  inputRefs.current[i] = r;
                }}
                style={[
                  styles.otpBox,
                  otp[i] ? styles.otpBoxFilled : null,
                  error ? styles.otpBoxError : null,
                ]}
                value={otp[i]}
                onChangeText={(v) => handleChange(v, i)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, i)
                }
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
              />
            ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          label="Verifikasi"
          onPress={handleVerify}
          loading={loading}
          size="lg"
          fullWidth
          icon="checkmark-circle"
          style={styles.verifyBtn}
        />

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Tidak menerima kode?</Text>
          {countdown > 0 ? (
            <Text style={styles.resendTimer}> Kirim ulang ({countdown}s)</Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}> Kirim Ulang</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.light.primary },

  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 48,
    paddingHorizontal: Spacing.md,
  },
  backBtn: {
    position: "absolute",
    left: Spacing.md,
    top: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
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
    marginBottom: 6,
  },
  headerSub: {
    fontSize: Typography.size.md,
    color: "rgba(255,255,255,0.8)",
    fontFamily: Typography.fontFamily.regular,
    textAlign: "center",
  },
  highlight: {
    color: Colors.light.accent,
    fontFamily: Typography.fontFamily.bold,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.lg,
    paddingTop: 28,
  },

  hint: {
    backgroundColor: Colors.light.accentLight,
    borderRadius: BorderRadius.md,
    padding: 12,
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 28,
    lineHeight: 19,
  },
  hintBold: { fontFamily: Typography.fontFamily.bold },
  hintCode: {
    fontFamily: Typography.fontFamily.extraBold,
    color: Colors.light.accent,
    letterSpacing: 2,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.light.borderLight,
    fontSize: Typography.size["2xl"],
    fontFamily: Typography.fontFamily.extraBold,
    color: Colors.light.text,
    backgroundColor: Colors.light.backgroundSoft,
    textAlign: "center",
  },
  otpBoxFilled: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primaryLight,
    color: Colors.light.primary,
  },
  otpBoxError: { borderColor: Colors.light.error },

  errorText: {
    fontSize: Typography.size.sm,
    color: Colors.light.error,
    fontFamily: Typography.fontFamily.medium,
    textAlign: "center",
    marginBottom: 12,
  },

  verifyBtn: { marginTop: 8 },

  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  resendLabel: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },
  resendTimer: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.medium,
  },
  resendLink: {
    fontSize: Typography.size.sm,
    color: Colors.light.primary,
    fontFamily: Typography.fontFamily.bold,
  },
});
