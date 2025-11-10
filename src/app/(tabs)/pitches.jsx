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
    const statusCycle = {
      available: "booked",
      booked: "maintenance",
      maintenance: "available",
    };
    updatePitch(pitch.id, { status: statusCycle[pitch.status] });
  };

  const PitchCard = ({ pitch, compact = false }) => (
    <TouchableOpacity
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
        flexDirection: compact ? "row" : "column",
      }}
      activeOpacity={0.7}
      onPress={() => router.push(`/bookings/create?pitchId=${pitch.id}`)}
    >
      {/* Status Indicator */}
      <View
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
        }}
      >
        {getStatusIcon(pitch.status)}
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 12,
            color: getStatusColor(pitch.status),
            marginLeft: 4,
            textTransform: "capitalize",
          }}
        >
          {pitch.status}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: compact ? 0 : 12 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: compact ? 16 : 18,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 4,
              paddingRight: 80,
            }}
          >
            {pitch.name}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginBottom: compact ? 4 : 8,
            }}
          >
            {pitch.type}
          </Text>
        </View>

        {!compact && (
          <View style={{ marginBottom: 12 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <MapPin size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
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
                  fontSize: 12,
                  color: isDark ? "#9CA3AF" : "#6B7280",
                  marginLeft: 4,
                }}
              >
                £{pitch.hourlyRate}/hour
              </Text>
            </View>
          </View>
        )}

        {compact && (
          <View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: isDark ? "#9CA3AF" : "#6B7280",
              }}
            >
              {pitch.location} • £{pitch.hourlyRate}/hour
            </Text>
          </View>
        )}

        {/* Facilities */}
        {!compact && (
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
          >
            {pitch.facilities.map((facility, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                  marginRight: 8,
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 10,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                  }}
                >
                  {facility}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Actions */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#00FF88",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 12,
              flex: 1,
              marginRight: 8,
              justifyContent: "center",
            }}
            onPress={(e) => {
              e.stopPropagation();
              handleToggleStatus(pitch);
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 12,
                color: "#FFFFFF",
              }}
            >
              Toggle Status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
              padding: 8,
              borderRadius: 12,
              marginRight: 8,
            }}
            onPress={(e) => {
              e.stopPropagation();
              console.log("Edit pitch:", pitch.id);
            }}
            activeOpacity={0.8}
          >
            <Edit3 size={16} color={isDark ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#EF4444",
              padding: 8,
              borderRadius: 12,
            }}
            onPress={(e) => {
              e.stopPropagation();
              handleDeletePitch(pitch.id, pitch.name);
            }}
            activeOpacity={0.8}
          >
            <Trash2 size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
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

          {/* View Mode Toggle */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
              borderRadius: 12,
              padding: 4,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor:
                  viewMode === "grid" ? "#00FF88" : "transparent",
                padding: 8,
                borderRadius: 8,
              }}
              onPress={() => setViewMode("grid")}
              activeOpacity={0.7}
            >
              <Grid3X3
                size={20}
                color={
                  viewMode === "grid"
                    ? "#FFFFFF"
                    : isDark
                      ? "#9CA3AF"
                      : "#6B7280"
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor:
                  viewMode === "list" ? "#00FF88" : "transparent",
                padding: 8,
                borderRadius: 8,
              }}
              onPress={() => setViewMode("list")}
              activeOpacity={0.7}
            >
              <List
                size={20}
                color={
                  viewMode === "list"
                    ? "#FFFFFF"
                    : isDark
                      ? "#9CA3AF"
                      : "#6B7280"
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pitches List */}
        <View style={{ paddingHorizontal: 20 }}>
          {pitches.length > 0 ? (
            pitches.map((pitch) => (
              <PitchCard
                key={pitch.id}
                pitch={pitch}
                compact={viewMode === "list"}
              />
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
        onPress={() => console.log("Add new pitch")}
        activeOpacity={0.8}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScreenLayout>
  );
}
