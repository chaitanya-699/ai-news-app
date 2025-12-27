import { useAuth } from "@/auth/useAuth";
import { baseUrl } from "@/constants/requests";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginComponent = ({
  signUpClick,
  fadeAnim,
  onForgotPassword,
  onForgotUsername,
}: {
  signUpClick: any;
  fadeAnim: any;
  onForgotPassword?: any;
  onForgotUsername?: any;
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login, setToken } = useAuth();

  const handleSignIn = async () => {
    console.log("Attempting login with:", { username, password });
    if (username.trim() === "" || password.trim() === "") {
      alert("Username and password cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        username: username,
        password: password,
      });
      console.log(response.data);
      login({ token: response.data.token, user: response.data.data });
      setToken(response.data.token);
    } catch (error: Error | any) {
      // Handle login error
      console.log("Login error: ", error);
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
          Welcome Back
        </Text>
        <Text className="text-gray-400 text-sm text-center">
          Sign in to continue
        </Text>
      </View>

      {/* Email Input */}
      <View className="w-full mb-4">
        <Text className="text-white text-sm mb-2 ml-1">Username</Text>
        <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
          <MaterialIcons name="person" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor="#6B7280"
            value={username}
            onChangeText={setUsername}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 ml-3 text-white text-base"
          />
        </View>
      </View>

      {/* Password Input */}
      <View className="w-full mb-2">
        <Text className="text-white text-sm mb-2 ml-1">Password</Text>
        <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
          <MaterialIcons name="lock" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Enter your password"
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

      {/* Forgot Password */}
      <View className="flex-row justify-between w-full mb-6">
        <TouchableOpacity onPress={onForgotUsername}>
          <Text className="text-[#D2C1B6] text-sm">Forgot Username?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onForgotPassword}>
          <Text className="text-[#D2C1B6] text-sm">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="w-full bg-[#234C6A] rounded-2xl py-4 mb-6"
        onPress={handleSignIn}
      >
        <Text className="text-white text-center text-base font-semibold">
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center w-full mb-6">
        <View className="flex-1 h-[1px] bg-white/20" />
        <Text className="text-gray-400 text-sm mx-4">OR</Text>
        <View className="flex-1 h-[1px] bg-white/20" />
      </View>

      {/* Google Sign In */}
      <TouchableOpacity className="w-full flex-row items-center justify-center bg-white/10 rounded-2xl py-4 border border-white/20 mb-4">
        <FontAwesome name="google" size={20} color="white" />
        <Text className="text-white text-base font-medium ml-3">
          Continue with Google
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View className="flex-row mt-4">
        <Text className="text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
        </Text>
        <TouchableOpacity>
          <Text
            className="text-[#D2C1B6] text-sm font-semibold"
            onPress={signUpClick}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default LoginComponent;
