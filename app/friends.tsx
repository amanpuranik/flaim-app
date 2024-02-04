import React from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View } from "react-native";
import { router } from 'expo-router';

export default function test() {
  return (
    <Wrapper title="Friends" leftIcon='arrow-left' leftIconAction={() => router.back()}>
      <View className="justify-center items-center h-full w-full">
        <Text>FRIENDS</Text>
      </View>
    </Wrapper >
  );
}


