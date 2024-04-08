import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import useUserStore from './services/store/userStore';
import { CameraCapturedPicture } from 'expo-camera';
import Wrapper from './components/Wrapper';
import { ImageResult, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { db_AddGoalPost } from './services/db/postService';
import { GoalPost } from './constants/types';
import { Timestamp } from 'firebase/firestore';
import { CommonActions } from "@react-navigation/native";
import { generateUid } from './services/util';
import FlatTextInput from './components/FlatTextInput';
import { FirebaseStorage, StorageReference, getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";


type PostViewerProps = {
    goalUid: string
    image: CameraCapturedPicture
}


export default function PostViewer(props: PostViewerProps) {
    let clr: any = useTheme().colors;
    const todayDate = new Date();
    const { currentUser } = useUserStore();
    const navigation = useNavigation();

    const storage: FirebaseStorage = getStorage();


    const params = useLocalSearchParams();
    const goalName = params.goalName.toString();
    const goalUid = params.goalUid.toString();
    const uri = params.uri.toString();
    const photoWidth = parseInt(params.photoWidth.toString(), 10);

    const [squaredImageUri, setSquaredImageUri] = useState<string | null>(null);

    const [caption, setCaption] = useState("");
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        const processImage = async () => {
            try {
                const manipulatedImage = await manipulateAsync(
                    uri,
                    [{ crop: { height: photoWidth, width: photoWidth, originX: 0.5, originY: 10 } }],
                );
                setSquaredImageUri(manipulatedImage.uri);
                console.log(manipulatedImage.uri);

            } catch (error) {
                console.error('Error processing image:', error);
            }
        }
        processImage();
    }, [uri]);

    const postImage = async () => { //image posted
        setPosting(true);

        if (squaredImageUri && currentUser) {
            try {
                const photoRef: StorageReference = ref(storage, `post/${goalUid}/${currentUser.uid}/${generateUid()}.jpg`);
                const response = await fetch(squaredImageUri);
                const blob = await response.blob();
                const results = await uploadBytes(photoRef, blob);
                // await uploadString(photoRef, squaredImage.base64, 'base64')
                const downloadUrl = await getDownloadURL(results.ref);

                const post: GoalPost = {
                    uid: generateUid(),
                    userUid: currentUser.uid,
                    caption,
                    imageUrl: downloadUrl,
                    updatedAt: Timestamp.now(),
                    createdAt: Timestamp.now()
                }

                await db_AddGoalPost(goalUid, post);
                navigation.dispatch(
                    CommonActions.reset({
                        routes: [{ key: "feed", name: "feed" }],
                    })
                );
            } catch (e: any) {
                console.log(e);
            }
        }
        setPosting(false);
    }

    return (
        <Wrapper
            title={goalName}
            leftIcon='close'
            leftIconAction={router.back}
        >
            <View className='flex-1 w-full px-2 items-center'>
                {/* {PUT THE Place holder while it loads} */}
                {squaredImageUri && <Image className='w-[370] h-[370] mb-10 rounded-md' source={{ uri: squaredImageUri }} />}
                <FlatTextInput
                    placeholder="Enter a caption..."
                    value={caption}
                    onChangeText={(text) => setCaption(text)}
                    autoCapitalize="none"
                />
                <Button loading={posting} className='mt-10' mode='contained' onPress={() => postImage()}>{posting ? "POSTING" : "POST"}</Button>
            </View>
        </Wrapper>
    )
}
