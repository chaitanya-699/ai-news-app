import LoginComponent from "@/components/LoginComponent";
import SignUpComponent from "@/components/SignUpComponent";
import React, { useRef, useState } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import BG from "../../assets/images/bg.jpg";

const Profile = () => {
  const [clickSignUp, setClickSignUp] = useState<boolean | null>(true);
  const [isLogged, setIsLogged] = useState<boolean | null>(true);
  const fadeAnimate = useRef(new Animated.Value(1)).current;

  const toggleAuthComponents: any = () => {
    Animated.timing(fadeAnimate, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setClickSignUp((prev) => !prev);

      Animated.timing(fadeAnimate, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const IsLoggedComponent: any = () => {
    if (clickSignUp) {
      return (
        <LoginComponent
          signUpClick={toggleAuthComponents}
          fadeAnim={fadeAnimate}
        />
      );
    } else {
      return (
        <SignUpComponent
          signUpClick={toggleAuthComponents}
          fadeAnim={fadeAnimate}
        />
      );
    }
  };

  const ProfileComponent: any = () => <View></View>;

  return (
      <ImageBackground
        source={BG}
        style={styles.container}
        className="items-center justify-center"
      >
        {isLogged ? <IsLoggedComponent /> : <ProfileComponent />}
      </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
});
export default Profile;
