import React from "react";
import { View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScreenLayout({
  children,
  showBackgroundCircles = true,
  backgroundColor,
  statusBarStyle,
  style,
}) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    return isDark ? "#0A0A0A" : "#F8F9FA";
  };

  const getStatusBarStyle = () => {
    if (statusBarStyle) return statusBarStyle;
    return isDark ? "light" : "dark";
  };

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: getBackgroundColor(),
        },
        style,
      ]}
    >
      <StatusBar style={getStatusBarStyle()} />

      {showBackgroundCircles && (
        <>
          <View
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 160,
              height: 160,
              borderRadius: 80,
              backgroundColor: isDark
                ? "rgba(0, 255, 136, 0.1)"
                : "rgba(0, 255, 136, 0.05)",
              opacity: 0.6,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -100,
              left: -100,
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: isDark
                ? "rgba(0, 255, 136, 0.08)"
                : "rgba(0, 255, 136, 0.03)",
              opacity: 0.4,
            }}
          />
        </>
      )}

      <View style={{ flex: 1, paddingTop: insets.top }}>{children}</View>
    </View>
  );
}
