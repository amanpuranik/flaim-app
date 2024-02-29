import React from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View } from "react-native";
import { router } from "expo-router";
import { signOut } from './services/auth';
import useUserStore from './services/store/userStore';



export default function settings() {
  const { setCurrentUser } = useUserStore();

  const removeUserAndSignout = async () => {
    setCurrentUser(undefined)
    signOut();
  }
  return (
    <Wrapper title="Settings" leftIcon='arrow-left' leftIconAction={router.back}>
      <View className="justify-center items-center h-full w-full">
        <Button contentStyle={{ height: 50 }} className='mt-60 w-5/6' mode='contained' onPress={() => router.push("/db-tester")}>DB Testert</Button>
        <Button contentStyle={{ height: 50 }} className='mt-5 w-5/6' mode='contained' onPress={() => removeUserAndSignout()}>Sign Out</Button>

      </View>
    </Wrapper >
  );
}


