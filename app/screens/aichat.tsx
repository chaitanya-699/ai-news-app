import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Bg from '../../assets/images/bg.jpg';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const aichat = () => {
  const { color } = useLocalSearchParams();
  const bg = Array.isArray(color) ? color[0] : color;
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerButtonsAnim = useRef(
    [...Array(5)].map(() => new Animated.Value(0))
  ).current;
  const suggestionChipsAnim = useRef(
    [...Array(3)].map(() => new Animated.Value(0))
  ).current;

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

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
    Animated.stagger(
      80,
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
      Animated.stagger(
        100,
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

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const AnimatedButton = ({ children, index, style = {}, onPress }: any) => {
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
                scale:
                  headerButtonsAnim[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }) || 1,
              },
            ],
            opacity: headerButtonsAnim[index] || 1,
          },
        ]}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          activeOpacity={1}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const SuggestionChip = ({ text, index, onPress }: any) => {
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
              translateY:
                suggestionChipsAnim[index]?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }) || 0,
            },
          ],
          opacity: suggestionChipsAnim[index] || 1,
        }}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          activeOpacity={1}
        >
          <Text className="text-[15px] font-normal text-white px-3 py-1 mr-2 my-1 border-[0.5px] border-[#afafa76e] rounded-2xl">
            {text}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString() + '_ai',
        text: `I received your message: "${userMessage}". This is a simulated AI response. In a real implementation, this would connect to an AI API.`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 50);

    // Simulate AI response
    simulateAIResponse(userMessage.text);
  };

  const handleSuggestionPress = (suggestionText: string) => {
    setMessage(suggestionText);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share pressed');
  };

  const handleBack = () => {
    // Implement navigation back
    console.log('Back pressed');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const suggestions = [
    'What is your name?',
    'How can you help me?',
    'Tell me something interesting',
  ];
  console.log('bg color:', bg);

  return (
    <View className="flex-1 bg-black">
      <View style={{ backgroundColor: bg }} className="flex-1 w-full">
        {/* Fixed Background Image */}
        <Image
          source={Bg}
          className="absolute top-1 left-1 w-[98%] h-[350px] rounded-3xl border-[0.5px] border-[#afafa76e]"
        />

        <View className="absolute bottom-0 w-full h-auto bg-transparent z-10 items-center justify-center">
          <View className="flex-1 w-full p-2 rounded-3xl">
            <TextInput
              className="flex-1 w-[85%] min-h-[55px] bg-[#28282b] text-[17px] font-light text-white px-5 py-1 rounded-3xl border-[0.5px] border-[#afafa76e]"
              placeholder="ask ai"
              placeholderTextColor="white"
              keyboardType="default"
              multiline
              autoCorrect={true}
              autoCapitalize="none"
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              className="absolute right-2 top-[10px] bg-[#28282b] p-4 rounded-full border-[0.5px] border-[#afafa76e]"
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <FontAwesome5
                name="paper-plane"
                color={message.trim() ? 'white' : '#666'}
                size={22}
              />
            </TouchableOpacity>
          </View>
          {keyboardVisible ? <View className="h-[298px]" /> : null}
        </View>

        {/* Fixed Header */}
        <View className="absolute top-0 w-full h-24 flex-row justify-between items-end bg-transparent z-20">
          <AnimatedButton index={0} onPress={handleBack}>
            <FontAwesome5
              name="arrow-left"
              color="white"
              size={20}
              className="px-[9px] py-2 bg-[#000000aa] rounded-full ml-3"
            />
          </AnimatedButton>

          <View className="flex flex-row items-center justify-center gap-3 mr-3">
            <AnimatedButton index={1} onPress={toggleBookmark}>
              <FontAwesome5
                name="bookmark"
                solid={isBookmarked}
                color="white"
                size={20}
                className="px-3 py-[8px] bg-[#000000aa] rounded-full self-center"
              />
            </AnimatedButton>

            <AnimatedButton index={2}>
              <FontAwesome5
                name="headphones-alt"
                solid={false}
                color="white"
                size={20}
                className="px-[8px] py-[8px] bg-[#000000aa] rounded-full self-center"
              />
            </AnimatedButton>

            <AnimatedButton index={3} onPress={handleShare}>
              <FontAwesome5
                name="share-alt"
                solid={false}
                color="white"
                size={20}
                className="px-[9px] py-2 rounded-full bg-[#000000aa]"
              />
            </AnimatedButton>

            <AnimatedButton index={4}>
              <FontAwesome5
                name="ellipsis-v"
                solid={false}
                color="white"
                size={20}
                className="px-4 py-2 bg-[#000000aa] rounded-full"
              />
            </AnimatedButton>
          </View>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 w-full"
          contentContainerStyle={{
            paddingTop: 354,
          }}
        >
          <Animated.View
            className="bg-inherit px-3 pt-4"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text className="text-[33px] font-normal text-white mb-1 leading-tight">
              Lorem ipsum dolor sit jasj jha, amet consectetur adipisicing elit.
            </Text>

            <Text
              className="text-[17px] font-light text-white my-2"
              numberOfLines={isExpanded ? undefined : 6}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
              quasi reprehenderit omnis. Molestias atque autem a quo? Maxime
              fugiat eveniet, saepe praesentium corrupti laborum, accusantium
              consequuntur blanditiis id error accusamus. Magni saepe optio
              numquam quidem exercitationem quia quam quis repellat eaque
              dignissimos. Culpa eos mollitia a perspiciatis corporis quam omnis
              magni doloribus magnam praesentium corrupti laborum, accusantium
              {!isExpanded && ' . . .'}
            </Text>

            <TouchableOpacity onPress={toggleExpanded} className="mb-2">
              <Text className="text-[15px] font-normal text-white/70">
                {isExpanded ? 'Show less' : 'Read more'}
              </Text>
            </TouchableOpacity>

            {messages.length === 0 && (
              <ScrollView
                horizontal={true}
                className="flex flex-row mb-4"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <SuggestionChip
                    key={index}
                    text={suggestion}
                    index={index}
                    onPress={() => handleSuggestionPress(suggestion)}
                  />
                ))}
              </ScrollView>
            )}

            {/* Chat Messages */}
            <View className="flex flex-col gap-3 mt-4">
              {messages.map(msg => (
                <View
                  key={msg.id}
                  className={`flex flex-row ${
                    msg.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <View
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.isUser
                        ? 'bg-white/10 border-[0.5px] border-[#afafa76e]'
                        : 'bg-white/5 border-[0.5px] border-[#afafa76e]'
                    }`}
                  >
                    <Text className="text-[16px] text-white font-normal">
                      {msg.text}
                    </Text>
                  </View>
                </View>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <View className="flex flex-row justify-start">
                  <View className="bg-white/5 border-[0.5px] border-[#afafa76e] px-4 py-3 rounded-2xl">
                    <Text className="text-[16px] text-white/70">
                      AI is typing...
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {keyboardVisible ? (
              <View className="w-full h-14" />
            ) : (
              <View className="w-full h-24" />
            )}
          </Animated.View>
        </ScrollView>
        {keyboardVisible ? <View className="h-[320px]" /> : null}
      </View>
    </View>
  );
};

export default aichat;
