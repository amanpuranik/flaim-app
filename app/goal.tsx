import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { TextInput, useTheme, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { router } from 'expo-router';
import Comment from "./components/goals/comment";
import FlatTextInput from './components/FlatTextInput';
import GoalPane from './components/GoalPane';
import { FlaimUser, Goal } from './constants/types';
import { db_GetGoal } from './services/db/goalService';
import { db_AddComment } from './services/db/commentService';
import { GoalComment } from './constants/types';
import { Timestamp } from 'firebase/firestore';
import { generateUid } from './services/util'
import { db_GetCurrentUser } from './services/db/userService';


import { useLocalSearchParams } from 'expo-router';


export default function GoalPage() {

  const comment: GoalComment = {
    uid: '1',
    userUid: 'CbMiOMH4iLQacGJG5d7YyzgdJOT2',
    comment: 'Some comment',
    createdAt: Timestamp.now(),
    likes: []
  };

  let clr = useTheme().colors;

  //Set in GoalPane when routing
  const params = useLocalSearchParams();
  const goalName = params.goalName.toString();
  const goalUid = params.goalUid.toString();

  const [goal, setGoal] = useState<Goal>();
  const [goalLoading, setGoalLoading] = useState(true);
  const [comments, setComments] = useState<GoalComment[]>([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [user, setCurrentUser] = useState<FlaimUser>();




  const handleTextInputChange = (text:string) => {
    setTextInputValue(text);
  };


  useEffect(() => {
    db_GetGoal(goalUid)
      .then((goal) => {

        setGoal(goal);
        setGoalLoading(false);
        setComments(goal?.comments || []);
      })
      .catch((e: any) => {
        console.log("Couldn't get goal");
        setGoalLoading(false);
      })
  }, [])

  useEffect(() => {
    db_GetCurrentUser()
      .then((user) => {
        setCurrentUser(user)
      })

  }, [])

  const updateGoal = (updatedGoal: any) => {
    setGoal(updatedGoal);
  };

  const userUid: string = user?.uid ?? '';


  const submitComment = async () => {
    // Check if the comment is not empty
    if (textInputValue.trim() === "") {
      return;
    }

    setTextInputValue("")

    // Create the new comment object
    const newComment: GoalComment = {
      uid: generateUid(),
      userUid: userUid,
      comment: textInputValue.trim(),
      createdAt: Timestamp.now(),
      likes: [],
    };

    // Update the goal state with the new comment
    setGoal((prevGoal) => ({
      ...prevGoal,
      comments: prevGoal.comments ? [...prevGoal.comments, newComment] : [newComment],
    }));

    // Call db_AddComment and await its completion
    try {
      await db_AddComment(goal ? goal.uid : "", newComment);
      console.log("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };




  return (
    <Wrapper
      title={goalName}
      leftIcon='arrow-left'
      leftIconAction={router.back}
      rightIcon={"format-list-group"}
      rightIconAction={() => router.push("/goal-feed")}
    >
      <ScrollView
        className="flex-1"
        scrollEnabled={true}

      >
        <View className="items-centerx w-full" style={{ alignItems: 'flex-start', display: 'flex', flexDirection: "column", flex: 1 }}>
          <View className='w-full px-2'>
            <View>
              {goalLoading &&
                <View className='h-200 items-center justify-center'>
                  <ActivityIndicator />
                </View>
              }
              {!goalLoading && goal && <GoalPane goal={goal} inFeed={false} />}
            </View>
          </View>
          <View style={{ marginTop: 20, alignItems: 'flex-start', display: 'flex', flexDirection: "column", width: "100%" }}>

            {!goalLoading && goal && goal.comments && goal.comments.map((comment, index) => (
              <Comment updateGoal={updateGoal} data={comment} index={index} key={index} goalData={goal} likes={comment.likes} />
            ))}

          </View>
        </View>

      </ScrollView>
      <FlatTextInput
        placeholder='Leave a comment'
        value={textInputValue}
        onChangeText={handleTextInputChange}
        right={
          <TextInput.Icon
            icon="send"
            onPress={submitComment}
          />
        }
      />

    </Wrapper >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentText: {
    color: 'white',
  },
  iconButton: {
    alignSelf: 'flex-start',
    height: 17,
    fill: "red"
  },
  commentInput: {
    marginTop: 0
  },
});
