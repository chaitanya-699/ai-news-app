import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useRef } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import CardContainer from "./CardContainer";
import { CATEGORIES } from "./Data";

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const itemRefs = useRef<{ [key: number]: View | null }>({});
  const navigationRef = useRef<any>(null);

  const scrollToActiveItem = (index: number) => {
    const itemRef = itemRefs.current[index];
    if (itemRef && scrollViewRef.current) {
      itemRef.measureLayout(
        scrollViewRef.current as any,
        (x, y, width, height) => {
          scrollViewRef.current?.scrollTo({
            x: x - 50,
            animated: true,
          });
        },
        () => {}
      );
    }
  };

  useEffect(() => {
    scrollToActiveItem(activeIndex);
  }, [activeIndex]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          alignItems: "center",
          gap: 8,
        }}
        className="absolute top-[58px]  z-20 h-10 bg-transparent"
      >
        {CATEGORIES.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Pressable
              key={item}
              onPress={() => {
                setActiveIndex(index);
                navigationRef.current?.navigate(item);
              }}
            >
              <View
                ref={(ref) => {
                  itemRefs.current[index] = ref;
                }}
                className={`px-3 py-1 rounded-3xl ${
                  isActive ? "bg-slate-700" : "bg-black"
                }`}
              >
                <Text
                  className={`text-[16px] ${
                    isActive ? "text-[#64e8d6]" : "text-[#EEEEEE]"
                  } font-semibold p-[2px]`}
                >
                  {item}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,
          tabBarStyle: { height: 0 },
          sceneStyle: { backgroundColor: "transparent" },
        }}
        screenListeners={({ navigation }) => {
          navigationRef.current = navigation;
          return {
            state: (e) => {
              const index = e.data.state.index;
              setActiveIndex(index);
            },
          };
        }}
      >
        {CATEGORIES.map((item) => {
          return (
            <Tab.Screen
              key={item}
              name={item}
              children={() => <CardContainer />}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
};

export default HomeTabs;
