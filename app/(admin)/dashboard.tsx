import { BERITA_DATA, GALERI_DATA, PAKET_DATA } from "@/constants/Data";
import { Colors } from "@/constants/theme";
import {
    BorderRadius,
    Shadow,
    Spacing,
    Typography,
} from "@/constants/Typography";
import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STATS = [
  {
    label: "Total Paket",
    value: String(PAKET_DATA.length),
    icon: "grid",
    color: Colors.light.primary,
  },
  {
    label: "Total Galeri",
    value: String(GALERI_DATA.length),
    icon: "images",
    color: "#8B5CF6",
  },
  {
    label: "Total Berita",
    value: String(BERITA_DATA.length),
    icon: "newspaper",
    color: "#F59E0B",
  },
  {
    label: "Total Kuota",
    value: String(PAKET_DATA.reduce((a, b) => a + b.kuota, 0)),
    icon: "people",
    color: "#10B981",
  },
];

const MENU_ITEMS = [
  {
    icon: "grid-outline",
    label: "Kelola Paket",
    sub: "Tambah, edit, hapus paket",
    route: "/(admin)/kelola-paket",
  },
  {
    icon: "images-outline",
    label: "Kelola Galeri",
    sub: "Upload & kelola foto",
    route: "/(admin)/kelola-galeri",
  },
  {
    icon: "newspaper-outline",
    label: "Kelola Berita",
    sub: "Tulis & kelola artikel",
    route: "/(admin)/kelola-berita",
  },
];

export default function AdminDashboard() {
  const { state, logout } = useUserStore();

  const handleLogout = () => {
    Alert.alert("Keluar", "Yakin ingin keluar dari panel admin?", [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#064E3B" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>Admin Panel 🛡️</Text>
            <Text style={styles.headerName}>{state.user?.nama}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color={Colors.light.accent}
            />
          </TouchableOpacity>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsGrid}>
          {STATS.map((s, i) => (
            <View
              key={i}
              style={[styles.statCard, { borderLeftColor: s.color }]}
            >
              <View
                style={[styles.statIcon, { backgroundColor: s.color + "18" }]}
              >
                <Ionicons name={s.icon as any} size={20} color={s.color} />
              </View>
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Quick Actions ── */}
        <Text style={styles.sectionTitle}>Kelola Konten</Text>
        {MENU_ITEMS.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.menuCard}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.82}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name={item.icon as any}
                size={22}
                color={Colors.light.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuSub}>{item.sub}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.light.borderLight}
            />
          </TouchableOpacity>
        ))}

        {/* ── Paket summary ── */}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>
          Status Paket
        </Text>
        {PAKET_DATA.map((p) => (
          <View key={p.id} style={styles.paketRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.paketNama} numberOfLines={1}>
                {p.nama}
              </Text>
              <View style={styles.kuotaBarBg}>
                <View
                  style={[
                    styles.kuotaBar,
                    {
                      width:
                        `${Math.round((p.tersisa / p.kuota) * 100)}%` as any,
                      backgroundColor:
                        p.tersisa <= 5
                          ? Colors.light.error
                          : Colors.light.primary,
                    },
                  ]}
                />
              </View>
              <Text style={styles.kuotaText}>
                {p.tersisa}/{p.kuota} kursi tersisa
              </Text>
            </View>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: p.isActive
                    ? Colors.light.success
                    : Colors.light.error,
                },
              ]}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.backgroundSoft },
  scroll: { padding: Spacing.md, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.primaryDark,
    margin: -Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerGreeting: {
    fontSize: Typography.size.sm,
    color: "rgba(255,255,255,0.7)",
    fontFamily: Typography.fontFamily.regular,
  },
  headerName: {
    fontSize: Typography.size.xl,
    fontWeight: "800",
    color: "#FFF",
    fontFamily: Typography.fontFamily.extraBold,
  },
  logoutBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    width: "47.5%",
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.md,
    padding: 14,
    gap: 6,
    borderLeftWidth: 3,
    ...Shadow.sm,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  statVal: {
    fontSize: Typography.size["3xl"],
    fontWeight: "800",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.extraBold,
  },
  statLabel: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },

  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 10,
  },

  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: 10,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: Typography.size.md,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
  },
  menuSub: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 2,
  },

  paketRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF",
    borderRadius: BorderRadius.md,
    padding: 12,
    marginBottom: 8,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  paketNama: {
    fontSize: Typography.size.sm,
    fontWeight: "700",
    color: Colors.light.text,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 6,
  },
  kuotaBarBg: {
    height: 4,
    backgroundColor: Colors.light.borderLight,
    borderRadius: 2,
    marginBottom: 4,
  },
  kuotaBar: { height: 4, borderRadius: 2 },
  kuotaText: {
    fontSize: 10,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
  },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
});
