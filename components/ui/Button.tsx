import { Colors } from "@/constants/theme";
import { BorderRadius, Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const vs = VARIANT_STYLES[variant];
  const sz = SIZE_STYLES[size];
  const dis = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        sz.container,
        vs.container,
        dis && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={dis}
      activeOpacity={0.78}
    >
      {loading ? (
        <ActivityIndicator size="small" color={vs.loaderColor} />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Ionicons
              name={icon}
              size={sz.iconSize}
              color={vs.textColor}
              style={styles.iconLeft}
            />
          )}
          <Text
            style={[styles.text, sz.text, { color: vs.textColor }, textStyle]}
          >
            {label}
          </Text>
          {icon && iconPosition === "right" && (
            <Ionicons
              name={icon}
              size={sz.iconSize}
              color={vs.textColor}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

// ── Variant definitions ───────────────────────────────

const VARIANT_STYLES = {
  primary: {
    container: { backgroundColor: Colors.light.primary },
    textColor: Colors.light.white,
    loaderColor: Colors.light.white,
  },
  secondary: {
    container: { backgroundColor: Colors.light.accent },
    textColor: Colors.light.white,
    loaderColor: Colors.light.white,
  },
  outline: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: Colors.light.primary,
    },
    textColor: Colors.light.primary,
    loaderColor: Colors.light.primary,
  },
  ghost: {
    container: { backgroundColor: "transparent" },
    textColor: Colors.light.primary,
    loaderColor: Colors.light.primary,
  },
  danger: {
    container: { backgroundColor: Colors.light.error },
    textColor: Colors.light.white,
    loaderColor: Colors.light.white,
  },
  whatsapp: {
    container: { backgroundColor: "#25D366" },
    textColor: Colors.light.white,
    loaderColor: Colors.light.white,
  },
};

const SIZE_STYLES = {
  sm: {
    container: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: BorderRadius.sm,
    },
    text: { fontSize: Typography.size.sm },
    iconSize: 14,
  },
  md: {
    container: {
      paddingVertical: 13,
      paddingHorizontal: 20,
      borderRadius: BorderRadius.md,
    },
    text: { fontSize: Typography.size.md },
    iconSize: 16,
  },
  lg: {
    container: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: BorderRadius.lg,
    },
    text: { fontSize: Typography.size.lg },
    iconSize: 18,
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  text: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: "700",
  },
  iconLeft: { marginRight: 2 },
  iconRight: { marginLeft: 2 },
  disabled: { opacity: 0.5 },
  fullWidth: { width: "100%" },
});
export const isValidIndonesia = (phone: string) => {
  if (!phone) return false;
  return phone.startsWith("08") || phone.startsWith("62");
};

export const ifuon = () => {
  console.log("Fungsi contoh");
};
