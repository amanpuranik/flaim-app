import { router, useNavigation, useRootNavigation } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import { signOut } from "../services/auth";
import { CommonActions } from "@react-navigation/native"
import React from "react";


type HeaderProps = {
    title?: String;
    leftIcon?: IconSource;
    rightIcon?: IconSource;
    leftIconAction?: () => void;
    rightIconAction?: () => void;
    children: any;
};

export default function Wrapper(props: HeaderProps) {
    const navigation = useNavigation();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigation.dispatch(CommonActions.reset({
                    routes: [{ key: "login", name: "login" }]
                }))
            }
        });
    }, []);

    let clr = useTheme().colors;

    const iconWidth = "w-1/5";
    return (
        <SafeAreaView
            style={{ backgroundColor: clr.background }}
            className={`flex-1 px-5 pt-4`}
        >
            <View className="flex-row items-center justify-between">
                {props.leftIcon && (
                    <TouchableOpacity onPress={props.leftIconAction} className={iconWidth}>
                        <IconButton
                            icon={props.leftIcon!}
                            iconColor={clr.primary}
                            size={32}
                        />
                    </TouchableOpacity>
                )}

                {!props.leftIcon && <View className={iconWidth}></View>}

                {props.title && <Text variant={"headlineSmall"}>{props.title}</Text>}

                {props.rightIcon && (
                    <TouchableOpacity
                        onPress={props.rightIconAction}
                        className={iconWidth}
                    >
                        <IconButton
                            icon={props.rightIcon!}
                            iconColor={clr.primary}
                            size={32}
                        />
                    </TouchableOpacity>
                )}

                {!props.rightIcon && <View className={iconWidth}></View>}
            </View>
            {props.children}
        </SafeAreaView>
    );
}
