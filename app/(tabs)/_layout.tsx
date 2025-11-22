import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// === ICON COMPONENT ===
interface TabBarIconProps {
  focused: boolean;
  name: string;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
}

const TabBarIcon = memo<TabBarIconProps>(
  ({
    focused,
    name,
    activeColor = "#234C6A",
    inactiveColor = "white",
    backgroundColor = "#D2C1B6",
  }) => {
    const animationProgress = useSharedValue(0);

    useEffect(() => {
      animationProgress.value = withSpring(focused ? 1 : 0, {
        damping: 15,
        stiffness: 150,
      });
    }, [focused]);

    const containerStyle = useAnimatedStyle(() => {
      const scale = interpolate(animationProgress.value, [0, 1], [0.8, 1]);
      return { transform: [{ scale }] };
    });

    const bgStyle = useAnimatedStyle(() => {
      const opacity = interpolate(animationProgress.value, [0, 1], [0, 1]);
      const scale = interpolate(animationProgress.value, [0, 1], [0.7, 1]);
      return {
        opacity,
        transform: [{ scale }],
      };
    });

    const iconStyle = useAnimatedStyle(() => {
      const scale = interpolate(animationProgress.value, [0, 1], [0.72, 1]);
      return {
        transform: [{ scale }],
      };
    });

    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.View
          style={[styles.background, { backgroundColor }, bgStyle]}
        />
        <Animated.View style={iconStyle}>
          <FontAwesome5
            name={name}
            size={25}
            color={focused ? activeColor : inactiveColor}
          />
        </Animated.View>
      </Animated.View>
    );
  }
);

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        animation: "fade",
        lazy: false,
        freezeOnBlur: true,
        sceneStyle: {
          backgroundColor: "transparent",
        },
        tabBarShowLabel: false,
        // 🔥 DYNAMIC TAB BAR VISIBILITY HERE
        tabBarStyle:
         {
          width: "100%",
          position: "absolute",
          bottom: 0,
          height: 55,
          backgroundColor: "rgba(35, 76, 106, 0.5)",
          paddingHorizontal: 0,
          paddingVertical: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bookmark" />
          ),
        }}
      />
      <Tabs.Screen
        name="personlize"
        options={{
          title: "Personalize",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="heart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

// === STYLES ===
const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  background: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
