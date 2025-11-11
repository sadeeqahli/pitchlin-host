import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useAuth } from "@/utils/auth/useAuth";

export default function SignUp() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { setAuth } = useAuth();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Set auth state to simulate successful signup
      setAuth({ token: "fake-jwt-token", user: { name, email } });
      router.replace("/(tabs)/dashboard");
    }, 1000);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDark ? "#000000" : "#FFFFFF" }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 20,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 32,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 8,
          }}
        >
          Create Account
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: isDark ? "#9CA3AF" : "#6B7280",
            textAlign: "center",
          }}
        >
          Sign up for a new PitchLink account
        </Text>
      </View>

      <View
        style={{
          backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
          borderRadius: 16,
          padding: 20,
          shadowColor: isDark ? "#000" : "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 8,
          }}
        >
          Full Name
        </Text>
        <TextInput
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginBottom: 20,
          }}
          placeholder="Enter your full name"
          placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 8,
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginBottom: 20,
          }}
          placeholder="Enter your email"
          placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 8,
          }}
        >
          Password
        </Text>
        <TextInput
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginBottom: 20,
          }}
          placeholder="Enter your password"
          placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 8,
          }}
        >
          Confirm Password
        </Text>
        <TextInput
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginBottom: 20,
          }}
          placeholder="Confirm your password"
          placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#00FF88",
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={handleSignUp}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#000000",
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#00FF88",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}