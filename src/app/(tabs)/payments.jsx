import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Filter,
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

const { width: screenWidth } = Dimensions.get("window");

export default function Payments() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [timeFilter, setTimeFilter] = useState("all"); // 'all', 'week', 'month', 'year'

  const { payments } = usePitchStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} color="#00FF88" />;
      case "pending":
        return <Clock size={16} color="#F59E0B" />;
      case "failed":
        return <AlertTriangle size={16} color="#EF4444" />;
      default:
        return <Clock size={16} color="#9CA3AF" />;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#00FF88";
      case "pending":
        return "#F59E0B";
      case "failed":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  const getMethodIcon = (method) => {
    return <CreditCard size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />;
  };

  // Calculate revenue analytics
  const totalRevenue = payments.reduce(
    (sum, payment) =>
      payment.status === "completed" ? sum + payment.amount : sum,
    0,
  );

  const pendingRevenue = payments.reduce(
    (sum, payment) =>
      payment.status === "pending" ? sum + payment.amount : sum,
    0,
  );

  const thisMonthRevenue = payments
    .filter((payment) => {
      const paymentMonth = new Date(payment.date).getMonth();
      const currentMonth = new Date().getMonth();
      return paymentMonth === currentMonth && payment.status === "completed";
    })
    .reduce((sum, payment) => sum + payment.amount, 0);

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
        £{amount}
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

  const TimeFilterButton = ({ title, value }) => (
    <TouchableOpacity
      style={{
        backgroundColor:
          timeFilter === value ? "#00FF88" : isDark ? "#2C2C2C" : "#F3F4F6",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 8,
      }}
      onPress={() => setTimeFilter(value)}
      activeOpacity={0.7}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color:
            timeFilter === value ? "#FFFFFF" : isDark ? "#FFFFFF" : "#000000",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const PaymentCard = ({ payment }) => (
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
            {payment.customerName}
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
            backgroundColor: getPaymentStatusColor(payment.status) + "20",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          {getPaymentStatusIcon(payment.status)}
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: getPaymentStatusColor(payment.status),
              marginLeft: 4,
              textTransform: "capitalize",
            }}
          >
            {payment.status}
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
            £{payment.amount}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {getMethodIcon(payment.method)}
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 4,
              textTransform: "capitalize",
            }}
          >
            {payment.method}
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
    </View>
  );

  const filteredPayments = payments.filter((payment) => {
    if (timeFilter === "all") return true;

    const paymentDate = new Date(payment.date);
    const now = new Date();

    switch (timeFilter) {
      case "week":
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return paymentDate >= weekAgo;
      case "month":
        return (
          paymentDate.getMonth() === now.getMonth() &&
          paymentDate.getFullYear() === now.getFullYear()
        );
      case "year":
        return paymentDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });

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
              Payments
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: isDark ? "#9CA3AF" : "#6B7280",
              }}
            >
              Revenue and transactions
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
              padding: 12,
              borderRadius: 12,
            }}
            onPress={() => console.log("Export payments")}
            activeOpacity={0.7}
          >
            <Download size={20} color={isDark ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
        </View>

        {/* Revenue Overview */}
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
            Revenue Overview
          </Text>
          <View style={{ marginHorizontal: -4, marginBottom: 8 }}>
            <RevenueCard
              title="Total Revenue"
              amount={totalRevenue}
              subtitle="All time earnings"
              color="#00FF88"
              icon={DollarSign}
            />
          </View>
          <View style={{ flexDirection: "row", marginHorizontal: -4 }}>
            <RevenueCard
              title="This Month"
              amount={thisMonthRevenue}
              subtitle="Current month"
              color="#3B82F6"
              icon={Calendar}
            />
            <RevenueCard
              title="Pending"
              amount={pendingRevenue}
              subtitle="Awaiting payment"
              color="#F59E0B"
              icon={Clock}
            />
          </View>
        </View>

        {/* Time Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
        >
          <TimeFilterButton title="All Time" value="all" />
          <TimeFilterButton title="This Week" value="week" />
          <TimeFilterButton title="This Month" value="month" />
          <TimeFilterButton title="This Year" value="year" />
        </ScrollView>

        {/* Payment History */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            Payment History
          </Text>

          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 60 }}>
              <CreditCard size={60} color={isDark ? "#6B7280" : "#9CA3AF"} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#6B7280" : "#9CA3AF",
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                No payments found
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
                {timeFilter === "all"
                  ? "No payment history available yet"
                  : `No payments in the selected ${timeFilter} period`}
              </Text>
            </View>
          )}
        </View>

        {/* Quick Stats */}
        <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: isDark ? "#9CA3AF" : "#6B7280",
                }}
              >
                Total Transactions
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                {payments.length}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: isDark ? "#9CA3AF" : "#6B7280",
                }}
              >
                Completed Payments
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#00FF88",
                }}
              >
                {payments.filter((p) => p.status === "completed").length}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: isDark ? "#9CA3AF" : "#6B7280",
                }}
              >
                Average Transaction
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                £
                {payments.length > 0
                  ? Math.round(
                      totalRevenue /
                        payments.filter((p) => p.status === "completed").length,
                    ) || 0
                  : 0}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
