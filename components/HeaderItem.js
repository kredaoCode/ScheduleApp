import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'

import color from './Colors'

export default function HeaderItem({ item, activeDay }) {

    return (
        <Pressable style={() => [{
                    borderColor: (activeDay === item) ? color.main : color.mainTransparent,
                }, styles.container]} onPress={() => setDay(item)}>
            <Text style={{
                color: (activeDay == item) ? color.main : color.mainTransparent,
            }}>{`${item.name}`}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 9,
        padding: 5,
        marginHorizontal: 2,
        height: 32,
    },
})