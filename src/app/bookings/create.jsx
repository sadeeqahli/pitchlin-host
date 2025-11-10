import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  Info,
} from "lucide-react-native";
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

export default function CreateBooking() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { pitchId } = useLocalSearchParams();
  
  const { pitches, addBooking, addActivity } = usePitchStore();
  const [selectedPitch, setSelectedPitch] = useState(null);
  
  // Form state
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("19:00");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (pitchId && pitches.length > 0) {
      const pitch = pitches.find(p => p.id === parseInt(pitchId));
      if (pitch) {
        setSelectedPitch(pitch);
        setAmount(pitch.hourlyRate.toString());
      }
    } else if (pitches.length > 0) {
      setSelectedPitch(pitches[0]);
      setAmount(pitches[0].hourlyRate.toString());
    }
  }, [pitchId, pitches]);

  if (!fontsLoaded) {
    return null;
  }

  const handleCreateBooking = () => {
    // Validation
    if (!customerName.trim()) {
      Alert.alert("Error", "Please enter customer name");
      return;
    }
    
    if (!selectedPitch) {
      Alert.alert("Error", "Please select a pitch");
      return;
    }
    
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    
    const booking = {
      pitchId: selectedPitch.id,
      pitchName: selectedPitch.name,
      customerName: customerName.trim(),
      date: date,
      startTime,
      endTime,
      status: "pending",
      amount: parseFloat(amount),
      paymentStatus: "pending",
      notes: notes.trim() || null,
    };
    
    addBooking(booking);
    addActivity({
      type: "booking",
      message: `New booking for ${selectedPitch.name}`,
      time: "Just now",
    });
    
    Alert.alert(
      "Booking Created",
      "The booking has been created successfully. The customer will be notified.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <ScreenLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
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
              Create Booking
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: isDark ? "#9CA3AF" : "#6B7280",
              }}
            >
              Add a new reservation
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          {/* Pitch Selection */}
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
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
                marginBottom: 12,
              }}
            >
              Select Pitch
            </Text>
            
            {selectedPitch ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                  borderRadius: 12,
                }}
              >
                <MapPin size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: isDark ? "#FFFFFF" : "#000000",
                    marginLeft: 8,
                    flex: 1,
                  }}
                >
                  {selectedPitch.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: isDark ? "#9CA3AF" : "#6B7280",
                  }}
                >
                  £{selectedPitch.hourlyRate}/hr
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: isDark ? "#9CA3AF" : "#6B7280",
                  textAlign: "center",
                  paddingVertical: 16,
                }}
              >
                No pitch selected
              </Text>
            )}
          </View>

          {/* Customer Information */}
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
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
                marginBottom: 12,
              }}
            >
              Customer Information
            </Text>
            
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 14,
                marginBottom: 12,
              }}
            >
              <User size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
              <TextInput
                style={{
                  flex: 1,
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginLeft: 8,
                  padding: 0,
                }}
                placeholder="Customer name"
                placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                value={customerName}
                onChangeText={setCustomerName}
              />
            </View>
          </View>

          {/* Date and Time */}
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
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
                marginBottom: 12,
              }}
            >
              Date & Time
            </Text>
            
            {/* Date Input */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 14,
                marginBottom: 12,
              }}
            >
              <Calendar size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
              <TextInput
                style={{
                  flex: 1,
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginLeft: 8,
                  padding: 0,
                }}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                value={date}
                onChangeText={setDate}
              />
            </View>
            
            {/* Time Inputs */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 14,
                }}
              >
                <Clock size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                <TextInput
                  style={{
                    flex: 1,
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: isDark ? "#FFFFFF" : "#000000",
                    marginLeft: 8,
                    padding: 0,
                  }}
                  placeholder="HH:MM"
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  value={startTime}
                  onChangeText={setStartTime}
                />
              </View>
              
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 14,
                }}
              >
                <Clock size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                <TextInput
                  style={{
                    flex: 1,
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: isDark ? "#FFFFFF" : "#000000",
                    marginLeft: 8,
                    padding: 0,
                  }}
                  placeholder="HH:MM"
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  value={endTime}
                  onChangeText={setEndTime}
                />
              </View>
            </View>
          </View>

          {/* Payment */}
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
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
                marginBottom: 12,
              }}
            >
              Payment
            </Text>
            
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 14,
              }}
            >
              <DollarSign size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
              <TextInput
                style={{
                  flex: 1,
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginLeft: 8,
                  padding: 0,
                }}
                placeholder="Amount"
                placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Notes */}
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
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
                marginBottom: 12,
              }}
            >
              Notes
            </Text>
            
            <View
              style={{
                backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 14,
              }}
            >
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: isDark ? "#FFFFFF" : "#000000",
                  padding: 0,
                  textAlignVertical: "top",
                }}
                placeholder="Add any special requests or notes"
                placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Info Box */}
          <View
            style={{
              backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
              flexDirection: "row",
            }}
          >
            <Info size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
            <Text
              style={{
                flex: 1,
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: isDark ? "#9CA3AF" : "#6B7280",
                marginLeft: 8,
              }}
            >
              The customer will receive a confirmation notification with booking details.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Button */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
          left: 20,
          right: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#00FF88",
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={handleCreateBooking}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#FFFFFF",
            }}
          >
            Create Booking
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}