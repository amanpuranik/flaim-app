import React, { useState } from 'react';
import { Button, Text } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import { auth } from '../firebase';
import { db_GetCurrentUser, db_GetOtherProfile, db_GetUsers } from './services/db/userService';
import { FlaimUser } from './constants/types';
import useUserStore from './services/store/userStore';
import { db_CreateGoal } from './services/db/goalService';



export default function dbtester() {
    const { currentUser } = useUserStore();
    const [readTestOutput, setReadTestOutput] = useState<any>();

    const test_db_GetCurrentUser = async () => {
        const user: FlaimUser | undefined = await db_GetCurrentUser();
        setReadTestOutput(JSON.stringify(user))
    }

    const test_db_GetOtherProfile = async () => {
        const user: FlaimUser | undefined = await db_GetOtherProfile("cWoi0svcjNOs4RDbZwrLXplu5KJ3");
        setReadTestOutput(JSON.stringify(user))
    }

    const test_db_GetUsers = async () => {
        const user: FlaimUser[] = await db_GetUsers(["cWoi0svcjNOs4RDbZwrLXplu5KJ3"]);
        setReadTestOutput(JSON.stringify(user))
    }


    return (
        <Wrapper title="DB Tester" leftIcon='arrow-left' leftIconAction={router.back}>
            <ScrollView>
                <View className="items-center h-full w-full">
                    <Text className='mt-10'>{readTestOutput}</Text>
                    <Text className='mt-10' variant={"headlineSmall"}>Read Tests:</Text>
                    <Button className='mt-3' mode='contained' onPress={() => test_db_GetCurrentUser()}>test_db_GetCurrentUser</Button>
                    <Button className='mt-3' mode='contained' onPress={() => test_db_GetOtherProfile()}>test_db_GetOtherProfile</Button>
                    <Button className='mt-3' mode='contained' onPress={() => test_db_GetUsers()}>test_db_GetUsers</Button>

                    <Text className='mt-10' variant={"headlineSmall"}>Write Tests:</Text>
                    <Button className='mt-3' mode='contained' onPress={() => test_db_GetUsers()}>test_db_GetUsers</Button>

                </View>
            </ScrollView>

        </Wrapper >
    );
}


