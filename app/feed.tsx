import * as React from 'react';
import { Button, FAB, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import Wrapper from './components/Wrapper';
import { ScrollView, TouchableOpacity, View } from 'react-native';
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
                <View className="items-center h-full w-full px-5">
                    <TouchableOpacity onPress={() => router.push("/goal")} className='mt-10 border-solid border-gray-300 rounded-3xl border-4 h-1/2 w-full bg-gray-300'>
                        <TouchableOpacity onPress={() => router.push("/goal-feed")} className='mt-2 ml-5'>
                            <Text style={{ color: clr.primary }} className="font-bold text-lg">
                                {"<GOAL_NAME>"}
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

            }
            <FAB
                icon="plus"
                theme={{ roundness: 8 }}
                className='absolute mb-12 mr-5 right-0 bottom-0 py-0'
                onPress={() => router.push('/create-goal')}
                size="medium"
            />
        </Wrapper>
    );
};
