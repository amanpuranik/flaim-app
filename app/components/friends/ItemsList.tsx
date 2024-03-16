import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { useTheme, IconButton } from "react-native-paper";

interface ItemsListProps {
  name: string;
  username: string;
  onRemove: () => void;
  profilePicture: string;
  listType: string;
}

const ItemsList: React.FC<ItemsListProps> = ({
  name,
  username,
  onRemove,
  profilePicture,
  listType,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  let clr = useTheme().colors;
  const handleAddPress = () => {
    setIsAdded(!isAdded);
    // Send request from here
  };

  const renderDeleteMessage = () => {
    if (listType === "friends") {
      return `Are you sure you want to remove ${name} from your friends?`;
    } else if (listType === "requests") {
      return `Are you sure you want to remove ${name} from your requests?`;
    }
    return `Are you sure you want to remove ${name} from your mutuals?`;
  };

  const renderAddBadges = () => {
    if (listType !== "friends") {
      return !isAdded ? (
        <TouchableOpacity
          onPress={handleAddPress}
          className="bg-black px-3 py-2 rounded-full mr-1"
        >
          <Text className="text-white text-xs">ADD</Text>
        </TouchableOpacity>
      ) : (
        <View className="bg-gray-800 px-3 py-2 rounded-full mr-1">
          <Text className="text-white text-xs">ADDED</Text>
        </View>
      );
    }
  };

  return (
    <>
      <View
        className={`flex-row justify-between items-center rounded-lg ml-5 mr-3 mb-3`}
      >
        <View className={`flex-row items-center`}>
          <Image
            className={`w-12 h-12 rounded-full mr-4`}
            source={require("../../../assets/images/favicon.png")} // Replace with actual image URI
          />
          <View>
            <Text style={{ color: clr.primary }} className="font-bold">
              {name}
            </Text>
            <Text style={{ color: clr.secondary }}>{username}</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          {renderAddBadges()}
          <IconButton
            icon="close"
            size={15}
            onPress={() => setModalVisible(true)}
            style={{ backgroundColor: "transparent" }}
            className="ml-auto"
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center px-3">
          <IconButton
            icon="close"
            size={20}
            onPress={() => setModalVisible(false)}
            style={{
              position: "absolute",
              zIndex: 10,
              top: 312,
              right: 10,
              backgroundColor: "transparent",
            }}
          />
          <View
            className="w-full rounded-xl p-4"
            style={{ backgroundColor: clr.primaryContainer }}
          >
            <Image
              className="m-auto"
              source={require("../../../assets/images/favicon.png")} // Replace with actual image URI
            />
            <Text
              className="text-lg text-center mb-4"
              style={{ color: clr.onPrimaryContainer }}
            >
              {renderDeleteMessage()}
            </Text>
            <View className="flex-row justify-evenly">
              <TouchableOpacity
                onPress={() => {
                  onRemove();
                  setModalVisible(false);
                }}
                style={{ backgroundColor: clr.errorContainer }}
                className="p-2 rounded-lg"
              >
                <Text
                  className="text-lg"
                  style={{ color: clr.onErrorContainer }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ItemsList;
