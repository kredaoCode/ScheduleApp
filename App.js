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
    const [isSchedule, setIsSchedule] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [colorTheme, setColorTheme] = useState({
        bg: '#1B1B1B',
        bgNight: '#222222',
        bgLight: '#272727',
        main: '#FFFFFF',
    });
    const [isValidSchedule, setIsValidSchedule] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [fetchedSchedule, setFetchedSchedule] = useState({});
    const [deviceId, setDeviceId] = useState({
        id: 236,
        type: 'group',
        name: 'ИСР-12',
    });
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = () => {
        setIsRefreshing(true);
        loadSchedule();
    };

    const saveData = async () => {
        await AsyncStorage.setItem('deviceId', JSON.stringify(deviceId));
        await AsyncStorage.setItem('colorTheme', JSON.stringify(colorTheme));
    };

    const getData = async () => {
        const storedDeviceId = await AsyncStorage.getItem('deviceId');
        const storedColorTheme = await AsyncStorage.getItem('colorTheme');

        if (storedDeviceId !== null) {
            setDeviceId(JSON.parse(storedDeviceId));
        }
        if (storedColorTheme !== null) {
            setColorTheme(JSON.parse(storedColorTheme));
        }
    };

    const loadSchedule = () => {
        setIsValidSchedule(false);
        fetch(`https://schedule-backend-production.koka.team/v1/schedule?${deviceId.type}_id=${deviceId.id}&is_new=true`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(data => {
                if (data !== null && isConnected) {
                    const parsedSchedule = { ...data.schedule };
                    setFetchedSchedule(parsedSchedule);
                    setIsRefreshing(false);
                    if (Object.keys(parsedSchedule).length > 0) {
                        setIsValidSchedule(true);
                        setIsSchedule(true);
                    } else {
                        setIsValidSchedule(false);
                        setIsSchedule(false);
                    }
                } else if (!isConnected || data == null) {
                    setIsValidSchedule(false);
                }
            })
            .catch(error => {
                setIsValidSchedule(false);
                setIsRefreshing(false);
            });
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useMemo(() => {
        if (deviceId.id !== undefined && isConnected) {
            SplashScreen.hideAsync();
            loadSchedule();
        }
    }, [isConnected, deviceId]);

    useMemo(() => {
        getData();
    }, []);

    useMemo(() => {
        saveData();
    }, [deviceId, colorTheme]);

    return (
        <Context.Provider
            value={{
                colorTheme,
                setColorTheme,
                isConnected,
                showSettings,
                setShowSettings,
                fetchedSchedule,
                deviceId,
                setDeviceId,
                isRefreshing,
                onRefresh,
                isSchedule,
            }}
        >
            <SafeAreaProvider>
                <SafeAreaView
                    style={[styles.container, { backgroundColor: colorTheme.bg }]}
                    edges={['bottom', 'top', 'left', 'right']}
                >
                    {colorTheme.bg !== undefined && isValidSchedule ? <ScheduleList /> : <Indicator />}
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
