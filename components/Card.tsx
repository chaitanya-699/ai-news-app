import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Alert, Image, Pressable, Share, Text, View } from "react-native";
import Loading from "../assets/animations/Loading....json";
import Sound from "../assets/animations/Sound wave.json";
import ChatBottomSheet from "./ChatBottomSheet";

const Card = React.memo(({ imageUrl, source, title, summary, time }: any) => {
  const handlePress = () => {
    router.push("/screens/aichat");
  };

  const [saveLoading, setSaveLoading] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const [audioLoading, setAudioLoading] = React.useState(false);
  const [audioSaved, setAudioSaved] = React.useState(false);

  const [chatVisible, setChatVisible] = React.useState(false);

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: `📰 ${title}\n\n${summary}\n\nSource: ${source}\n\nShared from AI News App`,
        title: title,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log("Shared with activity type:", result.activityType);
        } else {
          // Shared
          console.log("Content shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log("Share dismissed");
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to share the news article");
      console.error("Share error:", error.message);
    }
  };

  const handleSavePress = () => {
    setSaveLoading(true);
    // Simulate a save action with a timeout
    setTimeout(() => {
      setSaveLoading(false);

      if (saved) {
        setSaved(false);
      } else {
        setSaved(true);
      }
    }, 1000);
  };

  const handleAudioPress = () => {
    setAudioLoading(true);
    // Simulate a save action with a timeout
    setTimeout(() => {
      setAudioLoading(false);
      if (audioSaved) {
        setAudioSaved(false);
      } else {
        setAudioSaved(true);
      }
    }, 1000);
  };

  return (
    <View className=" w-[97%] h-[100%] bg-[#3a93ae]  flex flex-1 flex-col justify-between rounded-[9px] shadow-lg mt-7 p-[2px]">
      <View className="absolute top-3 left-3 z-30 flex flex-row items-center justify-center rounded-full px-2 py-[0.5px] bg-[rgba(99,97,97,0.98)]  ">
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

      <Pressable
        className="flex-2 w-full h-[350px] rounded-[9px] overflow-hidden"
        onPress={handlePress}
      >
        <View className="absolute top-0 z-10 w-full h-[350px] bg-[rgba(0,0,0,0.5)] "></View>
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
      </Pressable>
      <Pressable className="w-full " onPress={handlePress}>
        <Text
          className="text-[19px] font-medium p-3 text-justify text-[rgb(255,255,255,0.8)]"
          numberOfLines={5}
        >
          {summary}
        </Text>
      </Pressable>
      <View className="flex flex-row justify-between items-center border-t-[0.5px] border-white">
        <Pressable
          className="bg-[rgb(255,255,255,0.2)] w-14 h-14 rounded-[100%] items-center justify-center m-2 mx-6"
          onPress={handleSavePress}
        >
          {!saveLoading ? (
            saved ? (
              <MaterialIcons name="bookmark-added" size={24} color="white" />
            ) : (
              <MaterialIcons name="bookmark" size={24} color="white" />
            )
          ) : (
            <LottieView
              source={Loading}
              direction={-1}
              autoPlay
              loop
              style={{ width: 50, height: 50 }}
            />
          )}
        </Pressable>

        <Pressable
          className="bg-[rgb(255,255,255,0.2)] w-14 h-14 rounded-[100%] items-center justify-center m-2 mx-6"
          onPress={handleAudioPress}
        >
          {audioLoading ? (
            <LottieView
              source={Loading}
              autoPlay
              loop
              style={{ width: 50, height: 50 }}
            />
          ) : audioSaved ? (
            <LottieView
              source={Sound}
              autoPlay
              loop
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <MaterialIcons name="headphones" size={24} color="white" />
          )}
        </Pressable>
        <Pressable
          className="bg-[rgb(255,255,255,0.2)] w-14 h-14 rounded-[100%] items-center justify-center m-2 mx-6"
          onPress={() => setChatVisible(true)}
        >
          <MaterialIcons name="chat" size={24} color="white" />
        </Pressable>
        <Pressable
          className="bg-[rgb(255,255,255,0.2)] w-14 h-14 rounded-[100%] items-center justify-center m-2 mx-6"
          onPress={handleSharePress}
        >
          <MaterialIcons name="share" size={24} color="white" />
        </Pressable>
      </View>

      <ChatBottomSheet
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
      />
    </View>
  );
});

Card.displayName = "Card";

export default Card;
