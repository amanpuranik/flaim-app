import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";

interface ItemsListProps {
  name: string;
  username: string;
  onRemove: () => void;
}

const ItemsList: React.FC<ItemsListProps> = ({ name, username, onRemove }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className={`flex-row items-center p-3 bg-gray-900 rounded-lg m-2 `}>
        <View className={`flex-row items-center`}>
          <Image
            className={`w-12 h-12 rounded-full mr-4`}
            source={{ uri: "path_to_profile_picture" }} // Replace with actual image URI
          />
          <View>
            <Text className={`text-white font-bold`}>{name}</Text>
            <Text className={`text-gray-400`}>{username}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className={`p-2 ml-auto`}
        >
          <Text className="text-white">x</Text>
        </TouchableOpacity>
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
