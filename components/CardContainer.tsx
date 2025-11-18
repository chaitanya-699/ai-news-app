import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import Card from "./Card";
import { CardItem, DATA } from "./Data";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Configuration
const CARD_HEIGHT = 620;
const CARD_WIDTH = 370;
const SPACING = 10;
const ITEM_SIZE = CARD_HEIGHT + SPACING;
const SWIPE_THRESHOLD = 5;

const CardContainer = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<CardItem>>(null);
  const currentIndex = useRef<number>(0);
  const scrollBeginY = useRef<number>(0);

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    currentIndex.current = Math.round(yOffset / ITEM_SIZE);
    scrollBeginY.current = yOffset;
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const diff = yOffset - scrollBeginY.current;
    let targetIndex = currentIndex.current;
    if (diff > SWIPE_THRESHOLD) targetIndex = currentIndex.current + 1;
    else if (diff < -SWIPE_THRESHOLD) targetIndex = currentIndex.current - 1;
    targetIndex = Math.max(0, Math.min(targetIndex, DATA.length - 1));
    flatListRef.current?.scrollToOffset({
      offset: targetIndex * ITEM_SIZE,
      animated: true,
    });
  };

  const renderItem = ({ item, index }: { item: CardItem; index: number }) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92],
      extrapolate: "clamp",
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.2, 1, 0.2],
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
        <Card />
      </Animated.View>
    );
  };

  const FlatListComponent = () => (
    <Animated.FlatList
      ref={flatListRef}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      snapToInterval={ITEM_SIZE}
      snapToAlignment="start"
      decelerationRate={0}
      bounces={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={10}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
      pagingEnabled={false}
    />
  );

  return <FlatListComponent />;
};

export default CardContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
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
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.8,
  },
});
