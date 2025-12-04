import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Bg from "../../assets/images/bg.jpg";

// Constants
const KEYBOARD_OFFSET = Platform.OS === "ios" ? 90 : 0;
const TYPING_DELAY = 1500;
const MAX_MESSAGE_LENGTH = 1000;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

const AiChat: React.FC = () => {
  const { color } = useLocalSearchParams();
  const bg = Array.isArray(color) ? color[0] : color || "#1a1a1a";

  // State
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  // Keyboard handling
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardHeight(0)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Simulate AI response
  const simulateAIResponse = useCallback((userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's what I think...",
        "Great question! Based on what you've told me...",
        "Let me break that down for you in a helpful way.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const aiResponse: Message = {
        id: Date.now().toString() + "_ai",
        text: `${randomResponse} You said: "${userMessage}". This is a simulated response. In production, this would connect to a real AI API like Claude, GPT, or Gemini.`,
        isUser: false,
        timestamp: new Date(),
        status: "sent",
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, TYPING_DELAY);
  }, []);

  // Send message
  const sendMessage = useCallback(() => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      Alert.alert(
        "Message too long",
        `Please keep messages under ${MAX_MESSAGE_LENGTH} characters.`
      );
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      isUser: true,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    Keyboard.dismiss();

    simulateAIResponse(trimmedMessage);
  }, [message, simulateAIResponse]);

  // Handle suggestion press
  const handleSuggestionPress = useCallback((suggestionText: string) => {
    setMessage(suggestionText);
    inputRef.current?.focus();
  }, []);

  // Toggle bookmark
  const toggleBookmark = useCallback(() => {
    setIsBookmarked((prev) => !prev);
  }, []);

  // Handle share
  const handleShare = useCallback(async () => {
    try {
      const chatText = messages
        .map((msg) => `${msg.isUser ? "You" : "AI"}: ${msg.text}`)
        .join("\n\n");

      await Share.share({
        message: chatText || "Check out this AI chat!",
        title: "AI Chat Conversation",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }, [messages]);

  // Handle back
  const handleBack = useCallback(() => {
    if (messages.length > 0) {
      Alert.alert(
        "Leave Chat?",
        "Are you sure you want to go back? Your conversation will be lost.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Leave", style: "destructive", onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  }, [messages]);

  // Toggle expanded text
  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const suggestions = [
    "What is your name?",
    "How can you help me?",
    "Tell me something interesting",
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={KEYBOARD_OFFSET}
      className="flex-1 bg-black"
    >
      <View style={{ backgroundColor: bg }} className="flex-1 w-full">
        {/* Background Image */}
        <Image
          source={Bg}
          className="absolute top-1 left-1 w-[98%] h-[350px] rounded-3xl border-[0.5px] border-[#afafa76e]"
          resizeMode="cover"
        />

        {/* Header */}
        <View className="absolute top-0 w-full h-24 flex-row justify-between items-end bg-transparent z-20">
          <TouchableOpacity
            onPress={handleBack}
            accessibilityLabel="Go back"
            accessibilityRole="button"
            activeOpacity={0.7}
          >
            <View className="px-[9px] py-2 bg-[#000000aa] rounded-full ml-3">
              <FontAwesome5 name="arrow-left" color="white" size={20} />
            </View>
          </TouchableOpacity>

          <View className="flex flex-row items-center justify-center gap-3 mr-3">
            <TouchableOpacity
              onPress={toggleBookmark}
              accessibilityLabel={
                isBookmarked ? "Remove bookmark" : "Add bookmark"
              }
              accessibilityRole="button"
              activeOpacity={0.7}
            >
              <View className="px-3 py-[8px] bg-[#000000aa] rounded-full">
                <FontAwesome5
                  name="bookmark"
                  solid={isBookmarked}
                  color="white"
                  size={20}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityLabel="Voice mode"
              accessibilityRole="button"
              activeOpacity={0.7}
            >
              <View className="px-[8px] py-[8px] bg-[#000000aa] rounded-full">
                <FontAwesome5 name="headphones-alt" color="white" size={20} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShare}
              accessibilityLabel="Share conversation"
              accessibilityRole="button"
              activeOpacity={0.7}
            >
              <View className="px-[9px] py-2 rounded-full bg-[#000000aa]">
                <FontAwesome5 name="share-alt" color="white" size={20} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityLabel="More options"
              accessibilityRole="button"
              activeOpacity={0.7}
            >
              <View className="px-4 py-2 bg-[#000000aa] rounded-full">
                <FontAwesome5 name="ellipsis-v" color="white" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 w-full"
          contentContainerStyle={{ paddingTop: 354, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 w-full bg-black">
            <View
              className="px-3 pt-4"
              style={{
                backgroundColor: bg,
              }}
            >
              <Text className="text-[33px] font-normal text-white mb-1 leading-tight">
                Lorem ipsum dolor sit jasj jha, amet consectetur adipisicing
                elit.
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
                dignissimos. Culpa eos mollitia a perspiciatis corporis quam
                omnis magni doloribus magnam praesentium corrupti laborum,
                accusantium
                {!isExpanded && " . . ."}
              </Text>

              <TouchableOpacity onPress={toggleExpanded} className="mb-2">
                <Text className="text-[15px] font-normal text-white/70">
                  {isExpanded ? "Show less" : "Read more"}
                </Text>
              </TouchableOpacity>

              {/* Suggestion Chips */}
              {messages.length === 0 && (
                <ScrollView
                  horizontal
                  className="flex flex-row mb-4"
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSuggestionPress(suggestion)}
                      activeOpacity={0.7}
                    >
                      <Text className="text-[15px] font-normal text-white px-3 py-1 mr-2 my-1 border-[0.5px] border-[#afafa76e] rounded-2xl">
                        {suggestion}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              {/* Chat Messages */}
              <View className="flex flex-col gap-3 mt-4">
                {messages.map((msg) => (
                  <View
                    key={msg.id}
                    className={`flex flex-row ${
                      msg.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <View
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.isUser
                          ? "bg-white/10 border-[0.5px] border-[#afafa76e]"
                          : "bg-white/5 border-[0.5px] border-[#afafa76e]"
                      }`}
                    >
                      <Text className="text-[16px] text-white font-normal">
                        {msg.text}
                      </Text>
                      <Text className="text-[11px] text-white/40 mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
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
            </View>
          </View>
        </ScrollView>

        {/* Input Area */}
        <View
          className="absolute bottom-0 w-full bg-transparent z-10 items-center justify-center"
          style={{
            paddingBottom:
              keyboardHeight > 0 ? keyboardHeight - KEYBOARD_OFFSET : 0,
          }}
        >
          <View className="w-full p-2 rounded-3xl">
            <TextInput
              ref={inputRef}
              className="w-[85%] min-h-[55px] max-h-[120px] bg-[#28282b] text-[17px] font-light text-white px-5 py-3 rounded-3xl border-[0.5px] border-[#afafa76e]"
              placeholder="ask ai"
              placeholderTextColor="white"
              multiline
              autoCorrect
              autoCapitalize="sentences"
              maxLength={MAX_MESSAGE_LENGTH}
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              className="absolute right-2 top-[10px] bg-[#28282b] p-4 rounded-full border-[0.5px] border-[#afafa76e]"
              onPress={sendMessage}
              disabled={!message.trim()}
              accessibilityLabel="Send message"
              accessibilityRole="button"
            >
              <FontAwesome5
                name="paper-plane"
                color={message.trim() ? "white" : "#666"}
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AiChat;
