import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Bg from '../assets/images/bg.jpg';
import Logo from '../assets/images/logo.jpg';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Card = React.memo(({ color }: any) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.99, { damping: 45 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 45 });
  };

  const callAI = () => {};
  const [bookmark, setBookmark] = useState<string>('');

  return (
    <AnimatedPressable
      style={[animatedStyle, { backgroundColor: color, elevation: 5 }]}
      className="flex flex-1 w-[94%] h-full rounded-3xl
      overflow-visible self-center mt-9 shadow-lg shadow-white/50 border-[0.2px] border-[rgba(255,255,255,0.1)]"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Pressable
        className="flex-1 justify-start bg-inherit"
        onPress={() => router.push({ pathname: '/screens/aichat',
  params: { color },})}
      >
        <Image source={Bg} className="w-[100%] h-[60%] rounded-t-3xl" />
        <View className="absolute top-[42%] w-full max-h-[105px] px-1">
          <Text
            className="text-3xl font-medium text-white py-0 px-1 bg-[rgba(0,0,0,0.1)]"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            Lorem ipsum cars sitamet consectetur adipisicing elit.consectetur
            cing elit.consectetur adipisicing elit.
          </Text>
        </View>
        <View className="self-start flex flex-row justify-center items-center gap-2">
          <View className=" flex flex-row justify-between items-center gap-1 py-[2px] bg-[#1a1f35] border-[0.5px] border-[#4fc3f7] rounded-[12px] px-1 my-2 ml-2 ">
            <Image
              source={Logo}
              className="w-4 h-4 rounded-full border-[0.5px] border-[#4fc3f7]"
            ></Image>
            <Text className="text-[#4fc3f7] font-semibold text-[12px]">
              Chaitanyapotti
            </Text>
          </View>
          <Text className="text-[14px] font-semibold text-white">2h ago.</Text>
        </View>
        {/* ANOTHER TEXT */}
        <View className="w-full">
          <Text
            className="text-white px-3 text-[18px]"
            numberOfLines={8}
            ellipsizeMode="tail"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam ex
            iusto libero totam tenetur sed. Molestias sapiente atque
            exercitationem incidunt deserunt, cupiditate perferendis officiis
            distinctio sint rerum fugit vel quis.libero totam tenetur sed.
            Molestias sapiente atque exercitationem incidunt deserunt,
            cupiditate perferendis officiis distinctio sint rerum fugit vel
            quis.rendis officiis distinctio sint rerum fugit vel quis.
          </Text>
        </View>
      </Pressable>
      <View className="flex flex-row justify-start items-center px-2 pt-2 m-1 border-t-[0.5px] border-white gap-2">
        <TouchableOpacity
          className="flex flex-row items-center justify-start bg-[#1a1f35] border-[0.5px] border-[#4fc3f7] rounded-2xl  h-[30px] "
          onPress={() => {
            if (bookmark === 'success') {
              setBookmark('');
              return;
            }

            setBookmark('loading');
            console.log('calling api');
            setTimeout(() => {
              setBookmark('success');
            }, 3000);
          }}
        >
          {bookmark === 'loading' ? (
            <View className="p-[8px]">
              <LottieView
                source={require('../assets/animations/star-loading.json')}
                autoPlay
                loop
                style={{ width: 15, height: 15 }}
                colorFilters={[
                  {
                    keypath: '**',
                    color: '#4fc3f7', // your highlight color
                  },
                ]}
              />
            </View>
          ) : bookmark === 'success' ? (
            <MaterialCommunityIcons
              name="bookmark"
              size={13}
              color="#4fc3f7"
              solid={true}
              className="p-2 pl-3"
            />
          ) : (
            <MaterialCommunityIcons
              name="bookmark"
              size={13}
              color="#4fc3f7"
              solid={true}
              className="p-2 pl-3"
            />
          )}
          <Text className="text-[#4fc3f7] font-semibold pr-2">Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row items-center justify-start bg-[#1a1f35] border-[0.5px] border-[#4fc3f7] rounded-2xl  h-[30px] gap-0">
          <MaterialCommunityIcons
            name="comment"
            size={13}
            color="#4fc3f7"
            solid={false}
            className="p-2 pl-3"
          />
          <Text className="text-[#4fc3f7] font-semibold pr-2">comments</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row items-center justify-start bg-[#1a1f35] border-[0.5px] border-[#4fc3f7] rounded-2xl  h-[30px] gap-0">
          <MaterialCommunityIcons
            name="waveform"
            size={13}
            color="#4fc3f7"
            solid={false}
            className="p-2 pl-3"
          />
          <Text className="text-[#4fc3f7] font-semibold pr-2">Listen</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row items-center justify-start bg-[#1a1f35] border-[0.5px] border-[#4fc3f7] rounded-2xl  h-[30px] gap-0">
          <MaterialCommunityIcons
            name="share"
            size={13}
            color="#4fc3f7"
            solid={false}
            className="p-2 pl-3"
          />
          <Text className="text-[#4fc3f7] font-semibold pr-2">Share</Text>
        </TouchableOpacity>
      </View>
    </AnimatedPressable>
  );
});

export default Card;

const styles = StyleSheet.create({});
