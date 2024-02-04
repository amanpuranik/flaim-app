import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import BottomTabs from "./components/friendsComponents/BottomTabs";
import Wrapper from "./components/Wrapper";
import { router } from "expo-router";
import ItemsList from "./components/friendsComponents/ItemsList";

const screenWidth = Dimensions.get("window").width - 45;

export default function Friends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("friends");
  const scrollRef = useRef<any>(null);

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: tabName === "friends" ? 0 : screenWidth,
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

  const renderFriendItem = ({ item }) => (
    <ItemsList
      name={item.name}
      username={item.username}
      onRemove={() => {
        console.log("Remove friend:", item.name);
        // Implement friend removal logic
      }}
    />
  );

  const renderRequestItem = ({ item }) => (
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
      <View className="px-2 pb-3">
        <View className="flex flex-row items-center rounded-lg bg-black p-2">
          <TextInput
            className="flex-1 ml-2 text-white"
            onChangeText={handleSearchChange}
            placeholder="🔍 Add or search friends"
            value={searchQuery}
          />
        </View>
      </View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onMomentumScrollEnd={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          setActiveTab(offsetX / screenWidth === 0 ? "friends" : "requests");
        }}
        className="flex-1"
      >
        <View style={{ width: screenWidth }}>
          <FlatList
            data={friendsList}
            renderItem={renderFriendItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{ width: screenWidth }}>
          <FlatList
            data={requestsList}
            renderItem={renderRequestItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <BottomTabs onTabPress={handleTabPress} activeTab={activeTab} />
    </Wrapper>
  );
}

// If we run into performance problems - to render only one tab at a time:

// import React, { useState, useRef } from 'react';
// import { ScrollView, View, FlatList, Dimensions } from 'react-native';
// import BottomTabs from './components/friendsComponents/BottomTabs';
// import Wrapper from './components/Wrapper';
// import { router } from 'expo-router';
// import ItemsList from './components/friendsComponents/ItemsList';

// const screenWidth = Dimensions.get('window').width - 40;

// export default function Friends() {
//   const [activeTab, setActiveTab] = useState('friends');
//   const scrollRef = useRef(null);

//   const handleTabPress = (tabName) => {
//     setActiveTab(tabName);
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         x: tabName === 'friends' ? 0 : screenWidth,
//         animated: true,
//       });
//     }
//   };

//   // Data for friends and requests
//   const friendsList = [/* ... */];
//   const requestsList = [/* ... */];

//   const renderItem = ({ item }) => (
//     <ItemsList
//       name={item.name}
//       username={item.username}
//       onRemove={() => {
//         console.log('Remove item:', item.name);
//       }}
//     />
//   );

//   return (
//     <Wrapper
//       title='FLAIM'
//       rightIcon='arrow-right'
//       rightIconAction={() => router.push('/feed')}
//     >
//       <ScrollView
//         horizontal={true}
//         pagingEnabled={true}
//         showsHorizontalScrollIndicator={false}
//         ref={scrollRef}
//         onMomentumScrollEnd={(e) => {
//           const offsetX = e.nativeEvent.contentOffset.x;
//           setActiveTab(offsetX / screenWidth === 0 ? 'friends' : 'requests');
//         }}
//         className='flex-1'
//       >
//         <FlatList
//           data={activeTab === 'friends' ? friendsList : requestsList}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal={false}
//           style={{ width: screenWidth }}
//         />
//       </ScrollView>
//       <BottomTabs onTabPress={handleTabPress} activeTab={activeTab} />
//     </Wrapper>
//   );
// }
