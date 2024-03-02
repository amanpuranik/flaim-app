import { View, KeyboardAvoidingView, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  useTheme,
  Text,
  IconButton,
} from "react-native-paper";
import { router } from "expo-router";
import { signin } from "./services/auth";
import { AuthResponse, FlaimUser } from "./constants/types";
import { db_GetCurrentUser } from "./services/db/userService";
import useUserStore from "./services/store/userStore";
import FlatTextInput from "./components/FlatTextInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginBtnText, setLoginBtnText] = useState("Login");
  const [loginError, setLoginError] = useState<String>("");

  const { setCurrentUser } = useUserStore()

  let clr = useTheme().colors;

  useEffect(() => {
    loading ? setLoginBtnText("Logging in...") : setLoginBtnText("Login");
  }, [loading]);

  async function login() {
    if (email && password) {
      setLoading(true);
      const response: AuthResponse = await signin(email, password);
      if (response.error) {
        console.log(response.errorMessage);
        setLoginError(response.errorMessage);
      } else {
        const flaimUser: FlaimUser | undefined = await db_GetCurrentUser();
        setCurrentUser(flaimUser);
        router.replace("/feed");
      }
      setLoading(false);
    } else {
      setLoginError("Please enter both email and password.");
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
            Login
          </Text>
          <IconButton icon="login" iconColor={clr.primary} size={48} />
        </View>
        <FlatTextInput
          placeholder="Email..."
          returnKeyType="done"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={false}
          autoComplete="email"
          textContentType='emailAddress'
          keyboardType="email-address"
        />
        <FlatTextInput
          placeholder="Password..."
          returnKeyType="done"
          value={password}
          onChangeText={(text) => setPassword(text)}
          error={false}
          textContentType='password'
          secureTextEntry
        />
        {loginError && (
          <Text
            style={{ color: clr.error }}
            className="w-2/3 text-center text-xs mt-1"
          >
            {loginError}
          </Text>
        )}
        <Button
          loading={loading}
          contentStyle={{ height: 50 }}
          className="w-3/4 mt-5"
          mode="contained"
          onPress={() => login()}
        >
          {loginBtnText}
        </Button>
        <View className="flex-row mt-5">
          <Text className="font-bold">Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => router.replace("/register")}
            className="items-center"
          >
            <Text style={{ color: clr.primary }} className="font-bold">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
}
