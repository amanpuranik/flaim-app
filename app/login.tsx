import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, useTheme, Text, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { signin } from './helpers/auth';
import { AuthResponse } from './constants/types';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginBtnText, setLoginBtnText] = useState("Login")
    const [loginError, setLoginError] = useState(false)

    let clr = useTheme().colors;

    useEffect(() => {
        loading ? setLoginBtnText("Logging in...") : setLoginBtnText("Login")
    }, [loading])

    async function login() {
        if (email && password) {
            setLoading(true);
            const token: AuthResponse = await signin(email, password);
            if (token.error) {
                console.log(token)
                setLoginError(true)
            } else {
                router.replace("/feed")
            }
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView style={{ backgroundColor: clr.background }} className={`justify-center items-center h-full w-full`}>
            <View className='flex-row items-center'>
                <Text className='font-semibold' variant='displayMedium'>
                    Login
                </Text>
                <IconButton
                    icon="login"
                    iconColor={clr.primary}
                    size={48}
                />
            </View>
            <TextInput
                style={{ backgroundColor: clr.surfaceVariant }}
                className="w-5/6 mt-10 h-14"
                placeholder='Email...'
                returnKeyType="done"
                value={email}
                onChangeText={text => setEmail(text)}
                error={false}
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                mode='outlined'
                outlineColor={clr.primary}
                outlineStyle={{ borderRadius: 10, borderWidth: 0 }}

            />
            <TextInput
                style={{ backgroundColor: clr.surfaceVariant }}
                className="w-5/6 mt-3 h-14"
                placeholder="Password..."
                returnKeyType="done"
                value={password}
                onChangeText={text => setPassword(text)}
                error={false}
                secureTextEntry
                mode='outlined'
                outlineColor={clr.primary}
                outlineStyle={{ borderRadius: 10, borderWidth: 0 }}
            />
            {loginError && <Text style={{ color: clr.error }} className='w-2/3 text-center text-xs mt-1'>
                There was a problem logging you in. Make sure the email and password you entered are correct.
            </Text>}
            <Button loading={loading} contentStyle={{ height: 50 }} className='w-3/4 mt-5' mode='contained' onPress={() => login()}>{loginBtnText}</Button>
            <View className='flex-row mt-5'>
                <Text className='font-bold'>
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/register")} className='items-center'>
                    <Text style={{ color: clr.primary }} className="font-bold">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}