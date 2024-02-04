import * as React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { useState } from 'react';
import Wrapper from './components/Wrapper';
import { TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';


export default function Feed() {
    let clr = useTheme().colors;

    return (
        <Wrapper title={"FLAIM"} leftIcon='friends' rightIcon='profile'>
            <View className="items-center h-full w-full">
                <TouchableOpacity onPress={()=> router.push("/goal")} className='mt-10 border-solid border-gray-300 rounded-3xl border-4 h-1/2 w-full bg-gray-300'>
                    <TouchableOpacity onPress={() => router.push("/goal-feed")} className='mt-2 ml-5'>
                        <Text style={{ color: clr.primary }} className="font-bold text-lg">
                            {"<GOAL_NAME>"}
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </Wrapper>
    );
};
