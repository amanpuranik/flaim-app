import React from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { signOut } from './helpers/auth';
import { Avatar } from 'react-native-paper';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function test() {
  // Render initials for now, we'll deal with image logic later
  return (
    <Wrapper
      title="Profile"
      leftIcon="arrow-left"
      leftIconAction={router.back}
      rightIcon="cog-outline"
      rightIconAction={() => router.push("/settings")}

    >
      <View className="items-center h-full w-full">
        <Avatar.Text size={84} label="AP" />
        <Text className="pt-4">bio will go her </Text>
        <Text className="pt-1">Link to profile</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text className="pt-10 pr-72 self-start ">Pinned posts</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => router.push("/goal")} className='mt-10 border-solid border-gray-300 rounded-3xl border-4 h-1/2 w-full bg-gray-300 h-32 w-32'>
            <TouchableOpacity onPress={() => router.push("/goal-feed")} className='mt-2 ml-5'>
              <Text style={{ color: "black" }} className="font-bold text-lg">
                {"<GOAL_NAME>"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/goal")} className='mt-10 border-solid border-gray-300 rounded-3xl border-4 h-1/2 w-full bg-gray-300 h-32 w-32'>
            <TouchableOpacity onPress={() => router.push("/goal-feed")} className='mt-2 ml-5'>
              <Text style={{ color: "black" }} className="font-bold text-lg">
                {"<GOAL_NAME>"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/goal")} className='mt-10 border-solid border-gray-300 rounded-3xl border-4 h-1/2 w-full bg-gray-300 h-32 w-32'>
            <TouchableOpacity onPress={() => router.push("/goal-feed")} className='mt-2 ml-5'>
              <Text style={{ color: "black" }} className="font-bold text-lg">
                {"<GOAL_NAME>"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </Wrapper>
  );
}
