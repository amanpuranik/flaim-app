import React from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View } from "react-native";

export default function test() {
  return (
    <Wrapper title="Friends" leftIcon='back'>
      <View className="justify-center items-center h-full w-full">
        <Text>FRIENDS</Text>
      </View>
    </Wrapper >
  );
}


