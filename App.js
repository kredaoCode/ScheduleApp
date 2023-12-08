import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useMemo, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import color from './components/Colors';
import ScheduleList from './components/ScheduleList';
import NoSchedule from './components/NoSchedule';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [validation, setValidation] = useState(false);
    const [schedule, setSchedule] = useState({});
    const [id, setId] = useState({
        id: 236,
        type: 'group',
    });

    function loadGroups(id) {
        if (id.id !== undefined) {
            fetch(`https://schedule-backend-production.koka.team/v1/schedule?${id.type}_id=${id.id}&is_new=true`)
                .then(response => response.json())
                .then(response => {
                    const parsedSchedule = JSON.parse(JSON.stringify(response.schedule));
                    setSchedule(parsedSchedule);
                    if (typeof parsedSchedule === 'object' && parsedSchedule !== null && Object.keys(parsedSchedule).length > 0) {
                        console.log('Данные успешно загружены');
                        setValidation(true);
                        SplashScreen.hideAsync();
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
        loadGroups(id);
    }, []);

    function app() {
        if (validation) {
            return (
                <>
                    <ScheduleList schedule={schedule} setId={setId} />
                </>
            );
        } else {
            return <>
                <NoSchedule />
            </>
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['bottom', 'top', 'left', 'right']}>
                {app()}
                <StatusBar style="light" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.bg,
        paddingTop: 5,
    },
});
