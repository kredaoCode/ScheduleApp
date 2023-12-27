import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

export default function Header({ date, setSettings, color, id }) {

    function FormatedDate(date) {
        let today = new Date(date * 1000);

        const list = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = today.getDay();


        return `${list[dayIndex]}, ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`
    }

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color.bgNight }]} onPress={() => setSettings(true)}>
            <Text style={{ color: color.main, fontFamily: 'Raleway-Medium' }}>{id.name}, {FormatedDate(date)}</Text>
                <Ionicons name="ellipsis-vertical" size={24} color={color.main} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
})