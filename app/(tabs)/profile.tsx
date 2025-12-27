import { useAuth } from "@/auth/useAuth";
import ForgotPasswordComponent from "@/components/ForgotPasswordComponent";
import ForgotUsernameComponent from "@/components/ForgotUsernameComponent";
import LoginComponent from "@/components/LoginComponent";
import SignUpComponent from "@/components/SignUpComponent";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BG from "../../assets/images/bg.jpg";

const Profile = () => {
  const [authView, setAuthView] = useState<
    "login" | "signup" | "forgotPassword" | "forgotUsername"
  >("login");
  const fadeAnimate = useRef(new Animated.Value(1)).current;
  const { user } = useAuth();

  useEffect(() => {
    if (user != null) {
    }
  }, [user]);
  
  const toggleAuthComponents: any = (view: "login" | "signup") => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setAuthView(view);

      Animated.timing(fadeAnimate, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleForgotPassword = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setAuthView("forgotPassword");

      Animated.timing(fadeAnimate, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleForgotUsername = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setAuthView("forgotUsername");

      Animated.timing(fadeAnimate, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBackToLogin = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setAuthView("login");

      Animated.timing(fadeAnimate, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const IsLoggedComponent: any = () => {
    switch (authView) {
      case "login":
        return (
          <LoginComponent
            signUpClick={() => toggleAuthComponents("signup")}
            fadeAnim={fadeAnimate}
            onForgotPassword={handleForgotPassword}
            onForgotUsername={handleForgotUsername}
          />
        );
      case "signup":
        return (
          <SignUpComponent
            signUpClick={() => toggleAuthComponents("login")}
            fadeAnim={fadeAnimate}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPasswordComponent
            onBack={handleBackToLogin}
            fadeAnim={fadeAnimate}
          />
        );
      case "forgotUsername":
        return (
          <ForgotUsernameComponent
            onBack={handleBackToLogin}
            fadeAnim={fadeAnimate}
          />
        );
      default:
        return null;
    }
  };

  const ProfileComponent: any = () => (
    <View>
      <Text className="text-white text-3xl font-bold">
        Welcome to your Profile!
      </Text>
    </View>
  );

  return (
    <Animated.View style={{ flex: 1 }}>
      <ImageBackground
        source={BG}
        style={styles.container}
        className="items-center justify-center"
      >
        {user != null ? <ProfileComponent /> : <IsLoggedComponent />}
      </ImageBackground>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
});
export default Profile;
