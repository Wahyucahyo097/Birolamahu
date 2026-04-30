import { Colors } from "@/constants/theme";
import { BorderRadius, Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
  onRightIconPress?: () => void;
  required?: boolean;
}

export default function Input({
  label,
  error,
  hint,
  icon,
  rightIcon,
  onRightIconPress,
  required,
  secureTextEntry,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;
  const secure = isPassword && !showPassword;

  const borderColor = error
    ? Colors.light.error
    : focused
      ? Colors.light.primary
      : Colors.light.borderLight;

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={[styles.inputRow, { borderColor }]}>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={focused ? Colors.light.primary : Colors.light.textMuted}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          placeholderTextColor={Colors.light.textMuted}
          secureTextEntry={secure}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword((v) => !v)}
            style={styles.rightIconBtn}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={Colors.light.textMuted}
            />
          </TouchableOpacity>
        )}

        {rightIcon && !isPassword && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconBtn}
          >
            <Ionicons
              name={rightIcon}
              size={18}
              color={Colors.light.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.light.text,
    marginBottom: 6,
  },
  required: { color: Colors.light.error },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.backgroundSoft,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  leftIcon: { marginRight: 8 },
  input: {
    flex: 1,
    fontSize: Typography.size.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.light.text,
    paddingVertical: 10,
  },
  inputWithIcon: { paddingLeft: 0 },
  rightIconBtn: { padding: 4 },
  error: {
    fontSize: Typography.size.xs,
    color: Colors.light.error,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 4,
  },
  hint: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 4,
  },
});
