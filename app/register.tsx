import { View, KeyboardAvoidingView, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { router } from "expo-router";
import { AuthResponse, FlaimUser } from "./constants/types";
import { signup } from "./services/auth";
import { db_GetCurrentUser } from "./services/db/userService";
import useUserStore from "./services/store/userStore";
import FlatTextInput from "./components/FlatTextInput";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [regBtnText, setRegBtnText] = useState("Register");
  const [regError, setRegError] = useState<String>("");

  const { setCurrentUser } = useUserStore()

  let clr = useTheme().colors;

  useEffect(() => {
    loading ? setRegBtnText("Creating account...") : setRegBtnText("Register");
  }, [loading]);

  async function register() {
    if (email && password) {
      setLoading(true);
      const response: AuthResponse = await signup(email, password);
      if (response.error) {
        console.log(response.errorMessage);
        setRegError(response.errorMessage);
      } else {
        const flaimUser: FlaimUser | undefined = await db_GetCurrentUser();
        setCurrentUser(flaimUser);
        router.replace("/feed");
      }
      setLoading(false);
    } else {
      setRegError(
        "Please check your email, password, and password confirmation."
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ backgroundColor: clr.background }}
      className={`flex-1 justify-center items-center h-full w-full`}
    >
      <View className="justify-center items-center w-11/12">
        <View className="flex-row items-center">
          <Text className="font-semibold" variant="displayMedium">
            Register
          </Text>
          <IconButton icon="account-plus" iconColor={clr.primary} size={48} />
        </View>
        <FlatTextInput
          placeholder="Email..."
          returnKeyType="done"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={false}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <FlatTextInput
          placeholder="Password..."
          returnKeyType="done"
          value={password}
          onChangeText={(text) => setPassword(text)}
          error={false}
          textContentType="newPassword"
          secureTextEntry
        />
        {regError && (
          <Text
            style={{ color: clr.error }}
            className="w-2/3 text-center text-xs mt-1"
          >
            {regError}
          </Text>
        )}
        <Button
          loading={loading}
          contentStyle={{ height: 50 }}
          className="w-3/4 mt-5"
          mode="contained"
          onPress={() => register()}
        >
          {regBtnText}
        </Button>
        <View className="flex-row mt-5">
          <Text className="font-bold">Already have an account? </Text>
          <TouchableOpacity
            onPress={() => router.replace("/login")}
            className="items-center"
          >
            <Text style={{ color: clr.primary }} className="font-bold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
}
