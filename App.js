import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, useColorScheme } from 'react-native';
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

    const [isSchedule, setIsShedule] = useState(true);
    const [isConnected, setIsConnected] = useState(true);

    const colorTheme = useColorScheme();

    const [color, setColor] = useState({
        bg: '#1B1B1B',
        bgNight: '#222222',
        bgLight: '#272727',
        main: '#FFFFFF',
    });
    const [validation, setValidation] = useState(false);
    const [settings, setSettings] = useState(false);
    const [schedule, setSchedule] = useState({});
    const [id, setId] = useState({
        id: 236,
        type: 'group',
        name: 'ИСР-12',
    });

    const [refreshing, setRefreshing] = useState(false);



    const onRefresh = () => {
        setRefreshing(true);
        loadSchedule();
    };

    const saveData = async () => {
        await AsyncStorage.setItem('id', JSON.stringify(id));
        await AsyncStorage.setItem('color', JSON.stringify(color));
        //await AsyncStorage.setItem('schedule', JSON.stringify(schedule));
    };
    const getData = async () => {
        const getId = await AsyncStorage.getItem('id');
        const getColor = await AsyncStorage.getItem('color');

        if (getId !== null) {
            setId(JSON.parse(getId))
        }
        if (getColor !== null) {
            setColor(JSON.parse(getColor))
        }
    };
    const getOfflineSchedule = async () => {
        const getSchedule = await AsyncStorage.getItem('schedule');

        if (getSchedule !== null) {
            setSchedule(JSON.parse(getSchedule))
        }
    };


    const loadSchedule = () => {
        setValidation(false)
        fetch(`https://schedule-backend-production.koka.team/v1/schedule?${id.type}_id=${id.id}&is_new=true`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(data => {
                if (data !== null && isConnected) {
                    const parsedSchedule = {};
                    Object.assign(parsedSchedule, data.schedule);
                    setSchedule(parsedSchedule);
                    setRefreshing(false);
                    if (Object.keys(parsedSchedule).length > 0) {
                        setValidation(true);
                        setIsShedule(true)
                    } else {
                        setValidation(false)
                        setIsShedule(false);
                    }
                } else if (!isConnected || data == null) {
                    setValidation(false);
                    //getOfflineSchedule();
                }
            })
            .catch(error => {
                setValidation(false);
                setRefreshing(false);
                //getOfflineSchedule();
                console.log('ошибка в catch')
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
        if (id.id !== undefined && isConnected) {
            SplashScreen.hideAsync()
            loadSchedule()
        }
    }, [isConnected, id])

    useMemo(() => {
        getData();
    }, [])

    useMemo(() => {
        saveData()
    }, [id, color])

    useMemo(() => {
        if (colorTheme == 'light') {
            setColor(prev => {
                return {
                    bg: '#D2D2D2',
                    bgNight: '#E2E2E2',
                    bgLight: '#ECECEC',
                    main: (prev.main !== '#FFFFFF') ? prev.main : '#000000',
                }
            })
        } else if (colorTheme == 'dark') {
            setColor(prev => {
                return {
                    bg: '#1B1B1B',
                    bgNight: '#222222',
                    bgLight: '#272727',
                    main: (prev.main !== '#000000') ? prev.main : '#FFFFFF',
                }
            })
        }
    }, [colorTheme])

    return (
        <Context.Provider value={{
            color, setColor, isConnected, settings, setSettings, schedule, id, setId, refreshing, onRefresh, isSchedule, colorTheme
        }}>
            <SafeAreaProvider>
                <SafeAreaView style={[styles.container, { backgroundColor: color.bg }]}
                    edges={['bottom', 'top', 'left', 'right']}
                >
                    {(color.bg !== undefined && validation) ? <ScheduleList /> : <Indicator />}
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
        justifyContent: 'center',
    },
});
