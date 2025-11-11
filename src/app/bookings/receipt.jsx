import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Printer, Share2 } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import ScreenLayout from "@/components/ScreenLayout";
import { usePitchStore } from "@/stores/pitchStore";

export default function Receipt() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { id } = useLocalSearchParams();

  const { bookings, payments } = usePitchStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const booking = bookings.find(b => b.id === parseInt(id));
  const payment = payments.find(p => p.bookingId === parseInt(id));

  if (!booking) {
    return (
      <ScreenLayout>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
            }}
          >
            Booking not found
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#00FF88",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 12,
            }}
            onPress={() => router.back()}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

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
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={isDark ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
          
          <View>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 24,
                color: isDark ? "#FFFFFF" : "#000000",
              }}
            >
              Receipt
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: isDark ? "#9CA3AF" : "#6B7280",
              }}
            >
              Booking #{booking.id}
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Receipt Card */}
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              shadowColor: isDark ? "#000" : "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {/* Header */}
            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 24,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginBottom: 4,
                }}
              >
                PitchLink
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: isDark ? "#9CA3AF" : "#6B7280",
                }}
              >
                Sports Facility Management
              </Text>
            </View>

            {/* Booking Details */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginBottom: 16,
                }}
              >
                Booking Details
              </Text>
              
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                    marginBottom: 4,
                  }}
                >
                  Customer
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {booking.customerName}
                </Text>
              </View>
              
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                    marginBottom: 4,
                  }}
                >
                  Pitch
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {booking.pitchName}
                </Text>
              </View>
              
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                    marginBottom: 4,
                  }}
                >
                  Date & Time
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {new Date(booking.date).toLocaleDateString()} • {booking.startTime} - {booking.endTime}
                </Text>
              </View>
              
              <View>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                    marginBottom: 4,
                  }}
                >
                  Status
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: booking.status === "confirmed" ? "#00FF88" : booking.status === "pending" ? "#F59E0B" : "#EF4444",
                  }}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Text>
              </View>
            </View>

            {/* Payment Details */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginBottom: 16,
                }}
              >
                Payment Details
              </Text>
              
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                  }}
                >
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                  }}
                >
                  ₦{booking.amount}
                </Text>
              </View>
              
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                  }}
                >
                  Service Fee
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                  }}
                >
                  ₦0.00
                </Text>
              </View>
              
              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: isDark ? "#2C2C2C" : "#E5E7EB" }}>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 18,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 18,
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  ₦{booking.amount}
                </Text>
              </View>
              
              {payment && (
                <View style={{ marginTop: 12 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: isDark ? "#9CA3AF" : "#6B7280",
                      marginBottom: 4,
                    }}
                  >
                    Payment Method
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 16,
                      color: isDark ? "#FFFFFF" : "#000000",
                    }}
                  >
                    {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}
                  </Text>
                </View>
              )}
            </View>

            {/* Thank You Message */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: isDark ? "#FFFFFF" : "#000000",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                Thank you for choosing PitchLink!
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: isDark ? "#9CA3AF" : "#6B7280",
                  textAlign: "center",
                }}
              >
                For any inquiries, contact support@pitchlink.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
          left: 20,
          right: 20,
          flexDirection: "row",
          gap: 12,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => console.log("Print receipt")}
          activeOpacity={0.8}
        >
          <Printer size={20} color={isDark ? "#FFFFFF" : "#000000"} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#000000",
              marginLeft: 8,
            }}
          >
            Print
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#00FF88",
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => console.log("Share receipt")}
          activeOpacity={0.8}
        >
          <Share2 size={20} color="#FFFFFF" />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#FFFFFF",
              marginLeft: 8,
            }}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}