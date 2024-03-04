import React from 'react';
import { Button, Text, TextInput, IconButton } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { toast, ToastPosition, Toasts } from '@backpackapp-io/react-native-toast';



import { useActionSheet } from '@expo/react-native-action-sheet';
import FlatTextInput from './components/FlatTextInput';



export default function editProfile() {

    const userName = "brownaman"
    const email = "amanpuranik@yahoo.ca"
    const name = "Aman Puranik"
    const navigation = useNavigation()

    const { showActionSheetWithOptions } = useActionSheet();


    const onPress = () => {

        console.log('function called')
        const options = ['Take picture', 'Upload from camera roll', 'Cancel'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options
        }, (selectedIndex) => {
            switch (selectedIndex) {
                case 0:
                    console.log('case1')
                    openCamera();
                    break;

                case 1:
                    // Delete
                    break;

                case 2:
                // Canceled
            }
        });
    }

    const openCamera = () => {
        navigation.navigate('camera')
    }

    const saveChanges = () => {
        console.log("saving changes")
        toast.success("Changes have been saved", {
            width: 300,
            position: ToastPosition.BOTTOM
        });
    }


    return (
        <Wrapper title="Edit profile" leftIcon='arrow-left' leftIconAction={router.back}>
            <Toasts />
            <View className="items-center h-full w-full flex flex-col">
                {/* <Avatar.Icon icon="camera" size={96} label="AP" /> */}
                <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar.Image source={require('../assets/images/profilepic.jpeg')} size={96} />
                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: 50,
                            padding: 22,
                            bottom: 0,
                            right: 0,
                        }}
                    >
                        <IconButton
                            icon="pencil"
                            size={24}
                        />
                    </TouchableOpacity>
                </View>


                <FlatTextInput
                
                    placeholder={userName}
                />
                <FlatTextInput
                    placeholder={email}
                />
                <FlatTextInput
                    placeholder={name}
                />

                <Button className='mt-10 w-50' mode='contained' onPress={saveChanges} >Save changes</Button>


            </View>
        </Wrapper >
    );

}