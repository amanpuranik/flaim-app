import React, { useState, useEffect } from "react";
import { Button, Text } from "react-native-paper";
import Wrapper from "./components/Wrapper";
import { View } from "react-native";
import { router } from "expo-router";
// import { getFriends } from "./services/friendService";
import BottomTabs from "./components/friendsComponents/bottomTabs";

export default function Friends() {
  const [activeTab, setActiveTab] = useState("friends");
  // const [friendsList, setFriendsList] = useState<any>([]);

  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     try {
  //       const friends = await getFriends();
  //       setFriendsList(friends);
  //     } catch (error) {
  //       console.error("Failed to fetch friends: ", error);
  //     }
  //   };

  //   fetchFriends();
  // }, []);

  const handleTabPress = (tabName: string) => {
    console.log(tabName);
    setActiveTab(tabName);
  };

  const friendsList = [{ name: "test" }];

  return (
    <Wrapper
      title="FLAIM"
      rightIcon="arrow-right"
      rightIconAction={() => router.push("/feed")}
    >
      <View style={{ flex: 1 }}>
        <Text>texst</Text>
      </View>
      <BottomTabs onTabPress={handleTabPress} activeTab={activeTab} />
    </Wrapper>
  );
}
