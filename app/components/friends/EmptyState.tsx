import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

interface EmptyStateProps {
  headerText: string;
  helpText: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ headerText, helpText }) => {
  const clr = useTheme().colors;

  return (
    <View className="bg-black p-2 rounded-xl mx-4 my-3 justify-center items-center">
      <Text
        className="text-lg font-bold mb-1 text-center"
        style={{ color: clr.primary }}
      >
        {headerText}
      </Text>
      <Text
        className="text-base text-center mb-1"
        style={{ color: clr.onSurface }}
      >
        {helpText}
      </Text>
    </View>
  );
};

export default EmptyState;
