import React, { useState, useRef } from "react";
import { View, Dimensions, FlatList, TextInput } from "react-native";
import BottomTabs from "./components/friends/BottomTabs";
import Wrapper from "./components/Wrapper";
import { router } from "expo-router";
import ItemsList from "./components/friends/ItemsList";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

export default function Friends() {
  let clr = useTheme().colors;
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<any>(null);
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleTabPress = (tabIndex: number) => {
    const newPosition = screenWidth * tabIndex;

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: newPosition,
        animated: true,
      });
    }
  };

  const handleSearchChange = (text: string) => {
    console.log("Search for:", text);
    setSearchQuery(text);
    // TODO: Implement the search filter logic
  };

  const friendsList = [
    { name: "Test", username: "tarela_o" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
    { name: "test", username: "yo" },
    { name: "gang", username: "ghani" },
  ];

  const requestsList = [
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
  ];

  const mutualsList = [
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
  ];

  const renderFriendItem = ({ item }: any) => {
    return (
      <ItemsList
        name={item.name}
        username={item.username}
        onRemove={() => {
          console.log("Remove friend:", item.name);
          // Implement friend removal logic
        }}
      />
    );
  };

  const renderRequestItem = ({ item }: any) => (
    <ItemsList
      name={item.name}
      username={item.username}
      onRemove={() => {
        console.log("Remove request:", item.name);
        // Implement request removal logic
      }}
    />
  );

  return (
    <Wrapper
      title="FLAIM"
      rightIcon="arrow-right"
      rightIconAction={() => router.push("/feed")}
    >
      <View className="px-4 pb-3">
        <View
          style={{ backgroundColor: clr.secondaryContainer }}
          className="flex flex-row items-center rounded-lg p-2"
        >
          <TextInput
            className="flex-1 ml-2"
            style={{ color: clr.primary }}
            onChangeText={handleSearchChange}
            placeholder="🔍  Add or search friends"
            value={searchQuery}
            placeholderTextColor={"white"}
          />
        </View>
      </View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <View style={{ width: screenWidth }} className="">
          <FlatList
            data={friendsList}
            renderItem={renderFriendItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        </View>
        <View style={{ width: screenWidth }}>
          <FlatList
            data={requestsList}
            renderItem={renderRequestItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        </View>
        <View style={{ width: screenWidth }}>
          <FlatList
            data={mutualsList}
            renderItem={renderRequestItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        </View>
      </Animated.ScrollView>
      <View className="bg-white">
        <BottomTabs onTabPress={handleTabPress} scrollX={scrollX} />
      </View>
    </Wrapper>
  );
}
