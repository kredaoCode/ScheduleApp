import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react'
import ChangeColor from '../settings/ChangeColor';
import { Context } from '../../context';

export default function Header({ date }) {
    const { color, setSettings, id } = useContext(Context)

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
                <View style={{paddingBottom: 5}}>
                    <Text style={{ color: color.main + 'A4', fontFamily: 'Raleway-Medium' || 'Arial', fontSize: 10 }}>{id.name}</Text>
                    <Text style={{ color: color.main, fontFamily: 'Raleway-Medium' || 'Arial' }}>{FormatedDate(date)}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ChangeColor />
                    <TouchableOpacity style={{ padding: 5, borderRadius: 8 }} onPress={() => setSettings(true)}>
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
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})