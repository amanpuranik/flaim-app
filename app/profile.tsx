import React from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View } from "react-native";
import { signOut } from './helpers/auth';
import { Avatar } from 'react-native-elements';
import { router } from 'expo-router';



export default function test() {
  // Render initials for now, we'll deal with image logic later
  return (
    <Wrapper title="Profile" leftIcon='arrow-left' leftIconAction={router.back} rightIcon='account-settings'>
      <View className="items-center h-full w-full">
        <Avatar
          size="large"
          rounded
          classname="bg-blue-500 c-red"
          title="AP"
          >   
            <Avatar.Accessory className="h-4 w-4"/>
          </Avatar>
     
        <Text className="pt-4">bio will go her </Text>
        <Text className="pt-1">Link to profile</Text>
        <Button className='mt-60' mode='contained' onPress={() => signOut()}>Sign Out</Button>
      </View>
    </Wrapper >
  );
}


