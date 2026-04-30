// ═══════════════════════════════════════════════════════
// store/useUserStore.ts — State Management (Auth + Profil)
// Menggunakan React Context + AsyncStorage (tanpa library tambahan)
// ═══════════════════════════════════════════════════════

import type { AuthState, UserProfile } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ── Storage Keys ─────────────────────────────────────
const KEYS = {
  USER: "@lamahu:user",
  AUTH: "@lamahu:auth",
  PHONE: "@lamahu:phone",
} as const;

// ── Default State ─────────────────────────────────────
const DEFAULT_STATE: AuthState = {
  isLoggedIn: false,
  isProfileComplete: false,
  user: null,
  phoneNumber: "",
};

// ── Context Types ─────────────────────────────────────
interface UserStoreContext {
  state: AuthState;
  isLoading: boolean;
  // Auth
  setPhone: (phone: string) => void;
  login: (phone: string) => Promise<void>;
  logout: () => Promise<void>;
  // Profile
  saveProfile: (
    profile: Omit<UserProfile, "id" | "isProfileComplete" | "createdAt">,
  ) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  // Admin
  loginAsAdmin: (email: string, password: string) => Promise<boolean>;
}

// ── Context ───────────────────────────────────────────
const UserStoreCtx = createContext<UserStoreContext | null>(null);

// ── Provider ──────────────────────────────────────────
export function UserStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted state on boot
  useEffect(() => {
    (async () => {
      try {
        const [authRaw, userRaw] = await Promise.all([
          AsyncStorage.getItem(KEYS.AUTH),
          AsyncStorage.getItem(KEYS.USER),
        ]);
        const auth = authRaw ? JSON.parse(authRaw) : {};
        const user = userRaw ? JSON.parse(userRaw) : null;
        setState({
          isLoggedIn: !!auth.isLoggedIn,
          isProfileComplete: !!auth.isProfileComplete,
          phoneNumber: auth.phoneNumber || "",
          user,
        });
      } catch {
        // ignore parse errors, start fresh
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(
    async (next: Partial<AuthState>, user?: UserProfile | null) => {
      const merged = { ...state, ...next };
      await AsyncStorage.setItem(
        KEYS.AUTH,
        JSON.stringify({
          isLoggedIn: merged.isLoggedIn,
          isProfileComplete: merged.isProfileComplete,
          phoneNumber: merged.phoneNumber,
        }),
      );
      if (user !== undefined) {
        if (user) await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
        else await AsyncStorage.removeItem(KEYS.USER);
      }
    },
    [state],
  );

  const setPhone = useCallback((phone: string) => {
    setState((s) => ({ ...s, phoneNumber: phone }));
  }, []);

  const login = useCallback(
    async (phone: string) => {
      const next: AuthState = {
        ...state,
        isLoggedIn: true,
        phoneNumber: phone,
      };
      setState(next);
      await AsyncStorage.setItem(
        KEYS.AUTH,
        JSON.stringify({
          isLoggedIn: true,
          isProfileComplete: state.isProfileComplete,
          phoneNumber: phone,
        }),
      );
    },
    [state],
  );

  const logout = useCallback(async () => {
    setState(DEFAULT_STATE);
    await Promise.all([
      AsyncStorage.removeItem(KEYS.AUTH),
      AsyncStorage.removeItem(KEYS.USER),
    ]);
  }, []);

  const saveProfile = useCallback(
    async (
      profile: Omit<UserProfile, "id" | "isProfileComplete" | "createdAt">,
    ) => {
      const user: UserProfile = {
        ...profile,
        id: `user_${Date.now()}`,
        isProfileComplete: true,
        createdAt: new Date().toISOString(),
      };
      const next = { ...state, isProfileComplete: true, user };
      setState(next);
      await Promise.all([
        AsyncStorage.setItem(KEYS.USER, JSON.stringify(user)),
        AsyncStorage.setItem(
          KEYS.AUTH,
          JSON.stringify({
            isLoggedIn: true,
            isProfileComplete: true,
            phoneNumber: state.phoneNumber,
          }),
        ),
      ]);
    },
    [state],
  );

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!state.user) return;
      const updated = { ...state.user, ...updates };
      setState((s) => ({ ...s, user: updated }));
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(updated));
    },
    [state],
  );

  const loginAsAdmin = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      // Demo: hardcoded admin credentials
      const { APP_CONFIG } = await import("@/constants/Data");
      if (
        email === APP_CONFIG.adminEmail &&
        password === APP_CONFIG.adminPassword
      ) {
        const adminUser: UserProfile = {
          id: "admin_001",
          nama: "Admin Lamahu Tour",
          nomorWA: APP_CONFIG.waAdminNumber,
          asalDaerah: "Gorontalo",
          isProfileComplete: true,
          isAdmin: true,
          createdAt: new Date().toISOString(),
        };
        const next = {
          isLoggedIn: true,
          isProfileComplete: true,
          phoneNumber: "",
          user: adminUser,
        };
        setState(next);
        await AsyncStorage.setItem(
          KEYS.AUTH,
          JSON.stringify({
            isLoggedIn: true,
            isProfileComplete: true,
            phoneNumber: "",
            isAdmin: true,
          }),
        );
        await AsyncStorage.setItem(KEYS.USER, JSON.stringify(adminUser));
        return true;
      }
      return false;
    },
    [],
  );

  return React.createElement(
    UserStoreCtx.Provider,
    {
      value: {
        state,
        isLoading,
        setPhone,
        login,
        logout,
        saveProfile,
        updateProfile,
        loginAsAdmin,
      },
    },
    children,
  );
}

// ── Hook ──────────────────────────────────────────────
export function useUserStore() {
  const ctx = useContext(UserStoreCtx);
  if (!ctx)
    throw new Error("useUserStore must be used inside UserStoreProvider");
  return ctx;
}
