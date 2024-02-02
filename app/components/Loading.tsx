import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Loading() {
    let clr = useTheme().colors;
    return (
        <SafeAreaView style={{ backgroundColor: clr.background }} className={`h-full w-full justify-center items-center`}>
            <ActivityIndicator size="large" />
        </SafeAreaView>
    )
}