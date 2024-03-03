import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;

interface BottomTabsProps {
  onTabPress: any;
  scrollX: any;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ onTabPress, scrollX }) => {
  const clr = useTheme().colors;
  const totalMargin = 30 * 2;
  const availableWidth = screenWidth - totalMargin;
  const tabWidth = availableWidth / 3;

  const containerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [0, screenWidth, screenWidth * 2],
      [0, tabWidth, tabWidth * 2],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
      width: tabWidth,
    };
  });

  return (
    <View
      style={{
        backgroundColor: clr.primaryContainer,
      }}
      className="flex-row absolute bottom-0 left-0 right-0 rounded-[10px] p-0 mx-[30px] mb-5"
    >
      <Animated.View
        style={[
          containerStyle,
          {
            backgroundColor: clr.secondaryContainer,
          },
        ]}
        className="absolute bottom-0 h-full rounded-[10px] "
      />
      {["Friends", "Requests", "Mutuals"].map((tab, index) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabPress(index)}
          className="flex-1 items-center p-[10px]"
        >
          <Text style={{ color: clr.primary }}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabs;
