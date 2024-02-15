import React from 'react';
import { Button, Text, TextInput, IconButton } from 'react-native-paper';
import Wrapper from './components/Wrapper';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { signOut } from './helpers/auth';
import { Avatar } from 'react-native-paper';

export default function editProfile() {

    const userName = "brownaman"
    const email = "amanpuranik@yahoo.ca"
    const name = "Aman Puranik"

    return (
        <Wrapper title="Edit profile" leftIcon='arrow-left' leftIconAction={router.back}>
            <View className="items-center h-full w-full flex flex-col">
                {/* <Avatar.Icon icon="camera" size={96} label="AP" /> */}
                <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar.Image source={require('../assets/images/profilepic.jpeg')} size={96} />
                    <TouchableOpacity
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
                            onPress={() => {
                                console.log("edit profile picture pressed")
                                // Handle edit action
                            }}
                        />
                    </TouchableOpacity>
                </View>


                <TextInput
                    className="mt-8"
                    placeholder={userName}
                    style={{ height: 40, width: 250 }}
                />
                <TextInput
                    className="mt-8"
                    placeholder={email}
                    style={{ height: 40, width: 250 }}
                />
                <TextInput
                    className="mt-8"
                    placeholder={name}
                    style={{ height: 40, width: 250 }}
                />

            </View>
        </Wrapper >
    );

}