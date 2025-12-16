import HomeTabs from "@/components/HomeTabs";
import { memo } from "react";
import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import BG from "../../assets/images/bg.jpg";
const Home: React.FC = memo(() => {
  return (
    <>
      <ImageBackground source={BG} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <HomeTabs />
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
