import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Users,
  Plus,
  Phone,
  Mail,
  DollarSign,
  Star,
  UserCheck,
  Clock,
  TrendingUp,
} from "lucide-react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import ScreenLayout from "@/components/ScreenLayout";
import { usePitchStore } from "@/stores/pitchStore";

export default function Customers() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [filter, setFilter] = useState("all");

  const { bookings, payments } = usePitchStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const customers = useMemo(() => {
    const customerMap = new Map();

    bookings.forEach((booking) => {
      const customerId = booking.customerName.toLowerCase().replace(/\s+/g, "");
      if (!customerMap.has(customerId)) {
        const customerPayments = payments.filter(
          (p) => p.customerName === booking.customerName,
        );
        const totalSpent = customerPayments.reduce(
          (sum, p) => (p.status === "completed" ? sum + p.amount : sum),
          0,
        );
        const bookingCount = bookings.filter(
          (b) => b.customerName === booking.customerName,
        ).length;

        customerMap.set(customerId, {
          id: customerId,
          name: booking.customerName,
          email: `${customerId}@email.com`,
          phone: `+44 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          totalBookings: bookingCount,
          totalSpent,
          lastBooking: booking.date,
          status:
            totalSpent > 100 ? "vip" : bookingCount > 1 ? "regular" : "new",
          rating: Math.floor(Math.random() * 2) + 4,
          joinDate: new Date(
            Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .split("T")[0],
        });
      }
    });

    return Array.from(customerMap.values()).sort(
      (a, b) => b.totalSpent - a.totalSpent,
    );
  }, [bookings, payments]);

  if (!fontsLoaded) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "vip":
        return "#F59E0B";
      case "regular":
        return "#00FF88";
      case "new":
        return "#3B82F6";
      default:
        return "#9CA3AF";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "vip":
        return <Star size={16} color="#F59E0B" />;
      case "regular":
        return <UserCheck size={16} color="#00FF88" />;
      case "new":
        return <Clock size={16} color="#3B82F6" />;
      default:
        return <Users size={16} color="#9CA3AF" />;
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    if (filter === "all") return true;
    return customer.status === filter;
  });

  const FilterButton = ({ title, value, count }) => (
    <TouchableOpacity
      style={{
        backgroundColor:
          filter === value ? "#00FF88" : isDark ? "#2C2C2C" : "#F3F4F6",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 8,
      }}
      onPress={() => setFilter(value)}
      activeOpacity={0.7}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: filter === value ? "#FFFFFF" : isDark ? "#FFFFFF" : "#000000",
        }}
      >
        {title} ({count})
      </Text>
    </TouchableOpacity>
  );

  const CustomerCard = ({ customer }) => (
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
      activeOpacity={0.7}
      onPress={() => console.log("View customer:", customer.id)}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: isDark ? "#FFFFFF" : "#000000",
                marginRight: 8,
              }}
            >
              {customer.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {Array.from({ length: customer.rating }, (_, i) => (
                <Star key={i} size={12} color="#F59E0B" fill="#F59E0B" />
              ))}
            </View>
          </View>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Member since {new Date(customer.joinDate).toLocaleDateString()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: getStatusColor(customer.status) + "20",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          {getStatusIcon(customer.status)}
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: getStatusColor(customer.status),
              marginLeft: 4,
              textTransform: "capitalize",
            }}
          >
            {customer.status}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Mail size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 4,
            }}
          >
            {customer.email}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Phone size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 4,
            }}
          >
            {customer.phone}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 18,
              color: isDark ? "#FFFFFF" : "#000000",
            }}
          >
            {customer.totalBookings}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Bookings
          </Text>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 18,
              color: "#00FF88",
            }}
          >
            £{customer.totalSpent}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Total Spent
          </Text>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 12,
              color: isDark ? "#FFFFFF" : "#000000",
            }}
          >
            {new Date(customer.lastBooking).toLocaleDateString()}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Last Visit
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const StatsCard = ({
    title,
    value,
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
        {value}
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

  const counts = {
    all: customers.length,
    vip: customers.filter((c) => c.status === "vip").length,
    regular: customers.filter((c) => c.status === "regular").length,
    new: customers.filter((c) => c.status === "new").length,
  };

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpending =
    customers.length > 0 ? Math.round(totalRevenue / customers.length) : 0;

  return (
    <ScreenLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 28,
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 4,
            }}
          >
            Customers
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            Manage your customer relationships
          </Text>
        </View>

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
            Customer Overview
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: -4,
              marginBottom: 8,
            }}
          >
            <StatsCard
              title="Total Customers"
              value={customers.length.toString()}
              subtitle="Active customers"
              color="#00FF88"
              icon={Users}
            />
            <StatsCard
              title="VIP Customers"
              value={counts.vip.toString()}
              subtitle="High value customers"
              color="#F59E0B"
              icon={Star}
            />
          </View>
          <View style={{ flexDirection: "row", marginHorizontal: -4 }}>
            <StatsCard
              title="Total Revenue"
              value={`£${totalRevenue}`}
              subtitle="From all customers"
              color="#3B82F6"
              icon={DollarSign}
            />
            <StatsCard
              title="Avg. Spending"
              value={`£${avgSpending}`}
              subtitle="Per customer"
              color="#8B5CF6"
              icon={TrendingUp}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
        >
          <FilterButton title="All" value="all" count={counts.all} />
          <FilterButton title="VIP" value="vip" count={counts.vip} />
          <FilterButton
            title="Regular"
            value="regular"
            count={counts.regular}
          />
          <FilterButton title="New" value="new" count={counts.new} />
        </ScrollView>

        <View style={{ paddingHorizontal: 20 }}>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 60 }}>
              <Users size={60} color={isDark ? "#6B7280" : "#9CA3AF"} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#6B7280" : "#9CA3AF",
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                No customers found
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
                {filter === "all"
                  ? "Your first customers will appear here"
                  : `No ${filter} customers found`}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

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
        onPress={() => console.log("Add new customer")}
        activeOpacity={0.8}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScreenLayout>
  );
}
