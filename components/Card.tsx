import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Bg from "../assets/images/bg.jpg";
import Logo from "../assets/images/logo.jpg";


const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Card = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.990, { damping: 45 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 45 });
  };

  return (
    <AnimatedPressable
      style={animatedStyle}
      className="flex flex-col w-[95%] h-full border-[1px] border-white rounded-[7px] bg-blue-400"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => console.log("Pressed")}
    >
      <View className="flex-1 justify-start items-center bg-inherit">
        <Image source={Bg} className="w-[96%] h-[50%] mt-2 rounded-[7px]" />
        <View className=" w-full max-h-[120px] p-1">
          <Text className="text-4xl font-bold text-white py-2 px-1">
            Lorem ipsum cars sitamet consectetur adipisicing elit.
          </Text>
        </View>
        {/* ANOTHER TEXT */}
        <View className="w-full">
          <Text className="text-white px-3 text-[18px] h-[155px] ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam ex
            iusto libero totam tenetur sed. Molestias sapiente atque
            exercitationem incidunt deserunt, cupiditate perferendis officiis
            distinctio sint rerum fugit vel quis.libero totam tenetur sed.
            Molestias sapiente atque exercitationem incidunt deserunt,
            cupiditate perferendis officiis distinctio sint rerum fugit vel
            quis.
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center  mb-3 px-3">
        <View className="flex flex-row justify-between items-center gap-2 py-[3px] pr-[12px] bg-[#1a1f35] border border-[#4fc3f7] rounded-[12px] pl-2">
          <Image
            source={Logo}
            className="w-6 h-6 rounded-full border border-[#4fc3f7]"
          ></Image>
          <Text className="text-[#4fc3f7] font-semibold text-[12px]">
            ChaitanyaPotti
          </Text>
        </View>
        <View className="flex flex-row justify-center items-center gap-6">
          <FontAwesome5
            name="bookmark"
            size={18}
            color="#4fc3f7"
            solid={false}
            className=" px-3 py-[8px] bg-[#1a1f35] border border-[#4fc3f7] text-[#4fc3f7] rounded-full self-center"
          />
          <FontAwesome5
            name="comment"
            size={18}
            color="#4fc3f7"
            solid={false}
            className="px-[8px] py-[8px] bg-[#1a1f35] border border-[#4fc3f7] text-[#4fc3f7] rounded-full self-center"
          />
          <FontAwesome5
            name="headphones"
            size={18}
            color="#4fc3f7"
            solid={false}
            className="px-[8px] py-[8px] bg-[#1a1f35] border border-[#4fc3f7] text-[#4fc3f7] rounded-full self-center"
          />
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default Card;

const styles = StyleSheet.create({});
