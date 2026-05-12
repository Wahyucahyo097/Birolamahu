import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function AuthIndex() {
  useEffect(() => {
    router.replace("/(auth)/login");
  }, []);

  return <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
}
