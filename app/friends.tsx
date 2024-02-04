import React, { useState, useEffect } from "react";
import { Button, Text } from "react-native-paper";
import Wrapper from "./components/Wrapper";
import { View } from "react-native";
import { router } from "expo-router";
import { getFriends } from "./services/friendService";

export default function friends() {
  const [friendsList, setFriendsList] = useState<any>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await getFriends();
        setFriendsList(friends);
      } catch (error) {
        console.error("Failed to fetch friends: ", error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <Wrapper
      title="Friends"
      leftIcon="arrow-left"
      leftIconAction={() => router.back()}
    >
      <View className="justify-center items-center h-full w-full">
        <Text>FRIENDS</Text>
      </View>
    </Wrapper>
  );
}
