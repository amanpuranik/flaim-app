import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { useTheme, IconButton } from "react-native-paper";

interface ItemsListProps {
  name: string;
  username: string;
  onRemove: () => void;
  listType?: "friends" | "requests" | "mutuals";
}

const ItemsList: React.FC<ItemsListProps> = ({
  name,
  username,
  onRemove,
  listType,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  let clr = useTheme().colors;

  return (
    <>
      <View className={`flex-row items-center rounded-lg ml-5 mr-3 mb-3`}>
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
        <IconButton
          icon="close"
          size={15}
          onPress={() => setModalVisible(true)}
          style={{ backgroundColor: "transparent" }}
          className="ml-auto"
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className={`flex-1 justify-center items-center px-4`}>
          <View className={`bg-white w-full rounded-xl p-4`}>
            <Text className={`text-lg text-center mb-4`}>
              Are you sure you want to remove {name}?
            </Text>
            <View className={`flex-row justify-evenly`}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className={`bg-gray-300 p-2 rounded-lg`}
              >
                <Text className={`text-lg`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onRemove();
                  setModalVisible(false);
                }}
                className={`bg-red-500 p-2 rounded-lg`}
              >
                <Text className={`text-lg text-white`}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ItemsList;
