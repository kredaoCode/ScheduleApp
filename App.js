import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, LogBox } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import ScheduleList from './widgets/schedule/ScheduleList';
import Settings from './widgets/settings/Settings';
import NetInfo from '@react-native-community/netinfo';
import { Context } from './context'
import Indicator from './widgets/Indicator';


SplashScreen.preventAutoHideAsync();

export default function App() {
    const [isConnected, setIsConnected] = useState(true);// состояние сети 
    const [user, setUser] = useState({
        // параметры цвета
        bg: '#161616',
        bgNight: '#1d1c1c',
        bgLight: '#232323',
        main: '#FFFFFF',
        // Параметры расписания
        id: null,
        type: 'group',
        name: 'ИСР-12',
    })
    const [isLoadSchedule, setIsLoadSchedule] = useState(true);
    // Индикатор загрузки данных пользователя
    const [isLoadedUser, setIsLoadedUser] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [fetchedSchedule, setFetchedSchedule] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Функция рефреша
    const onRefresh = () => {
        setIsLoadSchedule(true);
        setIsRefreshing(true);
        loadSchedule();
    };

    // функция сохранение данных пользователья, вызывается при каждом изменении состояния user
    const saveData = async () => {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    };

    // функция загрузки данных пользователя, вызывается один раз в начале жизненого цикла
    const getData = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
            setUser(JSON.parse(storedUser));
            setIsLoadedUser(true);
        }
    };

    const loadSchedule = () => {
        if (user.id !== null) {
            setFetchedSchedule(null)
            fetch(`https://schedule-backend-production.koka.team/v1/schedule?${user.type}_id=${user.id}&is_new=true`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return null;
                    }
                })
                .then(data => {
                    if (data !== null && isConnected) {
                        const parsedSchedule = data.schedule;

                        if (Object.keys(parsedSchedule).length !== 0) {
                            setFetchedSchedule(parsedSchedule);
                        } else {
                            setFetchedSchedule(null);
                        }
                    } else {
                        setFetchedSchedule(null);
                    }
                    setIsLoadSchedule(false)
                    setIsRefreshing(false);
                })
                .catch(error => {
                    setIsLoadSchedule(false)
                    setFetchedSchedule(null);
                    setIsRefreshing(false);
                });
        } else {
            setIsLoadSchedule(false)
        }
    };

    useEffect(() => {
        // для управления состоянием подключения к сети
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useMemo(() => {
        if (isConnected && isLoadSchedule && isLoadedUser) {
            SplashScreen.hideAsync();
            loadSchedule();
        }
        if (user.id !== null && fetchedSchedule !== null) {
            saveData();
        }
    }, [user, isLoadedUser])

    useMemo(() => {
        getData();
    }, []);

    return (
        <Context.Provider
            value={{
                user,
                setUser,
                isConnected,
                showSettings,
                setShowSettings,
                fetchedSchedule,
                isRefreshing,
                onRefresh,
                setIsLoadSchedule,
                isLoadSchedule
            }}
        >
            {/* SafeAreaProvider это контейнер создающий безопасную зону для компонентов,
                чтобы предотвратить скрытие компонентов системными элементами */}
            <SafeAreaProvider>
                <SafeAreaView
                    style={[styles.container, { backgroundColor: user.bg }]}
                    edges={['bottom', 'top', 'left', 'right']}
                >
                    {fetchedSchedule !== null ? <ScheduleList /> : <Indicator />}

                    {/* Модальное окно настроек */}
                    <Settings />

                    {/* StatusBar это компонент управляющий в данном случае стилем апаратной строки состояния  */}
                    <StatusBar style="light" />
                </SafeAreaView>
            </SafeAreaProvider>
        </Context.Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
    },
});
