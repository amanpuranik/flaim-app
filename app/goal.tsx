import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { TextInput, useTheme, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { router } from 'expo-router';
import Comment from "./components/goals/comment";
import FlatTextInput from './components/FlatTextInput';
import GoalPane from './components/GoalPane';
import { Goal } from './constants/types';
import { db_GetGoal } from './services/db/goalService';
import { useLocalSearchParams } from 'expo-router';


export default function GoalPage() {
  let clr = useTheme().colors;

  //Set in GoalPane when routing
  const params = useLocalSearchParams();
  const goalName = params.goalName.toString();
  const goalUid = params.goalUid.toString();

  const [goal, setGoal] = useState<Goal>();
  const [goalLoading, setGoalLoading] = useState(true);

  const dummyComments = [
    {
      name: "aaliyan 'short pants' kapadia",
      comment: "this is a comment",
      liked: true
    },
    {
      name: "omar `fatfuck` hamuda",
      comment: "woahhh"
    },
    {
      name: "Aman",
      comment: "good progredss!",
      liked: true
    },
    {
      name: "aaliyan 'short pants' kapadia",
      comment: "this is a comment"
    },
    {
      name: "aaliyan 'short pants' kapadia",
      comment: "this is a comment",
      liked: true
    },
    {
      name: "omar `fatfuck` hamuda",
      comment: "woahhh"
    },
    {
      name: "Aman",
      comment: "good progredss!",
      liked: true
    },
    {
      name: "aaliyan 'short pants' kapadia",
      comment: "this is a comment"
    }
  ];

  useEffect(() => {
    db_GetGoal(goalUid)
      .then((goal) => {
        setGoal(goal);
        setGoalLoading(false);
      })
      .catch((e: any) => {
        console.log("Couldn't get goal");
        setGoalLoading(false);
      })
  }, [])

  const submitComment = () => {
    console.log("submit comment")
  }


  const renderComments = () => {
    console.log("rendering commentss");

    return (
      <View style={{ marginTop: 20, alignItems: 'flex-start', display: 'flex', flexDirection: "column", flex: 1, height: 2000 }}>

        {dummyComments.map((comment, index) => (

          <Comment data={comment} index={index} key={index} />
        ))}

      </View>
    );
  }

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
        style={{ flex: 1, }}
        contentOffset={{ x: 0, y: 0 }}
        scrollEnabled={true}

      >
        <View className="items-centerx w-full" style={{ alignItems: 'flex-start', display: 'flex', flexDirection: "column", flex: 1 }}>
          <View className='w-full px-2'>
            {goalLoading &&
              <View className='h-96 items-center justify-center'>
                <ActivityIndicator />
              </View>
            }
            {!goalLoading && goal && <GoalPane goal={goal} inFeed={false} />}
          </View>
          <View style={{ marginTop: 20, alignItems: 'flex-start', display: 'flex', flexDirection: "column", flex: 1 }}>

            {dummyComments.map((comment, index) => (

              <Comment data={comment} index={index} key={index} />
            ))}
          </View>
        </View>

      </ScrollView>
      <FlatTextInput placeholder='Leave a comment' right={
        <TextInput.Icon
          icon="send"
          onPress={submitComment}
        />
      } />

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
