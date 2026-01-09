import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../auth/useAuth";

interface ChatBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

const { height } = Dimensions.get("window");
const SHEET_HEIGHT = height * 0.55;

const MOCK_COMMENTS = [
  {
    id: 1,
    username: "Sarah_Chen",
    location: "Tokyo, Japan",
    avatar: "👩🏻‍💼",
    comment: "This is incredibly insightful! Thanks for sharing this news.",
    time: "2h ago",
    likes: 42,
  },
  {
    id: 2,
    username: "MikeRodriguez",
    location: "New York, USA",
    avatar: "👨🏽‍💻",
    comment:
      "I've been following this story closely. The implications are massive for our industry.",
    time: "5h ago",
    likes: 38,
  },
  {
    id: 3,
    username: "Priya_Sharma",
    location: "Mumbai, India",
    avatar: "👩🏾",
    comment: "Finally someone reporting on this! Great coverage.",
    time: "8h ago",
    likes: 27,
  },
  {
    id: 4,
    username: "LucasBerlin",
    location: "Berlin, Germany",
    avatar: "👨🏼",
    comment:
      "We discussed this in our team meeting today. Very relevant to our current project.",
    time: "12h ago",
    likes: 19,
  },
  {
    id: 5,
    username: "Emma_Wilson",
    location: "London, UK",
    avatar: "👩🏻",
    comment: "This changes everything! Can't wait to see how this develops.",
    time: "1d ago",
    likes: 56,
  },
  {
    id: 6,
    username: "Carlos_Silva",
    location: "São Paulo, Brazil",
    avatar: "👨🏽",
    comment:
      "Impressive work by the team! This will impact millions of people globally.",
    time: "1d ago",
    likes: 31,
  },
  {
    id: 7,
    username: "AishaKhan",
    location: "Dubai, UAE",
    avatar: "👩🏽‍🦱",
    comment: "Shared this with my colleagues. Everyone should read this!",
    time: "2d ago",
    likes: 23,
  },
];

const ChatBottomSheet: React.FC<ChatBottomSheetProps> = ({
  visible,
  onClose,
}) => {
  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePostComment = () => {
    if (!commentText.trim() || !user) return;

    const newComment = {
      id: comments.length + 1,
      username: user.username || user.email?.split("@")[0] || "User",
      location: "Your Location",
      avatar: "👤",
      comment: commentText.trim(),
      time: "Just now",
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    Keyboard.dismiss();

    // Scroll to top to show the new comment
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  };

  useEffect(() => {
    if (visible) {
      setComments(MOCK_COMMENTS);
    }
  }, [visible]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : SHEET_HEIGHT,
      duration: visible ? 350 : 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View className="flex-1">
        {/* Background Overlay */}
        <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />

        {/* Bottom Sheet */}
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            height: SHEET_HEIGHT,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          className="bg-[#1e1e1e] rounded-t-3xl"
        >
          {/* Header */}
          <View className="flex flex-row items-center justify-between px-5 py-4 border-b border-gray-700">
            <View className="flex flex-row items-center gap-3">
              <View className="bg-cyan-600 w-10 h-10 rounded-full items-center justify-center">
                <MaterialIcons name="comment" size={22} color="white" />
              </View>
              <View>
                <Text className="text-white text-lg font-semibold">
                  Comments
                </Text>
                <Text className="text-gray-400 text-xs">
                  {comments.length} global reactions
                </Text>
              </View>
            </View>
            <Pressable
              onPress={onClose}
              className="bg-gray-700 w-8 h-8 rounded-full items-center justify-center"
            >
              <MaterialIcons name="close" size={18} color="white" />
            </Pressable>
          </View>

          {/* Comment Input - Only show if user is logged in */}
          {user && (
            <View className="px-4 py-3 border-b border-gray-700 bg-gray-800/40">
              <View className="flex flex-row items-center gap-3">
                <View className="bg-cyan-600 w-10 h-10 rounded-full items-center justify-center">
                  <Text className="text-white text-lg">
                    {user.username?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      "👤"}
                  </Text>
                </View>
                <View className="flex-1 flex flex-row items-center bg-gray-700 rounded-full px-4 py-2">
                  <TextInput
                    className="flex-1 text-white text-base"
                    placeholder="Add a comment..."
                    placeholderTextColor="#9ca3af"
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                    maxLength={500}
                  />
                  <Pressable
                    onPress={handlePostComment}
                    disabled={!commentText.trim()}
                    className={`ml-2 ${
                      commentText.trim() ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <MaterialIcons
                      name="send"
                      size={20}
                      color={commentText.trim() ? "#06b6d4" : "#9ca3af"}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}

          {/* Login prompt if user is not logged in */}
          {!user && (
            <View className="px-4 py-3 border-b border-gray-700 bg-gray-800/40">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-gray-400 text-sm">
                  Sign in to join the conversation
                </Text>
                <Pressable
                  className="bg-cyan-600 px-4 py-2 rounded-full"
                  onPress={() => {
                    onClose();
                    router.push("/(tabs)/profile");
                  }}
                >
                  <Text className="text-white font-semibold text-sm">
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Scrollable Content */}
          <ScrollView
            ref={scrollViewRef}
            className="px-4 pt-3"
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
          >
            {comments.map((comment) => (
              <View
                key={comment.id}
                className="bg-gray-800/60 mb-4 rounded-xl p-4"
              >
                <View className="flex flex-row justify-between mb-2">
                  <View className="flex flex-row items-center gap-3">
                    <Text className="text-3xl">{comment.avatar}</Text>
                    <View>
                      <Text className="text-white font-semibold">
                        {comment.username}
                      </Text>
                      <View className="flex flex-row items-center gap-1">
                        <MaterialIcons
                          name="location-on"
                          size={12}
                          color="#9ca3af"
                        />
                        <Text className="text-gray-400 text-xs">
                          {comment.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text className="text-gray-500 text-xs">{comment.time}</Text>
                </View>

                <Text className="text-gray-200 mb-3 leading-6">
                  {comment.comment}
                </Text>

                <View className="flex flex-row items-center gap-1">
                  <MaterialIcons name="favorite" size={16} color="#ef4444" />
                  <Text className="text-gray-400 text-sm">
                    {comment.likes} likes
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ChatBottomSheet;
