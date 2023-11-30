import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import SchuduleList from './components/ScheduleList';
import { useEffect, useState } from 'react';
import MessageError from './components/MessageError';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Header from './components/Header'
import ChangeGroup from './components/ChangeGroup';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [activeDay, setActiveDay] = useState();
    const [validation, setValidation] = useState(false);
    const [renderingModal, setRenderingModal] = useState(0);
    const [schedule, setSchedule] = useState();
    const [id, setId] = useState('236');

    function loadGroups(id) {
        if (id !== undefined) {
            fetch(`https://schedule-backend-production.koka.team/v1/schedule?group_id=${id}&is_new=true`)
                .then(response => response.json())
                .then(response => {
                    const parsedSchedule = JSON.parse(JSON.stringify(response.schedule));
                    setSchedule(parsedSchedule);
                    if (typeof parsedSchedule === 'object' && parsedSchedule !== null && Object.keys(parsedSchedule).length > 0) {
                        console.log('Данные успешно загружены');
                        setActiveDay(Object.keys(parsedSchedule)[0])
                    } else {
                        console.log('Данные не загружены');
                    }
                })
                .catch(error => {
                    console.error('Произошла ошибка при загрузке данных:', error);
                    setValidation(false);
                });
        }
    }

    function InHeader() {
        if (schedule) {
            return Object.keys(schedule).map(key => {
                return {
                    name: key,
                    date: schedule[key].date
                };
            });
        }
        return [];
    }

    useEffect(() => {
        loadGroups(id);
    }, []); 

    useEffect(() => {
        if (schedule && schedule[activeDay]) {
            setValidation(true);
            SplashScreen.hideAsync();
        }
    }, [schedule, activeDay]); // Обновление данных при изменении schedule

    function app() {
        if (validation) {
            return (
                <>
                    <ChangeGroup renderingModal={renderingModal} setRenderingModal={setRenderingModal}/>
                    <Header dates={InHeader()} activeDay={activeDay} setActiveDay={setActiveDay} setRenderingModal={setRenderingModal}/>
                    <SchuduleList schedule={schedule} activeDay={activeDay} />
                </>
            );
        } else {
            return <MessageError message={"нету расписания"} />;
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
        backgroundColor: '#272727',
        paddingTop: 5,
    },
});
