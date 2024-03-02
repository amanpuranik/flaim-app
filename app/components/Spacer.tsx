import React from 'react'
import { View } from 'react-native'

type SpacerProps = {
    space: number
}

export default function Spacer(props: SpacerProps) {
    return (
        <View style={{ marginVertical: props.space * 4 }} />
    )
}
