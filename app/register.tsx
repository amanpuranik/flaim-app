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

  const [username, setUsername] = useState("");
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  // const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [regBtnText, setRegBtnText] = useState("Register");
  const [regError, setRegError] = useState<String>("");

  const { setCurrentUser } = useUserStore()

  let clr = useTheme().colors;

  useEffect(() => {
    loading ? setRegBtnText("Creating account...") : setRegBtnText("Register");
  }, [loading]);

  async function register() {
    if (email && password && username) {
      setLoading(true);
      const response: AuthResponse = await signup(email, password, username);
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
      setIsEmailEmpty(!email);
      setIsUsernameEmpty(!username);
      setIsPasswordEmpty(!password);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ backgroundColor: clr.background }}
      className={`flex-1 justify-center items-center h-full w-full`}
    >
      <View className="justify-center items-center w-full">
        <View className="flex-row items-center">
          <Text className="font-semibold" variant="displayMedium">
            Register
          </Text>
          <IconButton icon="account-plus" iconColor={clr.primary} size={48} />
        </View>
        <FlatTextInput
          placeholder="Username..."
          onBlur={() => {
            if (username.length > 0) {
              setIsUsernameEmpty(false);
            }
          }}
          returnKeyType="done"
          value={username}
          onChangeText={(text) => setUsername(text)}
          error={isUsernameEmpty}
          errorText="Choose a username"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <FlatTextInput
          placeholder="Email..."
          onBlur={() => {
            if (email.length > 0) {
              setIsEmailEmpty(false);
            }
          }}
          returnKeyType="done"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={isEmailEmpty}
          errorText="Choose an email"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <FlatTextInput
          placeholder="Password..."
          onBlur={() => {
            if (password.length > 0) {
              setIsPasswordEmpty(false);
            }
          }}
          returnKeyType="done"
          value={password}
          onChangeText={(text) => setPassword(text)}
          error={isPasswordEmpty}
          errorText="Choose a password"
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
