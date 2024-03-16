import React, { useState, useRef } from "react";
import { View, Dimensions, FlatList, TextInput, Text } from "react-native";
import BottomTabs from "./components/friends/BottomTabs";
import Wrapper from "./components/Wrapper";
import { router } from "expo-router";
import ItemsList from "./components/friends/ItemsList";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useTheme, IconButton } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActionSheet from "react-native-actions-sheet";
import EmptyState from "./components/friends/EmptyState";

const screenWidth = Dimensions.get("window").width;

export default function Friends() {
  const actionSheetRef = useRef(null);
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

  const sentRequestsList = [
    // Add mock data similar to other lists
    { name: "Alex Doe", username: "alexdoe" },
    { name: "Jane Smith", username: "janesmith" },
    { name: "suban", username: "ahmed" },
    { name: "sarosh", username: "heyy" },
    { name: "suban", username: "ahmed" },
    // Add more mock users as needed
  ];

  const renderFriendItem = ({ item }: any, listType: string) => {
    return (
      <ItemsList
        name={item.name}
        username={item.username}
        listType={listType}
        onRemove={() => {
          console.log("Remove friend:", item.name);
          // Implement friend removal logic
        }}
      />
    );
  };

  const renderRequestItem = ({ item }: any, listType: any) => (
    <ItemsList
      name={item.name}
      username={item.username}
      listType={listType}
      onRemove={() => {
        console.log("Remove request:", item.name);
        // Implement request removal logic
      }}
    />
  );

  const renderMutualsItem = ({ item }: any, listType: any) => (
    <ItemsList
      name={item.name}
      username={item.username}
      listType={listType}
      onRemove={() => {
        console.log("Remove mutuals:", item.name);
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
            style={{ color: clr.onSecondaryContainer }}
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
          {friendsList.length > 0 ? (
            <FlatList
              data={friendsList}
              renderItem={({ item }) => renderFriendItem({ item }, "friends")}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 60 }}
            />
          ) : (
            <EmptyState
              headerText="No friends"
              helpText="Use the search bar to add friends!"
            />
          )}
        </View>
        <View style={{ width: screenWidth }}>
          <View className="flex-row items-center ml-5 mr-2 mb-1 mt-[-10px] justify-between">
            <Text className="" style={{ color: clr.primary }}>
              {/* Add count in brackets here */}
              {"FRIEND REQUESTS (0)"}
            </Text>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {
                actionSheetRef.current?.show();
              }}
            >
              <Text className="text-white text-sm">Sent</Text>
              <IconButton
                className="ml-[-2px] mb-1"
                icon={"chevron-right"}
                iconColor={clr.primary}
                size={23}
              />
            </TouchableOpacity>
            <ActionSheet ref={actionSheetRef}>
              <View className="flex-row items-center w-full gap-x-24">
                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current?.hide();
                  }}
                >
                  <IconButton
                    icon={"chevron-down"}
                    iconColor={clr.secondary}
                    size={23}
                  />
                </TouchableOpacity>
                <Text className="text-center">Sent Requests</Text>
              </View>
              {sentRequestsList.length > 0 ? (
                <FlatList
                  style={{ backgroundColor: clr.primaryContainer }}
                  data={sentRequestsList}
                  renderItem={({ item }) => (
                    <ItemsList
                      name={item.name}
                      username={item.username}
                      listType="requests"
                      onRemove={() =>
                        console.log("Remove sent request:", item.name)
                      }
                    />
                  )}
                  keyExtractor={(item, index) => `sent-${index}`}
                  className="pt-3"
                />
              ) : (
                <View style={{ backgroundColor: clr.primaryContainer }}>
                  <EmptyState
                    headerText="No sent requests"
                    helpText="You havn't sent any requests yet!"
                  />
                </View>
              )}
            </ActionSheet>
          </View>
          {requestsList.length > 0 ? (
            <FlatList
              data={requestsList}
              renderItem={({ item }) => renderRequestItem({ item }, "requests")}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 60 }}
            />
          ) : (
            <EmptyState
              headerText="No pending requests"
              helpText="No one has added you yet!"
            />
          )}
        </View>
        <View style={{ width: screenWidth }}>
          {mutualsList.length > 0 ? (
            <FlatList
              data={mutualsList}
              renderItem={({ item }) => renderMutualsItem({ item }, "mutuals")}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 60 }}
            />
          ) : (
            <EmptyState
              headerText="No mutuals"
              helpText="Add more friends to meet mutuals!"
            />
          )}
        </View>
      </Animated.ScrollView>
      <View className="bg-white">
        <BottomTabs onTabPress={handleTabPress} scrollX={scrollX} />
      </View>
    </Wrapper>
  );
}
