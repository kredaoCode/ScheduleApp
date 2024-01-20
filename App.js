import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import { useState, useCallback, useMemo, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import ScheduleList from './components/ScheduleList';
import NoSchedule from './components/NoSchedule';
import Settings from './components/Settings';


SplashScreen.preventAutoHideAsync();

export default function App() {
    const [color, setColor] = useState({
        bg: '#FAFAFAC9',
        bgNight: '#EBEBEBA4',
        bgLight: '#FAFAFA',
        main: '#181818',
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
    const [isEnabledTheme, setIsEnabledTheme] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    const saveData = async () => {
        await AsyncStorage.setItem('id', JSON.stringify(id));
        await AsyncStorage.setItem('color', JSON.stringify(color));
        await AsyncStorage.setItem('theme', JSON.stringify(isEnabledTheme));
    };
    const getData = async () => {
        const getId = await AsyncStorage.getItem('id');
        const getColor = await AsyncStorage.getItem('color');
        const getTheme = await AsyncStorage.getItem('theme');

        if (getId !== null) {
            setId(JSON.parse(getId))
        }
        if (getColor !== null) {
            setColor(JSON.parse(getColor))
        }
        if (getTheme !== null) {
            setIsEnabledTheme(JSON.parse(getTheme))
        }
    };

    const loadData = () => {
        if (id !== undefined && color !== undefined) {
            fetch(`https://schedule-backend-production.koka.team/v1/schedule?${id.type}_id=${id.id}&is_new=true`)
                .then(response => response.json())
                .then(response => {
                    const parsedSchedule = {}
                    Object.assign(parsedSchedule, response.schedule)
                    setSchedule(parsedSchedule);
                    if (Object.keys(parsedSchedule).length > 0) {
                        setValidation(true);
                        setRefreshing(false)
                    } else {
                        console.log(`Данные не загружены ${id.id} ${id.type}`);
                        setValidation(false)
                        setRefreshing(false)
                    }
                })
                .catch(error => {
                    console.error('Произошла ошибка при загрузке данных:', error);
                    setValidation(false);
                });
        }
    }

    useEffect(() => {
        loadData();
        getData();
    }, []);

    
    useMemo(() => {
        if (isEnabledTheme == true) {
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
    }, [isEnabledTheme])

    useEffect(() => {
        if (validation) {
            saveData();
        }
    }, [id, color, isEnabledTheme])

    useEffect(() => {
        loadData();
    }, [id])

    const [fontsLoaded, fontError] = useFonts({
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    function app() {
        if (color && color.bg !== undefined) {
            if (validation) {
                return <>
                    <ScheduleList
                        schedule={schedule}
                        id={id}
                        setSettings={setSettings}
                        color={color}
                        refreshing={refreshing}
                        onRefresh={onRefresh}

                    />
                </>
            } else {
                return <>
                    <NoSchedule
                        color={color}
                        setSettings={setSettings}
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                </>
            }
        } else {
            console.log("пиздец")
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: color.bg }]}
                edges={['bottom', 'top', 'left', 'right']}
                onLayout={onLayoutRootView}
            >
                {app()}
                <Settings
                    setId={setId}
                    settings={settings}
                    setSettings={setSettings}
                    color={color}
                    setColor={setColor}
                    isEnabledTheme={isEnabledTheme}
                    setIsEnabledTheme={setIsEnabledTheme}
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
    },
});
