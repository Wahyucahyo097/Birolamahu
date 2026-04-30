import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { APP_CONFIG } from "@/constants/Data";
import { Colors } from "@/constants/theme";
import { BorderRadius, Spacing, Typography } from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AdminLoginScreen() {
  const { loginAsAdmin } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password tidak boleh kosong");
      return;
    }
    setLoading(true);
    const ok = await loginAsAdmin(email.trim(), password);
    setLoading(false);
    if (!ok) {
      Alert.alert("Login Gagal", "Email atau password salah");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.light.primaryDark}
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.light.white} />
          </TouchableOpacity>
          <View style={styles.iconCircle}>
            <Ionicons
              name="shield-half"
              size={32}
              color={Colors.light.accent}
            />
          </View>
          <Text style={styles.title}>Admin Panel</Text>
          <Text style={styles.sub}>Lamahu Tour Management</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.demoHint}>
            <Ionicons
              name="information-circle"
              size={16}
              color={Colors.light.primary}
            />
            <Text style={styles.demoText}>
              Demo — Email:{" "}
              <Text style={styles.demoBold}>{APP_CONFIG.adminEmail}</Text>
              {"\n"}
              Password:{" "}
              <Text style={styles.demoBold}>{APP_CONFIG.adminPassword}</Text>
            </Text>
          </View>

          <Input
            label="Email Admin"
            placeholder="admin@lamahugroup.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            required
          />
          <Input
            label="Password"
            placeholder="Masukkan password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed-outline"
            required
          />

          <Button
            label="Masuk sebagai Admin"
            onPress={handleLogin}
            loading={loading}
            size="lg"
            fullWidth
            icon="log-in-outline"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#064E3B" },
  scroll: { flexGrow: 1 },
  header: {
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 44,
    paddingHorizontal: Spacing.md,
  },
  backBtn: {
    position: "absolute",
    left: Spacing.md,
    top: 70,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 2,
    borderColor: Colors.light.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: Typography.size["3xl"],
    fontWeight: "800",
    color: Colors.light.white,
    fontFamily: Typography.fontFamily.extraBold,
    marginBottom: 4,
  },
  sub: {
    fontSize: Typography.size.md,
    color: "rgba(255,255,255,0.7)",
    fontFamily: Typography.fontFamily.regular,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.lg,
    paddingTop: 28,
  },
  demoHint: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: BorderRadius.md,
    padding: 12,
    marginBottom: 20,
  },
  demoText: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 20,
  },
  demoBold: {
    fontFamily: Typography.fontFamily.bold,
    color: Colors.light.primary,
  },
});
