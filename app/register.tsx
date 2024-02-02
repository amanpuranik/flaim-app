import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { AuthResponse } from './constants/types';
import { signup } from './helpers/auth';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [regBtnText, setRegBtnText] = useState("Register")
    const [regError, setRegError] = useState(false)

    let clr = useTheme().colors;

    useEffect(() => {
        loading ? setRegBtnText("Creating account...") : setRegBtnText("Register")
    }, [loading])

    async function register() {
        if (email && password) {
            setLoading(true);
            const token: AuthResponse = await signup(email, password);
            if (token.error) {
                console.log(token)
                setRegError(true)
            } else {
                router.replace("/feed");
            }
            setLoading(false);
        }
    }


    return (
        <KeyboardAvoidingView style={{ backgroundColor: clr.background }} className={`justify-center items-center h-full w-full`}>
            <View className='flex-row items-center'>
                <Text className='font-semibold' variant='displayMedium'>
                    Register
                </Text>
                <IconButton
                    icon="account-plus"
                    iconColor={clr.primary}
                    size={48}
                />
            </View>
            <TextInput
                style={{ backgroundColor: clr.surfaceVariant }}
                className="w-5/6 mt-10 h-14"
                placeholder="Email..."
                returnKeyType="done"
                value={email}
                onChangeText={text => setEmail(text)}
                error={true}
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
            {/* <TextInput
                style={{ backgroundColor: clr.surfaceVariant }}
                className={`w-5/6 mt-3 h-14`}
                placeholder='Confirm Password...'
                returnKeyType="done"
                value={confirmPassword}
                onChangeText={text => setPassword(text)}
                error={false}
                secureTextEntry
                mode='outlined'
                outlineColor={clr.primary}
                outlineStyle={{ borderRadius: 10, borderWidth: 0 }}
            /> */}
            {regError && <Text style={{ color: clr.error }} className='w-2/3 text-center text-xs mt-1'>
                There was a problem creating your account. Please try again.
            </Text>}
            <Button loading={loading} contentStyle={{ height: 50 }} className='w-3/4 mt-5' mode='contained' onPress={() => register()}>{regBtnText}</Button>
            <View className='flex-row mt-5'>
                <Text className='font-bold'>
                    Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/login")} className='items-center'>
                    <Text style={{ color: clr.primary }} className="font-bold">
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}