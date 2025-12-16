import LoginComponent from "@/components/LoginComponent";
import SignUpComponent from "@/components/SignUpComponent";
import React, { useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BG from "../../assets/images/bg.jpg";

const Profile = () => {
  const [clickSignUp, setClickSignUp] = useState<boolean | null>(true);
  const [isLogged, setIsLogged] = useState<boolean | null>(false);
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
          isLogged={setIsLogged}
        />
      );
    } else {
      return (
        <SignUpComponent
          signUpClick={toggleAuthComponents}
          fadeAnim={fadeAnimate}
          isLogged={setIsLogged}
        />
      );
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
        {isLogged ? <ProfileComponent /> : <IsLoggedComponent />}
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
