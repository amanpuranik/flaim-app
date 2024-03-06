import { router, useNavigation, useRootNavigation } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, IconButton, Text, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import { signOut } from "../services/auth";
import { CommonActions } from "@react-navigation/native";
import React from "react";

type HeaderProps = {
  title?: String;
  leftIcon?: IconSource;
  rightIcon?: IconSource;
  leftIconAction?: () => void;
  rightIconAction?: () => void;
  loading?: boolean;
  children: any;
};

export default function Wrapper(props: HeaderProps) {
  const navigation = useNavigation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ key: "login", name: "login" }],
          })
        );
      }
    });
  }, []);

  let clr = useTheme().colors;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: clr.background }}
    >
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="flex-row items-center">
          {props.leftIcon ? (
            <TouchableOpacity onPress={props.leftIconAction}>
              <IconButton
                icon={props.leftIcon}
                iconColor={clr.primary}
                size={32}
              />
            </TouchableOpacity>
          ) : (
            <View className="w-[60px]" />
          )}

          <Text variant="headlineMedium" className="flex-1 text-center">{props.title}</Text>

          {props.rightIcon ? (
            <View>
              {props.loading &&
                <View className="w-[60px]">
                  <ActivityIndicator className="absolute -mt-3 mr-4 right-0 top-0" size={"small"} />
                </View>
              }
              {!props.loading &&
                <TouchableOpacity onPress={props.rightIconAction}>
                  <IconButton
                    icon={props.rightIcon}
                    iconColor={clr.primary}
                    size={32}
                  />
                </TouchableOpacity>
              }
            </View>

          ) : (
            <View className="w-[60px]" />
          )}
        </View>
        {props.children}
      </KeyboardAvoidingView>

    </SafeAreaView >
  );
}
