import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context';
import { MaterialIcons } from '@expo/vector-icons';

// Предназначен для обработки различных ошибок

export default function Indicator() {
    const { isConnected, user, fetchedSchedule, setShowSettings, isLoadSchedule } = useContext(Context);

    function renderIndicator() {
        if (isConnected) {
            if (!isLoadSchedule && fetchedSchedule === null) {

                // Проверка на то что приложение осуществило первый запуск
                if (user.id === null) {
                    return (
                        <View style={{ alignItems: 'center' }}>
                            <MaterialIcons name="check" size={64} color={user.main + 'a4'} />
                            <Text style={[styles.text, { color: user.main + 'a4' }]}>
                                Выберите группу / преподавателя
                            </Text>
                            <TouchableOpacity style={[styles.button, { backgroundColor: user.main + 'a4' }]} onPress={() => {
                                setShowSettings(true);
                            }}>
                                <MaterialIcons name="settings" size={36} color={user.bg} />
                            </TouchableOpacity>
                            <Text style={[styles.text, { color: user.main + 'a4', marginVertical: 10, fontSize: 12, opacity: 0.5 }]}>
                                Спасибо что выбрали нас!❤️
                            </Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={{ alignItems: 'center' }}>
                            <MaterialIcons name="not-interested" size={64} color={user.main + 'a4'} />
                            <Text style={[styles.text, { color: user.main + 'a4' }]}>
                                Кажется, расписания нет
                            </Text>
                            <TouchableOpacity style={[styles.button, { backgroundColor: user.main + 'a4' }]} onPress={() => {
                                setShowSettings(true);
                            }}>
                                <MaterialIcons name="settings" size={36} color={user.bg} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            } else {
                return (
                    // крутилка запускается при загрузке
                    <ActivityIndicator style={{ marginTop: 10 }} size={'large'} color={user.main} />
                );
            }
        } else {
            return (
                // В случае если нет подключения к интернету
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
        width: '90%',
        alignItems: "center",
        borderRadius: 10,
        elevation: 5,
        padding: 6
    },
    text: {
        fontFamily: 'Raleway-Regular',
        fontSize: 18,
        marginVertical: 32,
        textAlign: 'center'
    }
})