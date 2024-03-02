import React from 'react'
import { View } from 'react-native';
import { Text, TextInput, TextInputProps, useTheme } from 'react-native-paper'

interface CustomInputProps extends TextInputProps {
    errorText?: string
}

export default function OutlinedTextInput(props: CustomInputProps) {
    let clr = useTheme().colors;
    const borderWidth = props.error ? 2 : 0
    const textColor = props.error ? clr.error : clr.onBackground
    return (
        <View className='w-full'>
            <TextInput
                {...props}
                style={{ backgroundColor: clr.surfaceVariant }}
                mode="outlined"
                dense
                textColor={textColor}
                outlineColor={clr.primary}
                outlineStyle={{ borderRadius: 10, borderWidth: borderWidth }}
            />
            {props.error && props.errorText && <Text style={{ color: clr.error }}>{props.errorText}</Text>}
        </View>
    )
}

