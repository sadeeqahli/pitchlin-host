import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Plus,
  Grid3X3,
  List,
  Building2,
  MapPin,
  DollarSign,
  Edit3,
  Trash2,
  Circle,
  CheckCircle,
  Clock,
  BarChart3,
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

export default function Pitches() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const { pitches, deletePitch, updatePitch } = usePitchStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "available":
        return <CheckCircle size={16} color="#00FF88" />;
      case "booked":
        return <Circle size={16} color="#F59E0B" />;
      case "maintenance":
        return <Clock size={16} color="#EF4444" />;
      default:
        return <Circle size={16} color="#9CA3AF" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "#00FF88";
      case "booked":
        return "#F59E0B";
      case "maintenance":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  const handleDeletePitch = (id, name) => {
    Alert.alert("Delete Pitch", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deletePitch(id) },
    ]);
  };

  const handleToggleStatus = (pitch) => {
    const newStatus = pitch.status === "available" ? "inactive" : "available";
    updatePitch(pitch.id, { status: newStatus });
  };

  const PitchCard = ({ pitch }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Pitch Image Placeholder */}
      <View
        style={{
          height: 120,
          backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
          borderRadius: 12,
          marginBottom: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Building2 size={40} color={isDark ? "#6B7280" : "#9CA3AF"} />
      </View>

      {/* Pitch Details */}
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 4,
          }}
        >
          {pitch.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <MapPin size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 4,
            }}
          >
            {pitch.location}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DollarSign size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 4,
            }}
          >
            ₦{pitch.hourlyRate}/hour
          </Text>
        </View>
      </View>

      {/* Status Toggle */}
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: pitch.status === "available" ? "#00FF88" : isDark ? "#2C2C2C" : "#F3F4F6",
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 12,
            flex: 1,
            marginRight: 8,
            justifyContent: "center",
          }}
          onPress={() => handleToggleStatus(pitch)}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: pitch.status === "available" ? "#000000" : isDark ? "#FFFFFF" : "#000000",
            }}
          >
            {pitch.status === "available" ? "Active" : "Inactive"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#00FF88",
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 12,
            flex: 1,
            marginRight: 8,
            justifyContent: "center",
          }}
          onPress={() => console.log("Edit pitch:", pitch.id)}
          activeOpacity={0.8}
        >
          <Edit3 size={16} color="#000000" />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: "#000000",
              marginLeft: 6,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#3B82F6",
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 12,
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => console.log("View analytics for pitch:", pitch.id)}
          activeOpacity={0.8}
        >
          <BarChart3 size={16} color="#FFFFFF" />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: "#FFFFFF",
              marginLeft: 6,
            }}
          >
            Analytics
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Calculate stats
  const activePitches = pitches.filter(pitch => pitch.status === "available").length;
  const totalPitches = pitches.length;

  return (
    <ScreenLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 28,
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 4,
              }}
            >
              Pitches
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: isDark ? "#9CA3AF" : "#6B7280",
              }}
            >
              Manage your facilities
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24, flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              flex: 1,
              marginRight: 8,
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
                marginBottom: 4,
              }}
            >
              Active Pitches
            </Text>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 24,
                color: "#00FF88",
              }}
            >
              {activePitches}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              flex: 1,
              marginLeft: 8,
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
                marginBottom: 4,
              }}
            >
              Total Pitches
            </Text>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 24,
                color: "#3B82F6",
              }}
            >
              {totalPitches}
            </Text>
          </View>
        </View>

        {/* Pitches List */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            Pitches
          </Text>
          
          {pitches.length > 0 ? (
            pitches.map((pitch) => (
              <PitchCard key={pitch.id} pitch={pitch} />
            ))
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 60 }}>
              <Building2 size={60} color={isDark ? "#6B7280" : "#9CA3AF"} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#6B7280" : "#9CA3AF",
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                No pitches yet
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: isDark ? "#6B7280" : "#9CA3AF",
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                Add your first pitch to get started
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: insets.bottom + 100,
          right: 20,
          width: 56,
          height: 56,
          backgroundColor: "#00FF88",
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        onPress={() => router.push("/bookings/create")}
        activeOpacity={0.8}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScreenLayout>
  );
}