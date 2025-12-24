import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotUsernameComponent = ({
  onBack,
  fadeAnim,
}: {
  onBack: any;
  fadeAnim: any;
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleRetrieveUsername = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.75.230.58:8080/recovery/forgot-username",
        { email }
      );
      console.log(response.data);
      alert(response.data.message || "Username sent to your email");
      setSuccess(true);
    } catch (error: any) {
      console.error(
        "Error retrieving username:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "No account found with this email address"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View
      className="flex flex-col w-[95%] h-[80%] border-2 border-white/20 rounded-3xl items-center justify-center px-6 bg-black/40"
      style={{ opacity: fadeAnim }}
    >
      {/* Header */}
      <View className="mb-8">
        <Text className="text-white text-3xl font-bold text-center mb-2">
          {success ? "Check Your Email" : "Forgot Username"}
        </Text>
        <Text className="text-gray-400 text-sm text-center">
          {success
            ? "We've sent your username to your email"
            : "Enter your email to retrieve your username"}
        </Text>
      </View>

      {!success ? (
        <>
          {/* Email Input */}
          <View className="w-full mb-6">
            <Text className="text-white text-sm mb-2 ml-1">Email Address</Text>
            <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
              <MaterialIcons name="email" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 ml-3 text-white text-base"
              />
            </View>
          </View>

          {/* Retrieve Button */}
          <TouchableOpacity
            className="w-full bg-[#234C6A] rounded-2xl py-4 mb-4"
            onPress={handleRetrieveUsername}
            disabled={loading}
          >
            <Text className="text-white text-center text-base font-semibold">
              {loading ? "Sending..." : "Send Username to Email"}
            </Text>
          </TouchableOpacity>

          {/* Info Text */}
          <View className="w-full bg-white/5 rounded-2xl p-4 mb-4 border border-white/10">
            <View className="flex-row items-start">
              <MaterialIcons
                name="info"
                size={20}
                color="#9CA3AF"
                style={{ marginTop: 2 }}
              />
              <Text className="text-gray-400 text-sm ml-3 flex-1">
                We&apos;ll send your username to the email address associated
                with your account. Please check your inbox.
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          {/* Success View */}
          <View className="w-full mb-6">
            <View className="bg-[#234C6A]/30 rounded-2xl p-6 border border-[#234C6A]/50 items-center">
              <MaterialIcons
                name="check-circle"
                size={64}
                color="#34D399"
                style={{ marginBottom: 16 }}
              />
              <Text className="text-white text-xl font-bold mb-4">
                Email Sent Successfully!
              </Text>
              <Text className="text-gray-400 text-sm text-center">
                Please check your email inbox for your username. If you
                don&apos;t see it, check your spam folder.
              </Text>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className="w-full bg-[#234C6A] rounded-2xl py-4 mb-4"
            onPress={onBack}
          >
            <Text className="text-white text-center text-base font-semibold">
              Go to Login
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Back Button */}
      <TouchableOpacity className="mt-4" onPress={onBack}>
        <Text className="text-[#D2C1B6] text-sm font-semibold">
          {success ? "Back to Login" : "Cancel"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ForgotUsernameComponent;
