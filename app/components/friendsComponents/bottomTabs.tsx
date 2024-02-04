import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface BottomTabsProps {
  onTabPress: (tabName: string) => void;
  activeTab: string;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ onTabPress, activeTab }) => {
  const renderTab = (tabName: string, label: string) => {
    const isActive = activeTab === tabName;
    return (
      <TouchableOpacity
        onPress={() => onTabPress(tabName)}
        className={`flex-1 items-center p-2 ${
          isActive ? "bg-gray-800 rounded-lg" : ""
        }`}
      >
        <Text
          className={`text-white text-center ${isActive ? "font-bold" : ""}`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className={`flex-row bg-black p-1 rounded-xl m-3 shadow-lg mb-6`}>
      {renderTab("friends", "Friends")}
      {renderTab("requests", "Requests")}
    </View>
  );
};

export default BottomTabs;
