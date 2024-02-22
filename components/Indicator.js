import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context';
import { MaterialIcons } from '@expo/vector-icons';

export default function Indicator() {

    const {isConnected, color, isSchedule, setSettings} = useContext(Context);

    function indicator() {
        if (isConnected) {
            if (isSchedule) {
                return <ActivityIndicator style={{ marginTop: 10 }} size={'large'} color={color.main} />
            } else {
                return <View style={{alignItems: 'center'}}>
                    <MaterialIcons name="not-interested" size={64} color={color.bgLight} />
                    <Text style={{ color: color.bgLight, fontFamily: 'Raleway-Medium', fontSize: 18 }}>Отсутствует расписание</Text>
                    <TouchableOpacity style={[styles.button, {backgroundColor: color.bgLight}]} onPress={() => {
                        setSettings(true);
                    }}>
                        <MaterialIcons name="settings" size={48} color={color.bg} />
                    </TouchableOpacity>
                </View>
            }
        } else {
            return <Text style={{ color: color.main, fontFamily: 'Raleway-Medium', fontSize: 18 }}>Нет подключения 😴</Text>
        }
    }

    return (
        <View>
            {indicator()}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 50, 
        width: '90%', 
        alignItems: "center",
        borderRadius: 10,
        elevation: 5,
    }
})