import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import Card from "./Card";
import { CardItem, NEWS_DATA } from "./Data";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Configuration
const CARD_HEIGHT = 590;
const SPACING = 20;
const ITEM_SIZE = CARD_HEIGHT + SPACING;

const CardContainer = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<CardItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollBeginY = useRef<number>(0);
  const isScrolling = useRef(false);


  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollBeginY.current = e.nativeEvent.contentOffset.y;
    isScrolling.current = true;
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isScrolling.current) return;

    const currentOffset = e.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollBeginY.current;

    // Determine direction: positive = swipe up (next), negative = swipe down (prev)
    let targetIndex = currentIndex;

    if (Math.abs(diff) > 20) {
      // Minimum swipe threshold
      if (diff > 0) {
        // Swiped up - go to next card
        targetIndex = Math.min(currentIndex + 1, NEWS_DATA.length - 1);
      } else {
        // Swiped down - go to previous card
        targetIndex = Math.max(currentIndex - 1, 0);
      }
    }

    // Scroll to the target card
    flatListRef.current?.scrollToIndex({
      index: targetIndex,
      animated: true,
    });

    setCurrentIndex(targetIndex);
    isScrolling.current = false;
  };

  const renderItem = ({ item, index }: { item: CardItem; index: number }) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.97, 1, 0.97],
      extrapolate: "clamp",
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.1, 1, 0.1],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Card imageUrl={item.imageUrl} source={item.source} title={item.title}  summary={item.summary} time={item.time} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={NEWS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        // Disable automatic snapping - we control it manually
        pagingEnabled={false}
        bounces={false}
        scrollEnabled={true}
        // Smooth animations
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        // Manual control for one-card-per-swipe
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={2}
        windowSize={5}
        initialNumToRender={3}
        // Important: helps with scrollToIndex
        getItemLayout={(data, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
      />
    </View>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(20,20,30, 0.7)",
  },
  contentContainer: {
    paddingTop: (SCREEN_HEIGHT - CARD_HEIGHT) / 2 - SPACING / 2,
    paddingBottom: (SCREEN_HEIGHT - CARD_HEIGHT) / 2 - SPACING / 2,
  },
  cardContainer: {
    height: ITEM_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});
