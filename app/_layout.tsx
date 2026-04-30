import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Stack, router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { UserStoreProvider, useUserStore } from "@/store/useUserStore";

SplashScreen.preventAutoHideAsync();

// ── Inner component yang bisa akses store ─────────────
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { state, isLoading } = useUserStore();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuth = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "(onboarding)";
    const inAdmin = segments[0] === "(admin)";
    const inTabs = segments[0] === "(tabs)";

    if (!state.isLoggedIn) {
      // Belum login → paksa ke halaman login
      if (!inAuth) router.replace("/(auth)/login");
      return;
    }

    // Sudah login sebagai admin
    if (state.user?.isAdmin) {
      if (!inAdmin) router.replace("/(admin)/dashboard");
      return;
    }

    // Sudah login tapi belum isi profil
    if (!state.isProfileComplete) {
      if (!inOnboarding) router.replace("/(onboarding)/profil");
      return;
    }

    // Sudah login & profil lengkap → arahkan ke home
    if (inAuth || inOnboarding) {
      router.replace("/(tabs)");
    }
  }, [
    state.isLoggedIn,
    state.isProfileComplete,
    state.user?.isAdmin,
    isLoading,
    segments,
  ]);

  return <>{children}</>;
}

// ── Root Layout ───────────────────────────────────────
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <UserStoreProvider>
        <StatusBar style="auto" />
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Auth Group */}
            <Stack.Screen name="(auth)" />
            {/* Onboarding Group */}
            <Stack.Screen name="(onboarding)" />
            {/* Main App Tabs */}
            <Stack.Screen name="(tabs)" />
            {/* Admin Group */}
            <Stack.Screen name="(admin)" />
            {/* Detail Screens */}
            <Stack.Screen
              name="paket/[id]"
              options={{
                headerShown: true,
                title: "Detail Paket",
                headerStyle: { backgroundColor: "#065F46" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: {
                  fontFamily: "PlusJakartaSans_700Bold",
                  fontSize: 16,
                },
              }}
            />
            <Stack.Screen
              name="berita/[id]"
              options={{
                headerShown: true,
                title: "Berita",
                headerStyle: { backgroundColor: "#065F46" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: {
                  fontFamily: "PlusJakartaSans_700Bold",
                  fontSize: 16,
                },
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthGuard>
      </UserStoreProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
