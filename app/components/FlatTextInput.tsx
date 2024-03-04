import React from 'react'
import { View } from 'react-native';
import { Text, TextInput, TextInputProps, useTheme } from 'react-native-paper'

interface CustomInputProps extends TextInputProps {
    errorText?: string
}

export default function FlatTextInput(props: CustomInputProps) {
    let clr = useTheme().colors;
    return (
        <View className={`w-full`}>
            <TextInput
                {...props}
                style={{ backgroundColor: clr.background }}
                mode="flat"
                outlineColor={clr.primary}
                outlineStyle={{ borderRadius: 10, borderWidth: 0 }}
            />
            {props.error && props.errorText && <Text style={{ color: clr.error }}>{props.errorText}</Text>}
        </View>
    )
}


