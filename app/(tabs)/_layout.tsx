import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { TabBarItems } from "../../interfaces/interfaces";

const _layout = () => {
  const CustomeTabBarIcon: any = (props: TabBarItems) => {
    if (props.focused) {
      return (
        <View className=" flex flex-row flex-1 gap-1 items-center justify-center rounded-full min-w-[92px] min-h-[50px] bg-[#1A1F35]">
          <MaterialCommunityIcons
            name={props.iconName}
            color="#4fc3f7"
            size={props.size + 2}
          />
          <Text className="text-[#4fc3f7] text-[12px]">{props.tabName}</Text>
        </View>
      );
    } else {
      return (
        <View className=" flex flex-row flex-1 gap-1 items-center justify-center rounded-full min-w-[102px] min-h-[50px]">
          <MaterialCommunityIcons
            name={props.iconName}
            color="white"
            size={props.size}
          />
          <Text className="text-white text-[12px]">{props.tabName}</Text>
        </View>
      );
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 6,
        },
        tabBarStyle: {
          backgroundColor: "#121827",
          borderRadius: 50,
          marginHorizontal: 10,
          height: 51,
          marginBottom: 15,
          position: "absolute",
          overflow: "hidden",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <CustomeTabBarIcon
              focused={focused}
              iconName="home-outline"
              size={20}
              tabName="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <CustomeTabBarIcon
              focused={focused}
              iconName="bookmark-outline"
              size={20}
              tabName="Saved"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="personlize"
        options={{
          headerShown: false,
          title: "Personlize",
          tabBarIcon: ({ focused }) => (
            <CustomeTabBarIcon
              focused={focused}
              iconName="tune-variant"
              size={20}
              tabName="Tune"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <CustomeTabBarIcon
              focused={focused}
              iconName="account-circle-outline"
              size={20}
              tabName="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
