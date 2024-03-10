import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context';
import { MaterialIcons } from '@expo/vector-icons';

// Предназначен для обработки различных ошибок

export default function Indicator() {
    const { isConnected, user, fetchedSchedule, setShowSettings } = useContext(Context);

    function renderIndicator() {
        if (isConnected) {
            if (fetchedSchedule == undefined) {
                return (
                    <ActivityIndicator style={{ marginTop: 10 }} size={'large'} color={user.main} />
                );
            } else if (fetchedSchedule == null) {
                return (
                    <View style={{ alignItems: 'center' }}>
                        <MaterialIcons name="not-interested" size={64} color={user.bgLight} />
                        <Text style={{ color: user.bgLight, fontFamily: 'Raleway-Medium', fontSize: 18 }}>Отсутствует расписание</Text>
                        <TouchableOpacity style={[styles.button, { backgroundColor: user.bgLight }]} onPress={() => {
                            setShowSettings(true);
                        }}>
                            <MaterialIcons name="settings" size={48} color={user.bg} />
                        </TouchableOpacity>
                    </View>
                );
            }
        } else {
            return (
                <Text style={{ color: user.main, fontFamily: 'Raleway-Medium', fontSize: 18, textAlign: 'center' }}>Нет подключения 😴</Text>
            );
        }
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {renderIndicator()}
        </View>
    );
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