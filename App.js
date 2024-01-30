import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Text, StyleSheet, View, useColorScheme } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import ScheduleList from './components/ScheduleList';
import Settings from './components/Settings';


SplashScreen.preventAutoHideAsync();

export default function App() {
    const colorTheme = useColorScheme();

    const [responseStatus, setResponseStatus] = useState(true);

    const [color, setColor] = useState({
        bg: '#1B1B1B',
        bgNight: '#222222',
        bgLight: '#272727',
        main: '#235BEA',
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

    const saveData = async () => {
        await AsyncStorage.setItem('id', JSON.stringify(id));
        await AsyncStorage.setItem('color', JSON.stringify(color));
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

    const loadShedule = () => {
        if (id !== undefined && color !== undefined) {
            fetch(`https://schedule-backend-production.koka.team/v1/schedule?${id.type}_id=${id.id}&is_new=true`)
                .then(response => {
                    setResponseStatus(response.ok)
                    return response.json();
                })
                .then(response => {
                    const parsedSchedule = {}
                    Object.assign(parsedSchedule, response.schedule)
                    setSchedule(parsedSchedule);
                    if (Object.keys(parsedSchedule).length > 0) {
                        setValidation(true);
                        setRefreshing(false)
                    } else {
                        setValidation(false)
                        setRefreshing(false)
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
        saveData();
    }, [id, color])

    useEffect(() => {
        if (colorTheme == 'light') {
            setColor(prev => {
                return {
                    bg: '#D3D3D3',
                    bgNight: '#CECECE',
                    bgLight: '#E4E4E4',
                    main: prev.main,
                }
            })
        } else {
            setColor(prev => {
                return {
                    bg: '#1B1B1B',
                    bgNight: '#222222',
                    bgLight: '#272727',
                    main: prev.main,
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
                    schedule={schedule}
                    id={id}
                    setSettings={setSettings}
                    color={color}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        } else {
            return <View style={{ alignSelf: 'center' }}>
                {(responseStatus) ? 
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
