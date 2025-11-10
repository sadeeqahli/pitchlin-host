import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  Building2,
  Settings,
  Bell,
  Lock,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Edit3,
  MapPin,
  Phone,
  Mail,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import ScreenLayout from "@/components/ScreenLayout";
import { usePitchStore } from "@/stores/pitchStore";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { pitches, bookings, payments } = usePitchStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock user data - in real app this would come from auth context
  const userData = {
    name: "John Smith",
    email: "john.smith@pitchlink.com",
    phone: "+44 20 7123 4567",
    businessName: "Smith Football Complex",
    location: "London, UK",
  };

  // Calculate stats
  const totalRevenue = payments.reduce(
    (sum, payment) =>
      payment.status === "completed" ? sum + payment.amount : sum,
    0,
  );

  const totalBookings = bookings.length;
  const activePitches = pitches.filter(
    (pitch) => pitch.status === "available",
  ).length;

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          console.log("Sign out");
          // Handle sign out logic here
        },
      },
    ]);
  };

  const ProfileCard = () => (
    <View
      style={{
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#00FF88",
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <User size={40} color="#FFFFFF" />
        </View>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 24,
            color: isDark ? "#FFFFFF" : "#000000",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          {userData.name}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            color: isDark ? "#9CA3AF" : "#6B7280",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {userData.businessName}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => console.log("Edit profile")}
          activeOpacity={0.7}
        >
          <Edit3 size={16} color={isDark ? "#FFFFFF" : "#000000"} />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: isDark ? "#FFFFFF" : "#000000",
              marginLeft: 8,
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contact Info */}
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Mail size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 12,
            }}
          >
            {userData.email}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Phone size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 12,
            }}
          >
            {userData.phone}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MapPin size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 12,
            }}
          >
            {userData.location}
          </Text>
        </View>
      </View>
    </View>
  );

  const StatsCard = ({ label, value, icon: IconComponent, color }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 4,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: color,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <IconComponent size={20} color="#FFFFFF" />
      </View>
      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: 20,
          color: isDark ? "#FFFFFF" : "#000000",
          marginBottom: 4,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: isDark ? "#9CA3AF" : "#6B7280",
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  );

  const SettingsOption = ({
    icon: IconComponent,
    title,
    description,
    onPress,
    showArrow = true,
    color = isDark ? "#9CA3AF" : "#6B7280",
  }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <IconComponent size={20} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 2,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: isDark ? "#9CA3AF" : "#6B7280",
          }}
        >
          {description}
        </Text>
      </View>
      {showArrow && (
        <ChevronRight size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 28,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 4,
            }}
          >
            Profile
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Manage your account and settings
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Profile Card */}
          <ProfileCard />

          {/* Quick Stats */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 20,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 16,
              }}
            >
              Quick Stats
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: -4,
                marginBottom: 8,
              }}
            >
              <StatsCard
                label="Total Revenue"
                value={`£${totalRevenue}`}
                icon={Building2}
                color="#00FF88"
              />
              <StatsCard
                label="Total Bookings"
                value={totalBookings.toString()}
                icon={Building2}
                color="#3B82F6"
              />
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: -4 }}>
              <StatsCard
                label="Active Pitches"
                value={activePitches.toString()}
                icon={Building2}
                color="#F59E0B"
              />
              <StatsCard
                label="Total Pitches"
                value={pitches.length.toString()}
                icon={Building2}
                color="#8B5CF6"
              />
            </View>
          </View>

          {/* Settings Options */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 20,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 16,
              }}
            >
              Settings
            </Text>

            <SettingsOption
              icon={Settings}
              title="General Settings"
              description="App preferences and defaults"
              onPress={() => console.log("General settings")}
            />

            <SettingsOption
              icon={Bell}
              title="Notifications"
              description="Manage alerts and reminders"
              onPress={() => console.log("Notifications")}
            />

            <SettingsOption
              icon={Lock}
              title="Privacy & Security"
              description="Password and security settings"
              onPress={() => console.log("Privacy & Security")}
            />

            <SettingsOption
              icon={Building2}
              title="Business Settings"
              description="Manage your business info"
              onPress={() => console.log("Business settings")}
            />
          </View>

          {/* Support */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 20,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 16,
              }}
            >
              Support
            </Text>

            <SettingsOption
              icon={HelpCircle}
              title="Help Center"
              description="FAQs and support articles"
              onPress={() => console.log("Help center")}
            />

            <SettingsOption
              icon={FileText}
              title="Terms & Privacy"
              description="Legal documents and policies"
              onPress={() => console.log("Terms & Privacy")}
            />
          </View>

          {/* Sign Out */}
          <SettingsOption
            icon={LogOut}
            title="Sign Out"
            description="Sign out of your account"
            onPress={handleSignOut}
            showArrow={false}
            color="#EF4444"
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
