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

  const { todayStats, recentActivity, pitches, bookings, getRevenueStats } = usePitchStore();
  const revenueStats = getRevenueStats();

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

  const RevenueCard = ({
    title,
    amount,
    subtitle,
    color,
    icon: IconComponent,
  }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 24,
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
          fontSize: 28,
          color: isDark ? "#FFFFFF" : "#000000",
          marginBottom: 4,
        }}
      >
        ₦{amount}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 12,
          color: isDark ? "#9CA3AF" : "#6B7280",
          marginBottom: 2,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 10,
            color: isDark ? "#6B7280" : "#9CA3AF",
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  const PaymentCard = ({ payment }) => (
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
      }}
      onPress={() => router.push(`/bookings/receipt/${payment.bookingId}`)}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 4,
            }}
          >
            Pitch Booking
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Booking #{payment.bookingId}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#00FF8820",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <DollarSign size={16} color="#00FF88" />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: "#00FF88",
              marginLeft: 4,
            }}
          >
            Paid
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DollarSign size={18} color={isDark ? "#00FF88" : "#00FF88"} />
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 20,
              color: isDark ? "#FFFFFF" : "#000000",
              marginLeft: 4,
            }}
          >
            ₦{payment.amount}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Clock size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 4,
            }}
          >
            {new Date(payment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Calendar size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: isDark ? "#9CA3AF" : "#6B7280",
            marginLeft: 4,
          }}
        >
          {new Date(payment.date).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const QuickActionButton = ({
    icon: IconComponent,
    title,
    subtitle,
    onPress,
    color,
  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        borderRadius: 16,
        padding: 25,
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
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: isDark ? "#9CA3AF" : "#6B7280",
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
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
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
              paddingHorizontal: 20,
            }}
          >
            Today's Overview
          </Text>
<<<<<<< HEAD
          
          {/* Revenue Card - matches payments page */}
          <RevenueCard
            title="Total Revenue"
            amount={revenueStats.today}
            subtitle="Today's earnings"
            color="#00FF88"
            icon={DollarSign}
          />
          
          {/* Stats Cards - 2 in a row */}
          <View style={{ flexDirection: "row", paddingHorizontal: 16, marginHorizontal: -4 }}>
=======
          <View style={{ flexDirection: "row", marginHorizontal: -4 }}>
            <StatCard
              icon={DollarSign}
              label="Revenue"
              value={`₦${todayStats.revenue}`}
              change="+12%"
              color="#00FF88"
            />
>>>>>>> 86fca3a5f7ab2e1e6c5ae4f5de503db9b9f2f260
            <StatCard
              icon={Calendar}
              label="Pending Bookings"
              value={bookings.filter(b => b.status === "pending").length.toString()}
              color="#3B82F6"
            />
            <StatCard
              icon={Clock}
              label="Upcoming Bookings"
              value={bookings.filter(b => new Date(b.date) > new Date()).length.toString()}
              color="#F59E0B"
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
              subtitle="Manual Booking"
              onPress={() => router.push("/bookings/create")}
              color="#00FF88"
            />
            <QuickActionButton
              icon={Calendar}
              title="View Calendar"
              subtitle="Check Schedule"
              onPress={() => router.push("/(tabs)/bookings")}
              color="#3B82F6"
            />
            <QuickActionButton
              icon={Building2}
              title="Manage Pitches"
              onPress={() => router.push("/(tabs)/pitches")}
<<<<<<< HEAD
=======
              color="#3B82F6"
            />
            <QuickActionButton
              icon={Users}
              title="View Customers"
              onPress={() => router.push("/(tabs)/payments")}
>>>>>>> 86fca3a5f7ab2e1e6c5ae4f5de503db9b9f2f260
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
            Recent Receipts
          </Text>

          {recentActivity.length > 0 ? (
            recentActivity.map((item) => (
              <PaymentCard key={item.id} payment={item} />
            ))
          ) : (
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
                alignItems: "center",
                paddingVertical: 24,
              }}
            >
              <DollarSign size={40} color={isDark ? "#6B7280" : "#9CA3AF"} />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: isDark ? "#6B7280" : "#9CA3AF",
                  marginTop: 12,
                }}
              >
                No recent receipts
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}