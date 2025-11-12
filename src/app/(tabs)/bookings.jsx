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
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
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

export default function Bookings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [filter, setFilter] = useState("all"); // 'all', 'today', 'upcoming', 'pending'

  const { bookings, updateBooking } = usePitchStore();

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
      case "confirmed":
        return <CheckCircle size={16} color="#00FF88" />;
      case "pending":
        return <AlertCircle size={16} color="#F59E0B" />;
      case "cancelled":
        return <XCircle size={16} color="#EF4444" />;
      default:
        return <AlertCircle size={16} color="#9CA3AF" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#00FF88";
      case "pending":
        return "#F59E0B";
      case "cancelled":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "#00FF88";
      case "pending":
        return "#F59E0B";
      case "failed":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const today = new Date().toISOString().split("T")[0];
    const bookingDate = booking.date;

    switch (filter) {
      case "today":
        return bookingDate === today;
      case "upcoming":
        return bookingDate > today;
      case "pending":
        return booking.status === "pending";
      default:
        return true;
    }
  });

  const handleStatusUpdate = (bookingId, newStatus) => {
    updateBooking(bookingId, { status: newStatus });
  };

  const handleBookingAction = (booking, action) => {
    Alert.alert(
      action === "confirm" ? "Confirm Booking" : "Cancel Booking",
      `Are you sure you want to ${action} this booking for ${booking.customerName}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () =>
            handleStatusUpdate(
              booking.id,
              action === "confirm" ? "confirmed" : "cancelled",
            ),
        },
      ],
    );
  };

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
        {title}
        {count !== undefined && ` (${count})`}
      </Text>
    </TouchableOpacity>
  );

  const BookingCard = ({ booking }) => (
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
      onPress={() => router.push(`/bookings/receipt/${booking.id}`)}
      activeOpacity={0.7}
    >
      {/* Header Row */}
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
            {booking.pitchName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <User size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: isDark ? "#9CA3AF" : "#6B7280",
                marginLeft: 4,
              }}
            >
              {booking.customerName}
            </Text>
          </View>
        </View>

        {/* Status Badge */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          {getStatusIcon(booking.status)}
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: getStatusColor(booking.status),
              marginLeft: 4,
              textTransform: "capitalize",
            }}
          >
            {booking.status}
          </Text>
        </View>
      </View>

      {/* Date and Time */}
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Calendar size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 4,
            }}
          >
            {new Date(booking.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Clock size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: isDark ? "#9CA3AF" : "#6B7280",
              marginLeft: 4,
            }}
          >
            {booking.startTime} - {booking.endTime}
          </Text>
        </View>
      </View>

      {/* Amount and Payment Status */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DollarSign size={14} color={isDark ? "#9CA3AF" : "#6B7280"} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
              marginLeft: 4,
            }}
          >
            ₦{booking.amount}
          </Text>
        </View>

        <View
          style={{
            backgroundColor:
              getPaymentStatusColor(booking.paymentStatus) + "20",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: getPaymentStatusColor(booking.paymentStatus),
              textTransform: "capitalize",
            }}
          >
            Payment {booking.paymentStatus}
          </Text>
        </View>
      </View>

      {/* Actions */}
      {booking.status === "pending" && (
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#00FF88",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
            }}
            onPress={(e) => {
              e.stopPropagation();
              handleBookingAction(booking, "confirm");
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#EF4444",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
            }}
            onPress={(e) => {
              e.stopPropagation();
              handleBookingAction(booking, "cancel");
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
              }}
            >
              Decline
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const getFilterCounts = () => {
    const today = new Date().toISOString().split("T")[0];
    return {
      all: bookings.length,
      today: bookings.filter((b) => b.date === today).length,
      upcoming: bookings.filter((b) => b.date > today).length,
      pending: bookings.filter((b) => b.status === "pending").length,
    };
  };

  const counts = getFilterCounts();

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
              Receipts
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: isDark ? "#9CA3AF" : "#6B7280",
              }}
            >
              View booking details
            </Text>
          </View>
        </View>

        {/* Filter Options */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
        >
          <FilterButton title="All" value="all" count={counts.all} />
          <FilterButton title="Today" value="today" count={counts.today} />
          <FilterButton
            title="Upcoming"
            value="upcoming"
            count={counts.upcoming}
          />
          <FilterButton
            title="Pending"
            value="pending"
            count={counts.pending}
          />
        </ScrollView>

        {/* Bookings List */}
        <View style={{ paddingHorizontal: 20 }}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 60 }}>
              <Calendar size={60} color={isDark ? "#6B7280" : "#9CA3AF"} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#6B7280" : "#9CA3AF",
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                No receipts found
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
                  ? "Create your first booking to get started"
                  : `No ${filter === "pending" ? "pending" : filter} bookings`}
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