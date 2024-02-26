import React from 'react'
import { TextInput, TextInputProps, useTheme } from 'react-native-paper'

export default function FlatTextInput(props: TextInputProps) {
    let clr = useTheme().colors;
    return (
        <TextInput
            {...props}
            className="w-full mt-10"
            style={{ backgroundColor: clr.background }}
            mode="flat"
            outlineColor={clr.primary}
            outlineStyle={{ borderRadius: 10, borderWidth: 0 }}
        />)
}

