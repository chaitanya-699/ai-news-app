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

const ForgotPasswordComponent = ({
  onBack,
  fadeAnim,
}: {
  onBack: any;
  fadeAnim: any;
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [canResend, setCanResend] = useState<boolean>(true);
  const [otpToken, setOtpToken] = useState<string>("");

  const [passwordStrength, setPasswordStrength] = useState<{
    capital: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
    length: boolean;
  }>({
    capital: false,
    lowercase: false,
    number: false,
    special: false,
    length: false,
  });

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
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendCode = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.75.230.58:8080/recovery/forgot-password",
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
        error.response?.data?.message || "Failed to send verification code"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("Please enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.75.230.58:8080/recovery/verify-otp",
        {
          email,
          otp: verificationCode,
        }
      );
      console.log(response.data);
      alert(response.data.errorMessage);
      setOtpToken(response.data.token);
      setStep(3);
    } catch (error: any) {
      console.error("Error verifying code:", error);
      alert(error.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const allValid = Object.values(passwordStrength).every(Boolean);
    if (!allValid) {
      alert("Please ensure your password meets all requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.75.230.58:8080/recovery/reset-password",
        {
          email,
          newPassword,
          token: otpToken,
        }
      );
      console.log(response.data);
      alert(
        "Password reset successfully! Please login with your new password."
      );
      onBack();
    } catch (error: any) {
      console.error("Error resetting password:", error);
      alert(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = (pwd: string) => {
    const strength = {
      capital: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
      length: pwd.length >= 8 && pwd.length <= 20,
    };

    setPasswordStrength(strength);
    setNewPassword(pwd);
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      await axios.post("http://10.75.230.58:8080/recovery/forgot-password", {
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
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify Code"}
          {step === 3 && "Reset Password"}
        </Text>
        <Text className="text-gray-400 text-sm text-center">
          {step === 1 && "Enter your email to receive a verification code"}
          {step === 2 && "Enter the code sent to your email"}
          {step === 3 && "Create your new password"}
        </Text>
      </View>

      {/* Step 1: Email Input */}
      {step === 1 && (
        <>
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

          <TouchableOpacity
            className="w-full bg-[#234C6A] rounded-2xl py-4 mb-4"
            onPress={handleSendCode}
            disabled={loading}
          >
            <Text className="text-white text-center text-base font-semibold">
              {loading ? "Sending..." : "Send Verification Code"}
            </Text>
          </TouchableOpacity>
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

          <TouchableOpacity
            className="w-full bg-[#234C6A] rounded-2xl py-4 mb-4"
            onPress={handleVerifyCode}
            disabled={loading}
          >
            <Text className="text-white text-center text-base font-semibold">
              {loading ? "Verifying..." : "Verify Code"}
            </Text>
          </TouchableOpacity>

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

      {/* Step 3: New Password */}
      {step === 3 && (
        <>
          <View className="w-full mb-4">
            <Text className="text-white text-sm mb-2 ml-1">New Password</Text>
            <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
              <MaterialIcons name="lock" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Create new password"
                placeholderTextColor="#6B7280"
                value={newPassword}
                onChangeText={updatePassword}
                secureTextEntry={!showNewPassword}
                className="flex-1 ml-3 text-white text-base"
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <MaterialIcons
                  name={showNewPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Password Strength Indicators */}
            <View className="mt-3 ml-1">
              <View className="flex-row items-center mb-1">
                <MaterialIcons
                  name={passwordStrength.capital ? "check-circle" : "cancel"}
                  size={16}
                  color={passwordStrength.capital ? "#34D399" : "#6B7280"}
                />
                <Text className="text-gray-400 text-xs ml-2">
                  One uppercase letter
                </Text>
              </View>
              <View className="flex-row items-center mb-1">
                <MaterialIcons
                  name={passwordStrength.lowercase ? "check-circle" : "cancel"}
                  size={16}
                  color={passwordStrength.lowercase ? "#34D399" : "#6B7280"}
                />
                <Text className="text-gray-400 text-xs ml-2">
                  One lowercase letter
                </Text>
              </View>
              <View className="flex-row items-center mb-1">
                <MaterialIcons
                  name={passwordStrength.number ? "check-circle" : "cancel"}
                  size={16}
                  color={passwordStrength.number ? "#34D399" : "#6B7280"}
                />
                <Text className="text-gray-400 text-xs ml-2">One number</Text>
              </View>
              <View className="flex-row items-center mb-1">
                <MaterialIcons
                  name={passwordStrength.special ? "check-circle" : "cancel"}
                  size={16}
                  color={passwordStrength.special ? "#34D399" : "#6B7280"}
                />
                <Text className="text-gray-400 text-xs ml-2">
                  One special character
                </Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons
                  name={passwordStrength.length ? "check-circle" : "cancel"}
                  size={16}
                  color={passwordStrength.length ? "#34D399" : "#6B7280"}
                />
                <Text className="text-gray-400 text-xs ml-2">
                  8-20 characters
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full mb-6">
            <Text className="text-white text-sm mb-2 ml-1">
              Confirm Password
            </Text>
            <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
              <MaterialIcons name="lock-outline" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Confirm new password"
                placeholderTextColor="#6B7280"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                className="flex-1 ml-3 text-white text-base"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <MaterialIcons
                  name={showConfirmPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="w-full bg-[#234C6A] rounded-2xl py-4 mb-4"
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text className="text-white text-center text-base font-semibold">
              {loading ? "Resetting..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Back Button */}
      <TouchableOpacity className="mt-4" onPress={onBack}>
        <Text className="text-[#D2C1B6] text-sm font-semibold">
          Back to Login
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ForgotPasswordComponent;
