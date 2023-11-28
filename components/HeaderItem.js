import { Pressable, StyleSheet, Text } from 'react-native'
import color from './Colors'
import React from 'react'


export default function HeaderItem({ item, activeDay, setActiveDay }) {

    return (
        <Pressable style={() => [{
                    borderColor: (activeDay === item.name) ? color.main : color.mainTransparent,
                }, styles.container]} onPress={() => setActiveDay(item.name)}>
            <Text style={{
                color: (activeDay == item.name) ? color.main : color.mainTransparent,
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