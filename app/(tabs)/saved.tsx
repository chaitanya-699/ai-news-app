import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { ImageBackground } from "expo-image";
import BG from "../../assets/images/bg.jpg";
const Personlize = () => {
  return (
    <ImageBackground source={BG} style={styles.container}>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
});
export default Personlize;
