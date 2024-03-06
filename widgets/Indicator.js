import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context';
import { MaterialIcons } from '@expo/vector-icons';

export default function Indicator() {
    const { isConnected, colorTheme, isSchedule, setSettings } = useContext(Context);

    function renderIndicator() {
        if (isConnected) {
            if (isSchedule) {
                return (
                    <ActivityIndicator style={{ marginTop: 10 }} size={'large'} color={colorTheme.main} />
                );
            } else {
                return (
                    <View style={{ alignItems: 'center' }}>
                        <MaterialIcons name="not-interested" size={64} color={colorTheme.bgLight} />
                        <Text style={{ color: colorTheme.bgLight, fontFamily: 'Raleway-Medium', fontSize: 18 }}>Отсутствует расписание</Text>
                        <TouchableOpacity style={[styles.button, { backgroundColor: colorTheme.bgLight }]} onPress={() => {
                            setSettings(true);
                        }}>
                            <MaterialIcons name="settings" size={48} color={colorTheme.bg} />
                        </TouchableOpacity>
                    </View>
                );
            }
        } else {
            return (
                <Text style={{ color: colorTheme.main, fontFamily: 'Raleway-Medium', fontSize: 18, textAlign: 'center' }}>Нет подключения 😴</Text>
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