import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SignUpComponent = ({
  signUpClick,
  fadeAnim,
}: {
  signUpClick: any;
  fadeAnim: any;
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <Animated.View
      className="flex flex-col w-[95%] h-[80%] border-2 border-white/20 rounded-3xl items-center justify-center px-6 bg-black/40"
      style={{ opacity: fadeAnim }}
    >
      <ScrollView
        className="w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-white text-3xl font-bold text-center mb-2">
            Create Account
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Sign up to get started
          </Text>
        </View>

        {/* Full Name Input */}
        <View className="w-full mb-4">
          <Text className="text-white text-sm mb-2 ml-1">Full Name</Text>
          <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
            <MaterialIcons name="person" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#6B7280"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              className="flex-1 ml-3 text-white text-base"
            />
          </View>
        </View>

        {/* Email Input */}
        <View className="w-full mb-4">
          <Text className="text-white text-sm mb-2 ml-1">Email</Text>
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

        {/* Password Input */}
        <View className="w-full mb-4">
          <Text className="text-white text-sm mb-2 ml-1">Password</Text>
          <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
            <MaterialIcons name="lock" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Create a password"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              className="flex-1 ml-3 text-white text-base"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Input */}
        <View className="w-full mb-4">
          <Text className="text-white text-sm mb-2 ml-1">Confirm Password</Text>
          <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
            <MaterialIcons name="lock-outline" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Confirm your password"
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

        {/* Terms & Conditions Checkbox */}
        <TouchableOpacity
          className="flex-row items-center mb-6"
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          <View
            className={`w-5 h-5 rounded border-2 ${
              agreeToTerms ? "bg-[#234C6A] border-[#234C6A]" : "border-white/40"
            } items-center justify-center mr-3`}
          >
            {agreeToTerms && (
              <MaterialIcons name="check" size={16} color="white" />
            )}
          </View>
          <Text className="text-gray-400 text-sm flex-1">
            I agree to the{" "}
            <Text className="text-[#D2C1B6]">Terms & Conditions</Text> and{" "}
            <Text className="text-[#D2C1B6]">Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          className={`w-full rounded-2xl py-4 mb-6 ${
            agreeToTerms ? "bg-[#234C6A]" : "bg-gray-600"
          }`}
          disabled={!agreeToTerms}
        >
          <Text className="text-white text-center text-base font-semibold">
            Create Account
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center w-full mb-6">
          <View className="flex-1 h-[1px] bg-white/20" />
          <Text className="text-gray-400 text-sm mx-4">OR</Text>
          <View className="flex-1 h-[1px] bg-white/20" />
        </View>

        {/* Google Sign Up */}
        <TouchableOpacity className="w-full flex-row items-center justify-center bg-white/10 rounded-2xl py-4 border border-white/20 mb-4">
          <FontAwesome name="google" size={20} color="white" />
          <Text className="text-white text-base font-medium ml-3">
            Sign Up with Google
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center mt-2">
          <Text className="text-gray-400 text-sm">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity>
            <Text
              className="text-[#D2C1B6] text-sm font-semibold"
              onPress={signUpClick}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default SignUpComponent;
