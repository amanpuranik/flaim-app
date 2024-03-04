import React from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { TextInput, useTheme, Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';

export default function Comment(props: any) {

    let clr = useTheme().colors;

    const [isLiked, setLikedStatus] = useState(props.data.liked);


    const picSource = "../../../assets/images/profilepic.jpeg"

    const submitComment = () => {
        console.log("submit comment")
    }

    const likeComment = () => {
        console.log("comment liked")
        setLikedStatus(!isLiked)
    }

    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
            {/* Profile picture */}
            <Image
                source={require(picSource)}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
                {/* Name */}
                <Text style={{ fontWeight: 'bold', color: "white" }}>{props.data.name}</Text>
                {/* Comment */}
                <View style={styles.container}>
                    <Text style={styles.commentText}>{props.data.comment}</Text>
                    {/* <Button icon="content-copy" /> */}
                    <IconButton
                        icon={isLiked ? "cards-heart" : "cards-heart-outline"}
                        size={20}
                        style={styles.iconButton} 
                        onPress={likeComment}
                        iconColor={isLiked ? "red" : null}
                    />

                </View>

            </View>
        </View>
    )


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
});



