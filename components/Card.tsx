import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const Card = React.memo(({ imageUrl, source, title, summary, time }: any) => {
  const icons: any = ["bookmark", "headphones", "chat", "more-vert"];
  const handlePress = () => {
    router.push("/screens/aichat");
  };

  return (
    <View className=" w-[97%] h-[92%] bg-[#3a93ae]  flex flex-1 flex-col justify-between rounded-[9px] shadow-lg mt-7 p-[2px]">
      <Pressable
        className="flex-2 w-full h-[380px] rounded-[9px] overflow-hidden"
        onPress={handlePress}
      >
        <View className="absolute top-0 z-10 w-full h-[380px] bg-[rgba(0,0,0,0.5)] ">

        </View>
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full rounded-[9px] ml-[0.2px]"
        />

        <View className="absolute bottom-4 left-3 z-20 max-w-[90%] max-h-[150px] bg-transparent p-1 ">
          <Text
            className="text-white text-3xl font-medium "
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>
        <View className="absolute top-3 left-3 z-10 flex flex-row items-center justify-center rounded-full px-2 py-[0.5px] bg-[rgba(99,97,97,0.98)]  ">
          <Text className="text-[15px] text-white">{source}</Text>
          <Text className="text-[13px] text-white"> • </Text>
          <Text className="text-[12px] text-white">{time}</Text>
          <MaterialIcons
            name="open-in-new"
            size={13}
            color="white"
            className="pl-1"
          />
        </View>
      </Pressable>
      <Pressable
        className="w-full "
        onPress={handlePress}
      >
        <Text
          className="text-[19px] font-medium p-3 text-justify text-[rgb(255,255,255,0.8)]"
          numberOfLines={5}
        >
          {summary}
        </Text>
      </Pressable>
      <View className="flex flex-row justify-between items-center border-t-[0.5px] border-white">
        {icons.map((icon: any) => (
          <Pressable
            key={icon}
            className="bg-[rgb(255,255,255,0.2)] w-14 h-14 rounded-[100%] items-center justify-center m-2 mx-6"
          >
            <MaterialIcons name={icon} size={24} color="white" />
          </Pressable>
        ))}
      </View>
    </View>
  );
});

Card.displayName = "Card";

export default Card;
