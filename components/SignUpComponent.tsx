import { useAuth } from "@/auth/useAuth";
import { getGoogleClientIds } from "@/config/google";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Loading from "../assets/animations/Loading....json";
const SignUpComponent = ({
  signUpClick,
  fadeAnim,
  isLogged,
}: {
  signUpClick: any;
  fadeAnim: any;
  isLogged: any;
}) => {
  const { login } = useAuth();

  const { android, web } = getGoogleClientIds();
  console.log("Google Client Ids:", { android, web });


  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [showPasswordCriteria, setShowPasswordCriteria] =
    useState<boolean>(false);
  const [loadingUsername, setLoadingUsername] = useState<boolean>(false);
  const [showUsernameCriteria, setShowUsernameCriteria] =
    useState<boolean>(false);
  const [showEmailCriteria, setShowEmailCriteria] = useState<boolean>(false);
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

  const [signUpFieldsValid, setSignUpFieldsValid] = useState<{
    validUsername: boolean;
    validEmail: boolean;
    validPassword: boolean;
    validConfirmPassword: boolean;
  }>({
    validUsername: false,
    validEmail: false,
    validPassword: false,
    validConfirmPassword: false,
  });

  const [confirmPasswordIndicator, setConfirmPasswordIndicator] = useState<
    boolean | null
  >(null);

  const [showConfirmPasswordCriteria, setShowConfirmPasswordCriteria] =
    useState(false);

  console.log("ANDROID_CLIENT_ID:", process.env.ANDROID_CLIENT_ID);
  console.log("WEB_CLIENT_ID:", process.env.WEB_CLIENT_ID);

  async function handleSignUp() {
    const allValid = Object.values(signUpFieldsValid).every(Boolean);
    if (!allValid) {
      alert("Please fill all fields correctly before signing up.");
      return;
    }
    try {
      const response = await axios.post(
        "http://10.75.230.58:8080/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      login({
        token: response.data.token,
        user: response.data.data,
      });
      isLogged(true);
    } catch (error: any) {
      console.error("Error signing up:", error.response.data.message);
      alert(`Error signing up: ${error.response.data.message}`);
    }
  }

  function updatePassword(pwd: string) {
    const strength = {
      capital: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
      length: pwd.length >= 8 && pwd.length <= 20,
    };

    setPasswordStrength(strength);
    setPassword(pwd);

    const isStrong = Object.values(strength).every(Boolean);
    if (isStrong) {
      setSignUpFieldsValid((prev) => ({
        ...prev,
        validPassword: isStrong,
      }));
    } else {
      setSignUpFieldsValid((prev) => ({
        ...prev,
        validPassword: false,
      }));
    }
    setShowPasswordCriteria(!isStrong);

    if (pwd.length === 0) {
      setShowPasswordCriteria(false);
    }
  }

  async function handleVerifyUsername() {
    if (loadingUsername) return; // prevent double click

    setLoadingUsername(true);
    setSignUpFieldsValid((prev) => ({
      ...prev,
      validUsername: false,
    }));

    setTimeout(() => {
      setLoadingUsername(false);
      setSignUpFieldsValid((prev) => ({
        ...prev,
        validUsername: true,
      }));
    }, 2000);
    // try {
    //   const response = await axios.post(
    //     "http://10.75.230.58:8080/auth/verify-username",
    //     {
    //       username,
    //     }
    //   );
    //   console.log(response.data);
    //   if (response.data.message === "Username is available") {
    //     setSignUpFieldsValid((prev) => ({
    //       ...prev,
    //       validUsername: true,
    //     }));
    //   }
    // } catch (error) {
    //   console.error("Error verifying username:", error);
    // }
  }

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
              placeholder="Enter username"
              placeholderTextColor="#6B7280"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setSignUpFieldsValid((prev) => ({
                  ...prev,
                  validUsername: false,
                }));
                if (text.length === 0) {
                  setShowUsernameCriteria(false);
                } else {
                  setShowUsernameCriteria(true);
                }
              }}
              autoCapitalize="words"
              className="flex-1 ml-3 text-white text-base"
            />

            {showUsernameCriteria && (
              <TouchableOpacity onPress={handleVerifyUsername} className=" p-2">
                {loadingUsername ? (
                  <LottieView
                    source={Loading}
                    autoPlay
                    loop
                    style={{ width: 20, height: 20 }}
                  />
                ) : signUpFieldsValid.validUsername ? (
                  <MaterialIcons
                    name="check-circle"
                    size={20}
                    color="#34D399"
                  />
                ) : (
                  <MaterialIcons name="error" size={19} color="#EF4444" />
                )}
              </TouchableOpacity>
            )}
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
              onChangeText={(text) => {
                setShowEmailCriteria(true);
                setEmail(text);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(text)) {
                  setSignUpFieldsValid((prev) => ({
                    ...prev,
                    validEmail: true,
                  }));
                } else {
                  setSignUpFieldsValid((prev) => ({
                    ...prev,
                    validEmail: false,
                  }));
                }

                if (text.length === 0) {
                  setShowEmailCriteria(false);
                } else {
                  setShowEmailCriteria(true);
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 ml-3 text-white text-base"
            />
            {showEmailCriteria && (
              <TouchableOpacity disabled={true} className=" p-2">
                {signUpFieldsValid.validEmail ? (
                  <MaterialIcons
                    name="check-circle"
                    size={20}
                    color="#34D399"
                  />
                ) : (
                  <MaterialIcons name="error" size={19} color="#EF4444" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Password Input */}
        <View className="w-full mb-4">
          {showPasswordCriteria && (
            <View className="absolute top-[95%] left-10 z-10 w-[250px] h-auto bg-white p-2 rounded-md ">
              <View
                style={{
                  position: "absolute",
                  top: -10,
                  left: 10, // adjust as needed
                  width: 0,
                  height: 0,
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderBottomWidth: 10,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: "white",
                }}
              ></View>
              <View className="flex flex-row items-center justify-start gap-1">
                {passwordStrength.capital ? (
                  <MaterialIcons
                    name="check-circle"
                    size={17}
                    color="#34D399"
                  />
                ) : (
                  <MaterialIcons name="error" size={17} color="#EF4444" />
                )}

                <Text>Contain Capital letter</Text>
              </View>

              <View className="flex flex-row items-center justify-start gap-1">
                {passwordStrength.lowercase ? (
                  <MaterialIcons
                    name="check-circle"
                    size={17}
                    color="#34D399"
                  />
                ) : (
                  <MaterialIcons name="error" size={17} color="#EF4444" />
                )}
                <Text>Contain Lowercase letter</Text>
              </View>

              <View className="flex flex-row items-center justify-start gap-1">
                {passwordStrength.number ? (
                  <MaterialIcons
                    name="check-circle"
                    size={17}
                    color="#34D399"
                  />
                ) : (
                  <MaterialIcons name="error" size={17} color="#EF4444" />
                )}
                <Text>Contain Number</Text>
              </View>

              <View className="flex flex-row items-center justify-start gap-1">
                {passwordStrength.special ? (
                  <MaterialIcons
                    name="check-circle"
                    size={17}
                    color="#34D399"
                  />
                ) : (
                  <MaterialIcons name="error" size={17} color="#EF4444" />
                )}
                <Text>Contain Special Character</Text>
              </View>
              <View className="flex flex-row items-center justify-start gap-1">
                {passwordStrength.length ? (
                  <MaterialIcons
                    name="check-circle"
                    size={17}
                    color="#34D399"
                  />
                ) : (
                  <MaterialIcons name="error" size={17} color="#EF4444" />
                )}
                <Text>length 8-20 characters</Text>
              </View>
            </View>
          )}

          <Text className="text-white text-sm mb-2 ml-1">Password</Text>
          <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
            <MaterialIcons name="lock" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Create a password"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={updatePassword}
              secureTextEntry={!showPassword}
              className="flex-1 ml-3 text-white text-base"
              onBlur={() => setShowPasswordCriteria(false)}
            />
            <TouchableOpacity
              className=" p-2"
              onPress={() => setShowPassword(!showPassword)}
            >
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
          {showConfirmPasswordCriteria && (
            <View className="absolute z-10 top-[95%] left-10 w-[250px] h-auto bg-white p-2 rounded-md ">
              <View
                style={{
                  position: "absolute",
                  top: -10,
                  left: 10, // adjust as needed
                  width: 0,
                  height: 0,
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderBottomWidth: 10,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: "white",
                }}
              ></View>

              <View className="flex flex-row justify-start items-center gap-2">
                {confirmPasswordIndicator ? (
                  <MaterialIcons name="check-circle" size={17} color="green" />
                ) : (
                  <MaterialIcons name="cancel" size={17} color="red" />
                )}
                <Text>
                  {confirmPasswordIndicator
                    ? "Password match"
                    : "Password do not match"}
                </Text>
              </View>
            </View>
          )}

          <Text className="text-white text-sm mb-2 ml-1">Confirm Password</Text>
          <View className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
            <MaterialIcons name="lock-outline" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Confirm your password"
              placeholderTextColor="#6B7280"
              value={confirmPassword}
              onBlur={() => setShowConfirmPasswordCriteria(false)}
              onChangeText={(text) => {
                if (text.length === 0) {
                  setShowConfirmPasswordCriteria(false);
                }

                setShowConfirmPasswordCriteria(true);
                setConfirmPassword(text);

                const isMatch = text === password;
                if (isMatch) {
                  setConfirmPasswordIndicator(true);
                  setSignUpFieldsValid((prev) => ({
                    ...prev,
                    validConfirmPassword: true,
                  }));
                  setShowConfirmPasswordCriteria(false);
                } else {
                  setConfirmPasswordIndicator(false);
                  setSignUpFieldsValid((prev) => ({
                    ...prev,
                    validConfirmPassword: false,
                  }));
                }
              }}
              secureTextEntry={!showConfirmPassword}
              className="flex-1 ml-3 text-white text-base"
            />
            <TouchableOpacity
              className=" p-2"
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
          onPress={() => {
            const allValid = Object.values(signUpFieldsValid).every(Boolean);
            if (allValid) setAgreeToTerms(!agreeToTerms);
            else alert("Please fill all fields correctly before agreeing.");
          }}
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
          onPress={handleSignUp}
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
