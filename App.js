import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import { useState, useCallback, useMemo, useEffect, } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import ScheduleList from './components/ScheduleList';
import NoSchedule from './components/NoSchedule';
import Settings from './components/Settings';


SplashScreen.preventAutoHideAsync();

export default function App() {
    const [color, setColor] = useState();
    const [validation, setValidation] = useState(false);
    const [settings, setSettings] = useState(false);
    const [schedule, setSchedule] = useState({});
    const [id, setId] = useState();

    const saveData = async () => {
            await AsyncStorage.setItem('id', JSON.stringify(id));
            await AsyncStorage.setItem('color', JSON.stringify(color));
            console.log('сохранено');
    };
    const getData = async () => {
        console.log('загрузка настроек')
        const getId = await AsyncStorage.getItem('id');
        const getColor = await AsyncStorage.getItem('color');

        if (getId !== null) {
            setId(JSON.parse(getId))
            console.log('загружено id')
        } else {
            setId({
                id: 236,
                type: 'group',
                name: 'ИСР-12',
            })
            console.log('загружено null')
        }
        if (getColor !== null) {
            setColor(JSON.parse(getColor))
            console.log('загружен color')
        } else {
            setColor({
                bg: '#1D1D1D',
                bgNight: '#222222',
                bgLight: '#272727',
                main: '#FFFFFF',
            })
            console.log('загружено null')
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (validation) {
            saveData();
            console.log('Данные сохранены');
        }
    }, [id, color])

    function loadGroups() {
        if (id !== undefined && color !== undefined) {
            fetch(`https://schedule-backend-production.koka.team/v1/schedule?${id.type}_id=${id.id}&is_new=true`)
                .then(response => response.json())
                .then(response => {
                    const parsedSchedule = JSON.parse(JSON.stringify(response.schedule));
                    setSchedule(parsedSchedule);
                    if (typeof parsedSchedule === 'object' && parsedSchedule !== null && Object.keys(parsedSchedule).length > 0 && id.name !== undefined) {
                        console.log('Данные успешно загружены');
                        setValidation(true);
                    } else {
                        console.log(`Данные не загружены ${id.id} ${id.type}`);
                        setValidation(false)
                    }
                })
                .catch(error => {
                    console.error('Произошла ошибка при загрузке данных:', error);
                    setValidation(false);
                });
        }
    }

    useMemo(() => {
        loadGroups();
        setSettings(false);
    }, [id, color]);

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
        if (settings) {
            return <>
                <Settings setId={setId} setSettings={setSettings} color={color} setColor={setColor} />
            </>
        } else {
            SplashScreen.hideAsync();
            if (validation) {
                return <>
                    <ScheduleList schedule={schedule} id={id} setSettings={setSettings} color={color} />
                </>
            } else {
                return <>
                    <NoSchedule color={color} setSettings={setSettings} />
                </>
            }
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: color.bg }]} edges={['bottom', 'top', 'left', 'right']} onLayout={onLayoutRootView}>
                {app()}
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
