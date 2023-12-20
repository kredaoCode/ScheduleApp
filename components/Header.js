import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import colors from './Colors'

export default function Header({ date, setSettings }) {

    function FormatedDate(date) {
        let today = new Date(date * 1000);

        const list = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = today.getDay();


        return `${list[dayIndex]}, ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: colors.color.main}}>{FormatedDate(date)}</Text>
            <Pressable onPress={() => setSettings(true)}>
                <Ionicons name="ellipsis-vertical" size={24} color={colors.color.main} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.color.bgNight,
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
})