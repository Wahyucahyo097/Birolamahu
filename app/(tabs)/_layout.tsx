import { Colors } from "@/constants/theme";
import { Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

type TabName = "index" | "paket" | "galeri" | "berita" | "akun";

interface TabCfg {
  name: TabName;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconActive: React.ComponentProps<typeof Ionicons>["name"];
}

const TABS: TabCfg[] = [
  {
    name: "index",
    title: "Beranda",
    icon: "home-outline",
    iconActive: "home-sharp",
  },
  { name: "paket", title: "Paket", icon: "grid-outline", iconActive: "grid" },
  {
    name: "galeri",
    title: "Galeri",
    icon: "images-outline",
    iconActive: "images",
  },
  {
    name: "berita",
    title: "Berita",
    icon: "newspaper-outline",
    iconActive: "newspaper",
  },
  { name: "akun", title: "Akun", icon: "person-outline", iconActive: "person" },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.icon,
        tabBarLabelStyle: {
          fontFamily: Typography.fontFamily.semiBold,
          fontSize: 10,
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.light.borderLight,
          height: Platform.OS === "ios" ? 84 : 64,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          paddingTop: 6,
          backgroundColor: Colors.light.white,
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
      }}
    >
      {TABS.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? t.iconActive : t.icon}
                size={22}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
