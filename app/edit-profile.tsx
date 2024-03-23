import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import { Button, Text, TextInput, IconButton, useTheme } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { toast, ToastPosition, Toasts } from '@backpackapp-io/react-native-toast';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FlatTextInput from './components/FlatTextInput';
import useUserStore from './services/store/userStore';
import { db_GetCurrentUser, db_UpdateUser } from './services/db/userService';
import { FlaimUser } from './constants/types';
import firebase from 'firebase/app';
import { fs } from '../firebase'; // assuming you have a firebase configuration


export default function editProfile() {
    let clr = useTheme().colors;

    const navigation = useNavigation()

    const [userName, setUserName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [bio, setBio] = useState<string>();



    const [userNameInput, setUserNameInput] = useState<string>();
    const [emailInput, setEmailInput] = useState<string>();
    const [firstNameInput, setFirstNameInput] = useState<string>();
    const [lastNameInput, setLastNameInput] = useState<string>();
    const [bioInput, setBioInput] = useState<string>();



    const [currentUser, setCurrentUser] = useState<FlaimUser>();
    const { showActionSheetWithOptions } = useActionSheet();



    useEffect(() => {

        //TODO: This commented out bit below gives an undefined error on fs.collection and i got no clue why (kms).
        // Right now we will getCurrentUser everytime there is a state update which is kinda ass. using collection
        // would be better. 

        // const unsubscribe = fs.collection('users').doc('userId').onSnapshot((snapshot:any) => {
        //     const userData = snapshot.data() as FlaimUser;
        //     setCurrentUser(userData);
        // });

        // return () => unsubscribe();

        db_GetCurrentUser().then((user) => {
            setCurrentUser(user)
            setUserName(user?.username)
            setEmail(user?.email)
            setFirstName(user?.firstName)
            setLastName(user?.lastName)
            setBio(user?.bio)
        })


    }, []);


    const onPress = () => {

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

    const handleTextChange = (fieldName: string) => (text: string) => {
        // Your logic here
        if (fieldName === "username") {
            setUserNameInput(text)
        }

        if (fieldName === "email") {
            setEmailInput(text)
        }

        if (fieldName === "first") {
            setFirstNameInput(text)
        }

        if (fieldName === "last") {
            setLastNameInput(text)
        }

        if (fieldName === "bio") {
            setBioInput(text)
        }
    };


    const saveChanges = async () => {



        const updatedUser = {
            ...currentUser,
            username: userNameInput ? userNameInput : currentUser?.username,
            email: emailInput ? emailInput : currentUser?.email,
            firstName: firstNameInput ? firstNameInput : currentUser?.firstName,
            lastName: lastNameInput ? lastNameInput : currentUser?.lastName,
            bio: bioInput ? bioInput : currentUser?.bio
        }

        console.log(currentUser, updatedUser)


        try {
            await db_UpdateUser(updatedUser)
            toast.success("Changes have been saved", {
                width: 300,
                position: ToastPosition.BOTTOM
            });
        }
        catch (error) {
            toast.error("Changes could not be saved", {
                width: 300,
                position: ToastPosition.BOTTOM
            });
            console.log(error, "error")
        }



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


                <View style={{ flexDirection: 'row', alignItems: 'center', width: 360, gap: 50, borderBottomWidth: 1, borderBottomColor: "grey" }}>
                    <Text style={{width:68}}>Username</Text>
                    <FlatTextInput
                        onChangeText={handleTextChange("username")}
                        placeholder={userName}
                        activeUnderlineColor="transparent"
                        underlineColor="transparent"
                        selectionColor='grey'
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: 360, gap: 50, borderBottomWidth: 1, borderBottomColor: "grey" }}>
                    <Text style={{width:68}}>Email</Text>
                    <FlatTextInput
                        onChangeText={handleTextChange("email")}
                        placeholder={email}
                        activeUnderlineColor="transparent"
                        underlineColor="transparent"
                        selectionColor='grey'
                    />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', width: 360, gap: 50, borderBottomWidth: 1, borderBottomColor: "grey" }}>
                    <Text style={{width:68}}>First name</Text>
                    <FlatTextInput
                        onChangeText={handleTextChange("first")}
                        placeholder={firstName}
                        activeUnderlineColor="transparent"
                        underlineColor="transparent"
                        selectionColor='grey'
                    />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', width: 360, gap: 50, borderBottomWidth: 1, borderBottomColor: "grey" }}>
                    <Text  style={{width:68}}>Last name</Text>
                    <FlatTextInput
                        onChangeText={handleTextChange("last")}
                        placeholder={lastName}
                        activeUnderlineColor="transparent"
                        underlineColor="transparent"
                        selectionColor='grey'
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: 360, gap: 50, borderBottomWidth: 1, borderBottomColor: "grey" }}>
                    <Text  style={{width:68}}>Bio</Text>
                    <FlatTextInput
                        onChangeText={handleTextChange("bio")}
                        placeholder={bio}
                        activeUnderlineColor="transparent"
                        underlineColor="transparent"
                        selectionColor='grey'
                    />
                </View>


                <Button className='mt-10 w-50' mode='contained' onPress={saveChanges} >Save changes</Button>


            </View>
        </Wrapper >
    );

}

const styles = StyleSheet.create({
    labelText: {
        borderBottomWidth: 1, // Adjust the border width as needed
        borderBottomColor: 'red', // Adjust the border color as needed
        paddingBottom: 5, // Adjust the padding as needed
    },
});