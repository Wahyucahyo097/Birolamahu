import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/theme";
import { BorderRadius, Spacing, Typography } from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { isValidIndonesianPhone } from "@/utils/whatsapp";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { login } = useUserStore();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const headerAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, [formAnim, footerAnim, headerAnim]);

  const validateIdentity = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Email atau Nomor HP tidak boleh kosong";
    if (trimmed.includes("@") && !EMAIL_REGEX.test(trimmed)) {
      return "Format email tidak valid";
    }
    if (!trimmed.includes("@") && !isValidIndonesianPhone(trimmed)) {
      return "Format nomor HP tidak valid (contoh: 081234567890)";
    }
    return "";
  };

  const handleLogin = async () => {
    const identityError = validateIdentity(identity);
    if (identityError) {
      setError(identityError);
      return;
    }
    if (!password.trim()) {
      setError("Kata sandi tidak boleh kosong");
      return;
    }
    if (password.trim().length < 6) {
      setError("Kata sandi minimal 6 karakter");
      return;
    }

    setError("");
    await login(identity.trim());
    router.replace("/(onboarding)/profil");
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
      <View style={styles.background}>
        <View style={styles.glowCircleLarge} />
        <View style={styles.glowCircleSmall} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.hero,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.welcomeTitle}>Selamat Datang di Lamahu Tour</Text>
          <Text style={styles.welcomeSubtitle}>
            Nikmati akses eksklusif, pengalaman berkelas, dan layanan perjalanan
            terbaik untuk Haji & Umrah Anda.
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            {
              opacity: formAnim,
              transform: [
                {
                  translateY: formAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [28, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Masuk Dengan Akun Anda</Text>
          </View>

          <Input
            label="Email / Nomor HP"
            placeholder="contoh@mail.com atau 081234567890"
            value={identity}
            onChangeText={(text) => {
              setIdentity(text);
              setError("");
            }}
            keyboardType="default"
            autoCapitalize="none"
            textContentType="username"
            icon="person-outline"
            error={error && !password ? error : undefined}
          />

          <Input
            label="Kata Sandi"
            placeholder="Masukkan kata sandi Anda"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
            secureTextEntry
            textContentType="password"
            icon="lock-closed-outline"
            error={error && password ? error : undefined}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            label="Masuk Sekarang"
            onPress={handleLogin}
            size="lg"
            fullWidth
            icon="arrow-forward"
            iconPosition="right"
            style={styles.loginButton}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.footer,
            {
              opacity: footerAnim,
              transform: [
                {
                  translateY: footerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={handleAdminLogin} style={styles.adminBtn}>
            <Ionicons
              name="settings-outline"
              size={14}
              color={Colors.light.textMuted}
            />
            <Text style={styles.adminText}>Masuk sebagai Admin</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.light.primary },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.primary,
  },
  glowCircleLarge: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(184,134,11,0.18)",
    top: -80,
    right: -80,
  },
  glowCircleSmall: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.12)",
    top: 120,
    left: -60,
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 64,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 32,
  },
  hero: {
    marginBottom: 28,
    padding: 22,
    borderRadius: BorderRadius.xl,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    overflow: "hidden",
  },
  brandBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  brandBadgeText: {
    color: Colors.light.accent,
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.semiBold,
    letterSpacing: 0.5,
  },
  welcomeTitle: {
    fontSize: Typography.size["4xl"],
    color: Colors.light.white,
    fontFamily: Typography.fontFamily.extraBold,
    lineHeight: 42,
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: Typography.size.md,
    color: "rgba(255,255,255,0.92)",
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 22,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xxl,
    backgroundColor: Colors.light.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
    elevation: 10,
    marginBottom: 24,
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: Typography.size["3xl"],
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.extraBold,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: Typography.size.base,
    color: Colors.light.textSecondary,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 20,
  },
  errorText: {
    marginBottom: 12,
    color: Colors.light.error,
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  loginButton: {
    marginTop: 8,
    backgroundColor: Colors.light.primaryMid,
    borderRadius: BorderRadius.lg,
  },
  noteText: {
    marginTop: 18,
    color: Colors.light.textSecondary,
    fontSize: Typography.size.sm,
    lineHeight: 20,
    textAlign: "center",
    fontFamily: Typography.fontFamily.regular,
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  footerText: {
    color: Colors.light.textMuted,
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.regular,
    textAlign: "center",
    marginBottom: 12,
  },
  adminBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: BorderRadius.lg,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  adminText: {
    color: Colors.light.textMuted,
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.medium,
  },
});
