import { Camera, CameraType } from 'expo-camera';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Wrapper from './components/Wrapper';
import { router, useLocalSearchParams } from "expo-router";
import { IconButton } from 'react-native-paper';




export default function camera() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef<Camera>(null);


    const params = useLocalSearchParams();
    console.log(params)

    const goalName = params.goalName?.toString();
    const goalUid = params.goalUid?.toString();
    const profile = params.profile?.toString()

    

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePictureAsync = async () => {
        if (cameraRef.current) {
            try {
                const options = { quality: 0.5 };
                const photo = await cameraRef.current.takePictureAsync(options);
                if (photo && photo.uri) {
                    if (goalUid) {
                        router.push({
                            pathname: "/post-viewer",
                            params: { uri: photo.uri, photoWidth: photo.width.toString(), goalUid: goalUid, goalName: goalName }
                        })
                    }
                    else if (profile){
                        //have to tweak the part where a pic is acc taken 
                        router.push("/edit-profile")
                        console.log("from the profile")
                    }
                } 

                // else if profile picture, take to profile pictuer screen 
                
                
                else {
                    console.warn('Failed to capture picture');
                }
            } catch (error) {
                console.error('Failed to take picture:', error);
            }
        } else {
            console.warn('Camera ref is not set');
        }
    };

    return (

        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.topLeftContainer}>
                    <IconButton
                        icon="arrow-left"
                        size={32}
                        onPress={() => {
                            router.back();
                        }}
                    />

                    <IconButton
                        icon="camera-flip"
                        size={32}
                        onPress={toggleCameraType}
                    />


                </View>
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon="circle-outline"
                        size={72}
                        onPress={takePictureAsync}
                        style={styles.button}
                    />

                    {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camerab</Text>
                    </TouchableOpacity> */}
                </View>

            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    topLeftContainer: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
