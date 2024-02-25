import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react'
import ChangeColor from '../settings/ChangeColor';
import { Context } from '../../context';

export default function Header({ date }) {
    const {color, setSettings, id} = useContext(Context)

    function FormatedDate(date) {
        let today = new Date(date * 1000);

        const list = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = today.getDay();
        const month = (today.getMonth() > 9) ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
        const day = (today.getDate() > 9) ? today.getDate() : `0${today.getDate()}`;

        return `${list[dayIndex]}, ${day}.${month}.${today.getFullYear()}`
    }

    return (
        <View>
            <View style={[styles.container, { backgroundColor: color.bgNight }]}>
                <Text style={{ color: color.main, fontFamily: 'Raleway-Medium' }}>{id.name}, {FormatedDate(date)}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <ChangeColor setSettings={setSettings} />
                    <TouchableOpacity onPress={() => setSettings(true)}>
                        <Ionicons name="ellipsis-vertical" size={24} color={color.main} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})