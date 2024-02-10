import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Text, StyleSheet, View, useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import ScheduleList from './components/ScheduleList';
import Settings from './components/Settings';


SplashScreen.preventAutoHideAsync();

export default function App() {

    const colorTheme = useColorScheme();
    const [offline_status, setOffline_status] = useState(false)

    const [responseStatus, setResponseStatus] = useState(true);

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
        loadShedule();
    };

    const saveData = async (type) => {
        if (type === 'id_color') {
            await AsyncStorage.setItem('id', JSON.stringify(id));
            await AsyncStorage.setItem('color', JSON.stringify(color));
        } else if (type === 'schedule') {
            await AsyncStorage.setItem('schedule', JSON.stringify(schedule));
        } else {
            await AsyncStorage.setItem('id', JSON.stringify(id));
            await AsyncStorage.setItem('color', JSON.stringify(color));
            await AsyncStorage.setItem('schedule', JSON.stringify(schedule));
        }
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
    const getSchedule = async () => {
        const getSchedule = await AsyncStorage.getItem('schedule');

        if (getSchedule !== null) {
            setSchedule(JSON.parse(getSchedule))
            setOffline_status(true)
        }
    };


    const loadShedule = () => {
        if (id !== undefined && color !== undefined) {
            fetch(`https://schedule-backend-production.koka.team/v1/schedule?${id.type}_id=${id.id}&is_new=true`)
                .then(response => {
                    setResponseStatus(response.ok)
                    return response.json();
                })
                .then(response => {
                    if (responseStatus) {
                        const parsedSchedule = {}
                        Object.assign(parsedSchedule, response.schedule)
                        setSchedule(parsedSchedule);
                        if (Object.keys(parsedSchedule).length > 0) {
                            saveData('schedule')
                            setValidation(true);
                            setRefreshing(false)
                            setOffline_status(false)
                        } else {
                            setValidation(false)
                            setRefreshing(false)
                        }
                    } else {
                        getSchedule();
                    }
                })
                .catch(error => {
                    console.error('Произошла ошибка при загрузке данных:', error);
                    setValidation(false);
                    setRefreshing(false)
                });
        } else {
            setRefreshing(false)
        }
    }



    useEffect(() => {
        loadShedule()
        getData();
        SplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        saveData('id_color');
    }, [id, color])

    useEffect(() => {
        if (colorTheme === 'light') {
            setColor(prev => {
                return {
                    bg: '#D2D2D2',
                    bgNight: '#E2E2E2',
                    bgLight: '#ECECEC',
                    main: (prev.main !== '#FFFFFF') ? prev.main : '#000000',
                }
            })
        } else if (colorTheme === 'dark') {
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

    const [fontsLoaded, fontError] = useFonts({
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    });

    function app() {
        if (color && color.bg !== undefined && validation) {
            return <View style={{ height: '100%' }}>
                <ScheduleList
                    offline_status={offline_status}
                    schedule={schedule}
                    id={id}
                    setSettings={setSettings}
                    color={color}
                    setColor={setColor}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        } else {
            return <View style={{ alignSelf: 'center' }}>
                {(responseStatus & !offline_status) ?
                    <ActivityIndicator style={{ marginTop: 10 }} size={'large'} color={color.main} />
                    :
                    <Text style={{ color: color.main, fontFamily: 'Raleway-Medium', fontSize: 18 }}>Нет подключения 😴</Text>}
            </View>
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: color.bg }]}
                edges={['bottom', 'top', 'left', 'right']}
            >
                {app()}
                <Settings
                    setId={setId}
                    settings={settings}
                    setSettings={setSettings}
                    color={color}
                    setColor={setColor}
                />
                <StatusBar style="light" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        justifyContent: 'center',
    },
});
