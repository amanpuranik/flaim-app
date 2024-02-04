import React from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View } from "react-native";

export default function test() {
  return (
    <Wrapper title="Settings" leftIcon='back'>
      <View className="justify-center items-center h-full w-full">
        <Text>settings</Text>
        <Button className='mt-60' mode='contained' onPress={() => signOut()}>Sign Out</Button>

      </View>
    </Wrapper >
  );
}


