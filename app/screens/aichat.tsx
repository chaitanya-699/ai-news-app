import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing
} from "react-native";
import Bg from "../../assets/images/bg.jpg";

const aichat = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerButtonsAnim = useRef([...Array(5)].map(() => new Animated.Value(0))).current;
  const suggestionChipsAnim = useRef([...Array(3)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Fade in and slide up content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // Stagger header buttons
    Animated.stagger(80,
      headerButtonsAnim.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        })
      )
    ).start();

    // Stagger suggestion chips
    setTimeout(() => {
      Animated.stagger(100,
        suggestionChipsAnim.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 80,
            friction: 7,
          })
        )
      ).start();
    }, 400);
  }, []);

  const AnimatedButton = ({ children, index, style = {} }:any) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    };

    return (
      <Animated.View
        style={[
          style,
          {
            transform: [
              { scale: scaleAnim },
              {
                scale: headerButtonsAnim[index]?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }) || 1
              }
            ],
            opacity: headerButtonsAnim[index] || 1,
          },
        ]}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const SuggestionChip = ({ text, index }:any) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    };

    return (
      <Animated.View
        style={{
          transform: [
            { scale: scaleAnim },
            {
              translateY: suggestionChipsAnim[index]?.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }) || 0,
            }
          ],
          opacity: suggestionChipsAnim[index] || 1,
        }}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <Text className="text-[15px] font-normal text-white px-3 py-1 mr-2 my-1 border-[0.5px] border-[#afafa76e] rounded-2xl">
            {text}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 w-full bg-[#28282b]">
      {/* Fixed Background Image */}
      <Image
        source={Bg}
        className="absolute top-1 left-1 w-[98%] h-[350px] rounded-3xl border-[0.5px] border-[#afafa76e]"
      />

      {/* Fixed Header - overlays on image */}
      <View className="absolute top-0 w-full h-24 flex-row justify-between items-end bg-transparent z-20">
        <AnimatedButton index={0}>
          <FontAwesome5
            name="arrow-left"
            color="white"
            size={18}
            className="px-[9px] py-2 bg-[#28282b] rounded-full ml-3"
          />
        </AnimatedButton>

        <View className="flex flex-row items-center justify-center gap-3 mr-3">
          <AnimatedButton index={1}>
            <FontAwesome5
              name="bookmark"
              solid={false}
              color="white"
              size={18}
              className="px-3 py-[8px] bg-[#28282b] rounded-full self-center"
            />
          </AnimatedButton>

          <AnimatedButton index={2}>
            <FontAwesome5
              name="headphones-alt"
              solid={false}
              color="white"
              size={18}
              className="px-[8px] py-[8px] bg-[#28282b] rounded-full self-center"
            />
          </AnimatedButton>

          <AnimatedButton index={3}>
            <FontAwesome5
              name="share-alt"
              solid={false}
              color="white"
              size={18}
              className="px-[9px] py-2 rounded-full bg-[#28282b]"
            />
          </AnimatedButton>

          <AnimatedButton index={4}>
            <FontAwesome5
              name="ellipsis-v"
              solid={false}
              color="white"
              size={18}
              className="px-4 py-2 bg-[#28282b] rounded-full"
            />
          </AnimatedButton>
        </View>
      </View>

      {/* Scrollable Body */}
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{ paddingTop: 354 }}
      >
        <Animated.View
          className="bg-[#28282b] px-3 pt-4"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text className="text-[33px] font-semibold text-white mb-2 leading-tight">
            Lorem ipsum dolor sit jasj jha , amet consectetur adipisicing elit.
          </Text>
          <Text className="text-[18px] font-medium text-white my-2 leading-tight">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
            quasi reprehenderit omnis. Molestias atque autem a quo? Maxime
            fugiat eveniet, saepe praesentium corrupti laborum, accusantium
            consequuntur blanditiis id error accusamus. Magni saepe optio
            numquam quidem exercitationem quia quam quis repellat eaque
            dignissimos. Culpa eos mollitia a perspiciatis corporis quam omnis
            magni doloribus magnam
          </Text>

          <ScrollView
            horizontal={true}
            className="flex flex-row"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SuggestionChip text="what is your name ?" index={0} />
            <SuggestionChip text="what is your name ?" index={1} />
            <SuggestionChip text="what is your name ?" index={2} />
          </ScrollView>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default aichat;
