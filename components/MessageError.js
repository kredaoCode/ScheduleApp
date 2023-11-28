import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from './Colors'
import ChangeGroup from './ChangeGroup'

export default function MessageError({ message }) {
    return (
        <View style={styles.warning}>
            <ChangeGroup />
            <Text style={styles.warningText}>{message}</Text>
            <Pressable style={styles.button}>
                <Text style={{color: color.main}}>Выбрать группу или преподавателя</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    warningText: {
        color: color.main,
    },
    warning: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: color.main,
        borderRadius: 15,
    }
})