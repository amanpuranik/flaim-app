import * as React from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import Wrapper from './components/Wrapper';
import { TouchableOpacity, View } from 'react-native';
import { router, useSegments } from 'expo-router';
import useGoalStore from './services/store/goalStore';
import { Goal } from './constants/types';
import Loading from './components/Loading';
import { db_GetGoalFeed } from './services/db/goalService';
import useUserStore from './services/store/userStore';


export default function Feed() {
    let clr = useTheme().colors;

    const { currentUser } = useUserStore();
    const { goalFeed, setGoalFeed } = useGoalStore();

    const [feedLoading, setFeedLoading] = useState(true);

    useEffect(() => {
        const getFeed = async () => {
            const goals: Goal[] = await db_GetGoalFeed(currentUser);
            setGoalFeed(goals);
            setFeedLoading(false);
        }
        getFeed();
    }, []);

    return (
        <Wrapper
            title={"FLAIM"}
            leftIcon='account-group'
            rightIcon='account'
            leftIconAction={() => router.push("/friends")}
            rightIconAction={() => router.push("/profile")}>
            {feedLoading &&
                <Loading />
            }
            {!feedLoading &&
                <View className="items-center h-full w-full">
                    <TouchableOpacity onPress={() => router.push("/goal")} className='mt-10 border-solid border-gray-300 rounded-3xl border-4 h-1/2 w-full bg-gray-300'>
                        <TouchableOpacity onPress={() => router.push("/goal-feed")} className='mt-2 ml-5'>
                            <Text style={{ color: clr.primary }} className="font-bold text-lg">
                                {"<GOAL_NAME>"}
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <Button className='mt-10 w-5/6' mode='contained' onPress={() => router.push("/db-tester")}>DB Testert</Button>
                </View>
            }
        </Wrapper>
    );
};
