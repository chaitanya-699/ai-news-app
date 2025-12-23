import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [canResend, setCanResend] = useState<boolean>(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  const handleSendCode = async () => {
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
      alert("Verification code sent to your email!");
      setResendTimer(60);
      setCanResend(false);
      setStep(2);
    } catch (error: any) {
      console.error("Error sending code:", error);
      alert(
        error.response?.data?.message ||
          "No account found with this email address"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRetrieve = async () => {
    if (!verificationCode) {
      alert("Please enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.75.230.58:8080/auth/verify-username",
        {
          email,
          code: verificationCode,
        }
      );
      console.log(response.data);

      if (response.data.username) {
        setUsername(response.data.username);
        setSuccess(true);
      } else {
        alert("Username retrieved successfully! Check your email.");
        setSuccess(true);
      }
    } catch (error: any) {
      console.error("Error verifying code:", error);
      alert(error.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      await axios.post("http://10.75.230.58:8080/recovery/forgot-username", {
        email,
      });
      alert("Verification code resent to your email!");
      setResendTimer(60);
      setCanResend(false);
    } catch (error: any) {
      console.error("Error resending code:", error);
      alert(error.response?.data?.message || "Failed to resend code");
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
          {success
            ? "Username Found"
            : step === 1
            ? "Forgot Username"
            : "Verify Code"}
        </Text>
        <Text className="text-gray-400 text-sm text-center">
          {success
            ? "Here's your username"
            : step === 1
            ? "Enter your email to receive a verification code"
            : "Enter the code sent to your email"}
        </Text>
      </View>

      {!success ? (
        <>
          {/* Step 1: Email Input */}
          {step === 1 && (
            <>
              <View className="w-full mb-6">
                <Text className="text-white text-sm mb-2 ml-1">
                  Email Address
                </Text>
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

              {/* Send Code Button */}
              <TouchableOpacity
                className="w-full bg-[#234C6A] rounded-2xl py-4 mb-4"
                onPress={handleSendCode}
                disabled={loading}
              >
                <Text className="text-white text-center text-base font-semibold">
                  {loading ? "Sending..." : "Send Verification Code"}
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
                    We&apos;ll send a verification code to your email address.
                    After verification, we&apos;ll show you your username.
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* Step 2: Verification Code */}
          {step === 2 && (
            <>
              <View className="w-full mb-6">
                <Text className="text-white text-sm mb-2 ml-1">
                  Verification Code
                </Text>
                <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
                  <MaterialIcons name="vpn-key" size={20} color="#9CA3AF" />
                  <TextInput
                    placeholder="Enter 6-digit code"
                    placeholderTextColor="#6B7280"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    keyboardType="number-pad"
                    maxLength={6}
                    className="flex-1 ml-3 text-white text-base"
                  />
                </View>
              </View>

              {/* Verify Button */}
              <TouchableOpacity
                className="w-full bg-[#234C6A] rounded-2xl py-4 mb-4"
                onPress={handleVerifyAndRetrieve}
                disabled={loading}
              >
                <Text className="text-white text-center text-base font-semibold">
                  {loading ? "Verifying..." : "Verify & Retrieve Username"}
                </Text>
              </TouchableOpacity>

              {/* Resend Code */}
              <TouchableOpacity
                onPress={handleResendCode}
                disabled={loading || !canResend}
              >
                <Text
                  className={`text-sm ${
                    canResend ? "text-[#D2C1B6]" : "text-gray-500"
                  }`}
                >
                  {canResend ? "Resend Code" : `Resend Code in ${resendTimer}s`}
                </Text>
              </TouchableOpacity>
            </>
          )}
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
              {username && (
                <>
                  <Text className="text-gray-400 text-sm mb-2">
                    Your username is:
                  </Text>
                  <Text className="text-white text-2xl font-bold mb-4">
                    {username}
                  </Text>
                </>
              )}
              <Text className="text-gray-400 text-sm text-center">
                {username
                  ? "You can now use this username to login"
                  : "Please check your email for your username"}
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
