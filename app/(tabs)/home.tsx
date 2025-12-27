import { useAuth } from "@/auth/useAuth";
import HomeTabs from "@/components/HomeTabs";
import { baseUrl } from "@/constants/requests";
import axios from "axios";
import LottieView from "lottie-react-native";
import { memo, useEffect, useState } from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import Loading from "../../assets/animations/Loading....json";
import BG from "../../assets/images/bg.jpg";

const Home: React.FC = memo(() => {
  const { token, login } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   if (!token) return;
  //   setIsLoading(true);
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/auth/me`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.status === 200) {
  //         login({ token, user: response.data });
  //       }
  //       setIsLoading(false);
  //     } catch (error) {
  //       //  console.error("Error fetching user data:", error);
  //       //  alert("Server error. Please try again later. Or check your internet connection.");
  //     }
  //     // finally {
  //     //    setIsLoading(false);
  //     // }
  //   };

  //   fetchUser();
  // }, [token]);

  const LoadingComponent = () => {
    return (
      <View className="flex flex-1 items-center justify-center">
        <LottieView
          source={Loading}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  };

  return (
    <>
      <ImageBackground source={BG} style={styles.container}>
        <StatusBar barStyle="light-content" />
        {false ? <LoadingComponent /> : <HomeTabs />}
      </ImageBackground>
    </>
  );
});

Home.displayName = "Home";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
});

export default Home;
