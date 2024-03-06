import * as React from 'react';
import { Button, FAB, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import Wrapper from './components/Wrapper';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams, useSegments } from 'expo-router';
import useGoalStore from './services/store/goalStore';
import { Goal } from './constants/types';
import Loading from './components/Loading';
import { db_GetGoalFeed } from './services/db/goalService';
import useUserStore from './services/store/userStore';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import GoalPane from './components/GoalPane';
import Spacer from './components/Spacer';


export default function Feed() {
    let clr = useTheme().colors;

    const params = useLocalSearchParams();
    const newGoal = params.newGoal;

    const { currentUser } = useUserStore();
    const { goalFeed, setGoalFeed, goalBeingCreated, setGoalBeingCreated } = useGoalStore();

    const [refreshing, setRefreshing] = useState(false)


    useEffect(() => {
        getFeed();
    }, []);

    useEffect(() => {
        if (goalBeingCreated) {
            goalFeed.unshift(goalBeingCreated);
            setGoalFeed(goalFeed)
        }
        setGoalBeingCreated(null);
    }, [goalBeingCreated])

    const getFeed = async () => {
        setRefreshing(true)
        const goals: Goal[] = await db_GetGoalFeed(currentUser);
        setGoalFeed(goals);
        setRefreshing(false);
    }

    return (
        <Wrapper
            title={"FLAIM"}
            leftIcon='account-group'
            rightIcon='account'
            leftIconAction={() => router.push("/friends")}
            rightIconAction={() => router.push("/profile")}>
            <View className='flex-1'>
                <FlatList className="h-full w-full px-2 mt-2"
                    extraData={goalBeingCreated}
                    data={goalFeed}
                    renderItem={(goal) => <GoalPane inFeed={true} goal={goal.item} />}
                    ItemSeparatorComponent={() => {
                        return <Spacer space={3} />;
                    }}
                    keyExtractor={(item) => item.uid}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                getFeed();
                            }}
                        />
                    }
                />
            </View>

            <FAB
                icon="plus"
                label='New Goal'
                color={clr.onSecondary}
                style={{ backgroundColor: clr.secondary, borderRadius: 80 }}
                className='absolute mb-12 mr-5 right-0 bottom-0 py-0'
                onPress={() => router.push('/create-goal')}
                size="small"
            />
        </Wrapper>
    );
};
