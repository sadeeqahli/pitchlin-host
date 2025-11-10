import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  Plus,
  Building2,
  Users,
  Activity,
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

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [refreshing, setRefreshing] = useState(false);

  const { todayStats, recentActivity, pitches, bookings } = usePitchStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const StatCard = ({ icon: IconComponent, label, value, change, color }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        borderRadius: 16,
        padding: 20,
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
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: color,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconComponent size={20} color="#FFFFFF" />
        </View>
      </View>
      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: 24,
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
        }}
      >
        {label}
      </Text>
      {change && (
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 12,
            color: change.startsWith("+") ? "#00FF88" : "#EF4444",
            marginTop: 4,
          }}
        >
          {change}
        </Text>
      )}
    </View>
  );

  const QuickActionButton = ({
    icon: IconComponent,
    title,
    onPress,
    color,
  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        flex: 1,
        marginHorizontal: 4,
        alignItems: "center",
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={{
          width: 48,
          height: 48,
          backgroundColor: color,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <IconComponent size={24} color="#FFFFFF" />
      </View>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 14,
          color: isDark ? "#FFFFFF" : "#000000",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const ActivityItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? "#2C2C2C" : "#E5E7EB",
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: item.type === "booking" ? "#00FF88" : "#3B82F6",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        {item.type === "booking" ? (
          <Calendar size={20} color="#FFFFFF" />
        ) : (
          <DollarSign size={20} color="#FFFFFF" />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 2,
          }}
        >
          {item.message}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: isDark ? "#9CA3AF" : "#6B7280",
          }}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
            Welcome back
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Here's what's happening with your pitches today
          </Text>
        </View>

        {/* Today's Stats */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
              paddingHorizontal: 4,
            }}
          >
            Today's Overview
          </Text>
          <View style={{ flexDirection: "row", marginHorizontal: -4 }}>
            <StatCard
              icon={DollarSign}
              label="Revenue"
              value={`£${todayStats.revenue}`}
              change="+12%"
              color="#00FF88"
            />
            <StatCard
              icon={Calendar}
              label="Bookings"
              value={todayStats.bookings.toString()}
              change="+3"
              color="#3B82F6"
            />
          </View>
          <View
            style={{ flexDirection: "row", marginHorizontal: -4, marginTop: 8 }}
          >
            <StatCard
              icon={Clock}
              label="Active Hours"
              value={`${todayStats.activeHours}h`}
              color="#F59E0B"
            />
            <StatCard
              icon={TrendingUp}
              label="Utilization"
              value={`${todayStats.utilization}%`}
              color="#EF4444"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
              paddingHorizontal: 4,
            }}
          >
            Quick Actions
          </Text>
          <View style={{ flexDirection: "row", marginHorizontal: -4 }}>
            <QuickActionButton
              icon={Plus}
              title="Add Booking"
              onPress={() => router.push("/(tabs)/bookings")}
              color="#00FF88"
            />
            <QuickActionButton
              icon={Building2}
              title="Manage Pitches"
              onPress={() => router.push("/(tabs)/pitches")}
              color="#3B82F6"
            />
            <QuickActionButton
              icon={Users}
              title="View Customers"
              onPress={() => router.push("/(tabs)/customers")}
              color="#8B5CF6"
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            Recent Activity
          </Text>
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
            {recentActivity.length > 0 ? (
              recentActivity.map((item) => (
                <ActivityItem key={item.id} item={item} />
              ))
            ) : (
              <View style={{ alignItems: "center", paddingVertical: 24 }}>
                <Activity size={40} color={isDark ? "#6B7280" : "#9CA3AF"} />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: isDark ? "#6B7280" : "#9CA3AF",
                    marginTop: 12,
                  }}
                >
                  No recent activity
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
