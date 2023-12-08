import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from './Colors'

export default function Header({ date }) {

    function FormatedDate(date) {
        let today = new Date(date * 1000);

        const list = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = today.getDay();


        return `${list[dayIndex]}, ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`
    }

    return (
        <View style={styles.container}>
            <Text style={{color: color.main}}>{FormatedDate(date)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: color.bgNight,
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
    },
})