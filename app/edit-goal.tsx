import * as React from 'react';
import { Text } from 'react-native-paper';
import { useState } from 'react';
import Wrapper from './components/Wrapper';
import { View } from 'react-native';


export default function Feed() {

    return (
        <Wrapper title={"Edit <GOAL_NAME>"} leftIcon='back'>
            <View className="justify-center items-center h-full w-full">
                <Text>EDIT GOAL</Text>
            </View>
        </Wrapper>
    );
};
