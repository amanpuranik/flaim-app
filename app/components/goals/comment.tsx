import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { TextInput, useTheme, Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import Drawer from 'react-native-ui-lib/drawer';
import { Dimensions } from 'react-native';
import { db_GetOtherProfile } from '../../services/db/userService';
import {Colors} from 'react-native-ui-lib';
import { db_DeleteComment } from '../../services/db/commentService';
import { db_GetCurrentUser } from '../../services/db/userService';
import {db_UpdateCommentLike} from '../../services/db/commentService'
import { CommentLike, GoalComment } from '../../constants/types';
import useUserStore from '../../services/store/userStore';





export default function Comment(props: any) {
  const [name, setName] = useState<string>();
  const [isLiked, setLikedStatus] = useState(false);
  const [comment, setComment] = useState<GoalComment>()

  const { currentUser } = useUserStore();

  console.log(props.data)

  useEffect(() => {
    fetchCommentUser().then(username => {
      setName(username);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  useEffect(() => {
      setComment(props.data)
      const isLiked2 = props.likes.some((like:CommentLike) => {
        return like.isLiked && like.userUid === currentUser?.uid
    })
    setLikedStatus(isLiked2)

  }, [])


  const screenWidth = Dimensions.get("screen").width;

  let clr = useTheme().colors;

  const styles = getStyles(clr)

  const picSource = "../../../assets/images/profilepic.jpeg"


  const likeComment = () => {
    console.log("comment liked", isLiked, props.data)
    const commentLike: CommentLike = {
        userUid: currentUser!.uid,
        isLiked: !isLiked
    };

    const updatedLikes = isLiked
        ? props.data.likes.filter((like: { userUid: any; }) => like.userUid !== currentUser!.uid) // Remove the like
        : [...props.data.likes, commentLike]; // Add the like



    const updatedComment = { ...props.data, likes: updatedLikes };
    setComment(updatedComment); // Update the comment in the state

    db_UpdateCommentLike(props.goalData.uid, props.data.uid, currentUser!.uid, !isLiked);

    setLikedStatus(!isLiked);

};



  const deleteComment = () => {
    db_DeleteComment(props.goalData.uid, props.data.uid)

    const updatedGoal = { ...props.goalData };

    updatedGoal.comments = updatedGoal.comments.filter(
      (comment:any) => comment.uid !== props.data.uid
    );
    props.updateGoal(updatedGoal);
  }


  async function fetchCommentUser() {
    const name = await db_GetOtherProfile("CbMiOMH4iLQacGJG5d7YyzgdJOT2");
    return name?.username
  }



  return (
    <Drawer
      rightItems={[{ text: 'Delete', background: Colors.red30, onPress: deleteComment}]}
      style={{ display: "flex", flexDirection: 'row', width: "100%" }}
    >
      <View style={{ flexGrow: 1, flexDirection: 'row', paddingLeft: 10 }}>
        {/* Profile picture */}
        <Image
          source={require(picSource)}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        />
        <View style={{ display: "flex", flexDirection: "column", width: screenWidth / 1.4 }}>
          {/* Name */}
          <Text style={{ fontWeight: 'bold', color: "white" }}>{name}</Text>
          {/* Comment */}
          <Text style={styles.commentText}>{props.data.comment}</Text>

        </View>

        <View style={styles.likesContainer}>
          <IconButton
            icon={isLiked ? "cards-heart" : "cards-heart-outline"}
            size={20}
            style={styles.iconButton}
            onPress={likeComment}
            iconColor={isLiked ? "red" : undefined}
          />
          <Text style={{ fontWeight: 'bold', color: "white" }}>{comment?.likes?.filter(like => like.isLiked).length}</Text>
        </View>
      </View>
    </Drawer>
  );





}

const getStyles = (clr: MD3Colors) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    commentText: {
      color: clr.onBackground,
    },
    iconButton: {
      alignSelf: 'flex-start',
      height: 17,
      fill: "red"
    },
    likesContainer: {
      flexDirection: 'column',
      display: "flex",
      alignItems: 'center',
      color: "white",
      justifyContent: 'flex-end'
    },
  })
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likesContainer: {
    flexDirection: 'column',
    display: "flex",
    alignItems: 'center',
    color: "white",
    justifyContent: 'flex-end'
  },
  commentText: {
    color: 'white',
  },
  iconButton: {
    alignSelf: 'flex-start',
    height: 17,
    fill: "red"
  },
});



