import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import SchuduleList from './components/ScheduleList';
import { useEffect, useState } from 'react';
import MessageError from './components/MessageError';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Header from './components/Header'

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [activeDay, setActiveDay] = useState();
    const [validation, setValidation] = useState(false);
    const [schedule, setSchedule] = useState();
    const [id, setId] = useState('238');

    function loadGroups(id) {
        if (id !== undefined) {
            fetch(`https://schedule-backend-production.koka.team/v1/schedule?group_id=${id}&is_new=true`)
                .then(response => response.json())
                .then(response => {
                    setSchedule(JSON.parse(JSON.stringify(response.schedule)));
                    if (typeof schedule === 'object' && schedule !== null && Object.keys(schedule).length > 0) {
                        console.log('Данные успешно загружены');
                    } else {
                        console.log('Данные не загружены');
                    }
                })
                .catch(error => {
                    console.error('Произошла ошибка при загрузке данных:', error);
                });
        }
    }

    function InHeader() { // обработка данных для хэдера
        return Object.keys(schedule).map(key => {
            return {
                name: key,
                date: schedule[key].date
            }
        });
    }

    useEffect(() => { // хук запускает функцию на старте
        loadGroups(id);
    }, []);


    function app() {
        if (validation) {
            return <>
                <Header dates={InHeader()} activeDay={activeDay} />
                <SchuduleList schedule={schedule} activeDay={activeDay} />
            </>
        } else {
            return <MessageError message={"нету расписания"} />
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
