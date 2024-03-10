import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ChangeColor from '../settings/ChangeColor';
import { Context } from '../../context';

const Header = ({ date }) => {
    const {setShowSettings, user } = useContext(Context);

    // функция форматирующая дату в милисекундах в формат ДД.ММ.ГГГГ, также подставляет день недели и группу
    const formatDate = (date) => {
        const today = new Date(date * 1000);
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = today.getDay();
        const month = (today.getMonth() > 9) ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
        const day = (today.getDate() > 9) ? today.getDate() : `0${today.getDate()}`;

        return `${daysOfWeek[dayIndex]}, ${day}.${month}.${today.getFullYear()}`;
    };

    return (
        <View>
            <View style={[styles.container, { backgroundColor: user.bgNight }]}>
                <View style={{ paddingBottom: 5 }}>
                    <Text style={{ color: `${user.main}A4`, fontFamily: 'Raleway-Medium' || 'Arial', fontSize: 10 }}>{user.name}</Text>
                    <Text style={{ color: user.main, fontFamily: 'Raleway-Medium' || 'Arial' }}>{formatDate(date)}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ChangeColor />
                    <TouchableOpacity style={{ padding: 5, borderRadius: 8 }} onPress={() => setShowSettings(true)}>
                        <Ionicons name="ellipsis-vertical" size={24} color={user.main} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Header;

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