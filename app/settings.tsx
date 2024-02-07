import React from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View } from "react-native";
import { router } from "expo-router";
import { signOut } from './helpers/auth';



export default function settings() {
  return (
    <Wrapper title="Settings" leftIcon='arrow-left' leftIconAction={router.back}>
      <View className="justify-center items-center h-full w-full">
        <Text>settings</Text>
        <Button className='mt-60' mode='contained' onPress={() => signOut()}>Sign Out</Button>

      </View>
    </Wrapper >
  );
}

