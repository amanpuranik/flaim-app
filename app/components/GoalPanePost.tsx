import React, { useEffect, useState } from 'react'
import { Goal, GoalApproval, GoalPost } from '../constants/types'
import { FAB, useTheme } from 'react-native-paper';
import useUserStore from '../services/store/userStore';
import { generateUid } from '../services/util';
import { Timestamp } from 'firebase/firestore';
import { db_ApproveGoalPost } from '../services/db/approvalService';
import { Image, View } from 'react-native';

type GoalPostProps = {
    post: GoalPost
    goal: Goal
    inFeed: boolean
}

export default function GoalPanePost(props: GoalPostProps) {
    let clr: any = useTheme().colors;
    const { currentUser } = useUserStore();

    const post = props.post;
    const goal = props.goal;

    const [postCanBeApproved, setPostCanBeApproved] = useState(false);

    useEffect(() => {
        if (goal && goal.approvals && post && currentUser && goal.collaboratorUids) {
            const userHasApproved = goal.approvals.some(
                (approval) =>
                    approval.postUid === post.uid && approval.userUid === currentUser?.uid
            );

            const isUserPost = currentUser.uid !== post.userUid;
            const userIsCollab = goal.collaboratorUids.includes(currentUser.uid);
            const onlyCollabsCanApprove = goal.onlyColabsCanApprove;

            const canApprove =
                !userHasApproved && !isUserPost && (!onlyCollabsCanApprove || userIsCollab);

            setPostCanBeApproved(canApprove);

        }
    }, [])

    const approveGoalPost = async () => {
        if (postCanBeApproved) {
            if (post && goal && currentUser) {
                const newApproval: GoalApproval = {
                    uid: generateUid(),
                    postUid: post.uid,
                    userUid: currentUser?.uid,
                    createdAt: Timestamp.now()
                }
                setPostCanBeApproved(false);
                await db_ApproveGoalPost(goal.uid, newApproval)
            }
        }
    }

    //lg=8, xl=12, 2xl=16, 3xl=24
    //If changing here then must change in GoalPane.tsx
    const defaultBorderRadius = 12

    return (
        <View>
            <Image
                style={{
                    borderBottomRightRadius: defaultBorderRadius,
                    borderBottomLeftRadius: defaultBorderRadius,
                    borderTopLeftRadius: props.inFeed ? 0 : defaultBorderRadius,
                    borderTopRightRadius: props.inFeed ? 0 : defaultBorderRadius
                }}
                className='w-full h-full'
                source={require("../../assets/images/dude-running.jpeg")}
            />
            {postCanBeApproved &&
                <FAB
                    icon="check"
                    color='white'
                    style={{ backgroundColor: clr.approve }}
                    theme={{ roundness: 8 }}
                    className='absolute mt-5 ml-5 left-0 top-0 py-0'
                    onPress={async () => {
                        await approveGoalPost()
                    }}
                    size="small"
                />}
        </View>
    )
}
