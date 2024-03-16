import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ActivityIndicator, Divider, FAB, IconButton, Text, useTheme } from 'react-native-paper';
import { Goal, GoalApproval, GoalPost } from '../constants/types';
import useUserStore from '../services/store/userStore';
import { db_ApproveGoalPost } from '../services/db/approvalService';
import { Timestamp } from 'firebase/firestore';
import { generateUid } from '../services/util';
import GoalPanePost from './GoalPanePost';
import { Carousel } from 'react-native-ui-lib'

type GoalPaneProps = {
    goal: Goal
    inFeed: boolean
}

export default function GoalPane(props: GoalPaneProps) {
    let clr: any = useTheme().colors;
    const todayDate = new Date();
    const goal = props.goal

    const { currentUser } = useUserStore();

    const [recentPosts, setRecentPosts] = useState<GoalPost[] | undefined>(undefined);


    const [userCanPost, setUserCanPost] = useState(false);

    useEffect(() => {
        if (goal && goal.posts && goal.collaborators && currentUser) {
            const todaysPosts = getRecentPosts(goal.posts);
            setRecentPosts(todaysPosts)

            const userIsCollabANDNotTeacher = goal.collaborators.some((collaborator) => {
                return collaborator.userUid === currentUser.uid && collaborator.role !== "teacher"
            })
            const userPostedToday = goal.posts.some((post) => {
                return post.userUid === currentUser.uid && post.createdAt.toDate().toDateString() === todayDate.toDateString()
            })
            setUserCanPost(userIsCollabANDNotTeacher && !userPostedToday);
        }
    }, [goal])

    const getRecentPosts = (posts: GoalPost[]) => {
        return posts.filter((post: GoalPost) => post.createdAt.toDate().toDateString() === todayDate.toDateString());
    }



    return (
        <View
            style={{
                borderColor: clr.surfaceVariant,
                backgroundColor: clr.surfaceVariant
            }}
            className='rounded-xl'>
            <View>
                {props.inFeed &&
                    <TouchableWithoutFeedback
                        style={{ borderBottomColor: clr.surfaceDisabled }}
                        onPress={() => router.push({ pathname: "/goal", params: { goalUid: goal.uid, goalName: goal.name } })}
                        className='border-b-2 p-3 mt-2 flex-row items-center'
                    >
                        <Image
                            className='w-10 h-10 rounded-full mr-3'
                            source={require("./../../assets/images/favicon.png")}
                        />
                        <Text style={{ color: clr.onSurfaceVariant }} className="font-bold">
                            {goal.name}
                        </Text>
                        <Image
                            className='w-10 h-10 rounded-full ml-3'
                            source={require("./../../assets/images/profilepic.jpeg")}
                        />
                    </TouchableWithoutFeedback>
                }
                <View className='h-96 items-center justify-center'>
                    {!recentPosts && <ActivityIndicator />}
                    {recentPosts && recentPosts.length > 0 && !userCanPost &&
                        <Carousel
                            showCounter
                        >
                            {recentPosts.map((post) => (<GoalPanePost inFeed={props.inFeed} key={post.uid} goal={goal} post={post} />))}
                        </Carousel>
                    }
                    {recentPosts && recentPosts.length < 1 && !userCanPost &&
                        <Text>No Posts for Today :(</Text>
                    }
                    {userCanPost &&
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: "/camera", params: { goalUid: goal.uid, goalName: goal.name } })}
                            className='h-200 w-auto'
                        >
                            <IconButton
                                icon={"camera"}
                                iconColor={clr.primary}
                                size={32}
                            />
                        </TouchableOpacity>
                    }

                </View>
            </View>

        </View >
    )
}
