import React from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { TextInput, useTheme, Button, IconButton } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { router } from 'expo-router';
import Comment from "./components/goals/comment";
import FlatTextInput from './components/FlatTextInput';


export default function Goal() {
  let clr = useTheme().colors;

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
    <Wrapper title="<GOAL_NAME>" leftIcon='arrow-left' leftIconAction={router.back}>
      <ScrollView
        className="flex-1"
        style={{ flex: 1, }}
        contentOffset={{ x: 0, y: 0 }}
        scrollEnabled={true}

      >
        <View className="items-centerx w-full" style={{ alignItems: 'flex-start', display: 'flex', flexDirection: "column", flex: 1 }}>
          <TouchableOpacity style={{ height: 400 }} onPress={() => router.push("/goal")} className='mt-10 border-solid border-gray-300 rounded-3xl border-4  w-full bg-gray-300'>
            <TouchableOpacity onPress={() => router.push("/goal-feed")} className='mt-2 ml-5'>
              <Text style={{ color: clr.primary }} className="font-bold text-lg">
                {"<GOAL_NAME>"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{ marginTop: 20, alignItems: 'flex-start', display: 'flex', flexDirection: "column", flex: 1 }}>

            {dummyComments.map((comment, index) => (

              <Comment data={comment} index={index} key={index} />
            ))}

          </View>
        </View>

      </ScrollView>
        <FlatTextInput marginTop={0}  placeholder='Leave a comment' right={
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
    marginTop:0
  },
});
