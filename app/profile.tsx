import React from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View } from "react-native";
import { signOut } from './helpers/auth';


export default function test() {
  return (
    <Wrapper title="Profile" leftIcon='back'>
      <View className="justify-center items-center h-full w-full">
        <Text>PROFILE</Text>
        <Button className='mt-48' mode='contained' onPress={() => signOut()}>Sign Out</Button>
      </View>
    </Wrapper >
  );
}


