import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
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
        id: undefined,
        type: 'group',
        name: 'ИСР-12',
    })
    const [isLoadSchedule, setIsLoadSchedule] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [fetchedSchedule, setFetchedSchedule] = useState(undefined);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Функция рефреша
    const onRefresh = () => {
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
        }
    };

    const loadSchedule = () => {
        setFetchedSchedule(undefined)
        fetch(`https://schedule-backend-production.koka.team/v1/schedule?${user.type}_id=${user.id}&is_new=true`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(data => {
                setIsLoadSchedule(false)
                if (data !== null && isConnected) {
                    const parsedSchedule = { ...data.schedule };

                    if (Object.keys(parsedSchedule).length > 0) {
                        setFetchedSchedule(parsedSchedule);
                        
                    } else {
                        setFetchedSchedule(null);
                    }
                    setIsRefreshing(false);
                } else if (!isConnected || data == null) {
                    setFetchedSchedule(null);
                }
            })
            .catch(error => {
                setFetchedSchedule(null);
                setIsRefreshing(false);
            });
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
        if (!showSettings && isConnected && isLoadSchedule) {
            SplashScreen.hideAsync();
            loadSchedule();
        }
        if (typeof fetchedSchedule == "object") {
            saveData();
        }
    }, [user])

    useMemo(() => {
        //getData();
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

            <SafeAreaProvider>
                <SafeAreaView
                    style={[styles.container, { backgroundColor: user.bg }]}
                    edges={['bottom', 'top', 'left', 'right']}
                >
                    {fetchedSchedule !== undefined && fetchedSchedule !== null ? <ScheduleList /> : <Indicator />}
                    <Settings />
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
