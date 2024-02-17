import { StyleSheet, Text, View } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react'
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Context } from '../context';

export default function ScheduleItem({ index, info }) {
    const { color } = useContext(Context);
    const opacity = useSharedValue(0);

    useEffect(() => {
        setTimeout(() => {
            opacity.value = withTiming(1, {
                duration: 300,
            });
        }, (index + 1) * 250)
    }, [])

    function timeToEnd(time) {
        const timeRegex = /\b\d{1,2}:\d{2}\b/g;
        const times = time.match(timeRegex);
    
        const currentTime = new Date();
        const currentTimeHours = currentTime.getHours();
        const currentTimeMinutes = currentTime.getMinutes();
        const currentTotalMinutes = currentTimeHours * 60 + currentTimeMinutes;
    
        if (times && times.length < 3) {
            const firstTime = times[0].split(':');
            const firstTimeHours = parseInt(firstTime[0], 10);
            const firstTimeMinutes = parseInt(firstTime[1], 10);
            const firstTotalMinutes = firstTimeHours * 60 + firstTimeMinutes;

            const secondTime = times[1].split(':');
            const secondTimeHours = parseInt(secondTime[0], 10);
            const secondTimeMinutes = parseInt(secondTime[1], 10);
            const secondTotalMinutes = secondTimeHours * 60 + secondTimeMinutes;
    
            if (firstTotalMinutes < currentTotalMinutes && secondTotalMinutes > currentTime) {
                const timeDifference = secondTotalMinutes - currentTotalMinutes;
                const hoursDifference = Math.floor(timeDifference / 60);
                const minutesDifference = timeDifference % 60;
                return `Осталось ${hoursDifference} часов и ${minutesDifference} минут`;
            } else {
                return time;
            }
        } else if (times && times.length > 2) {
            const firstTime = times[0].split(':');
            const secondTime = times[2].split(':');
            const firstTimeHours = parseInt(firstTime[0], 10);
            const firstTimeMinutes = parseInt(firstTime[1], 10);
            const secondTimeHours = parseInt(secondTime[0], 10);
            const secondTimeMinutes = parseInt(secondTime[1], 10);
            const firstTotalMinutes = firstTimeHours * 60 + firstTimeMinutes;
            const secondTotalMinutes = secondTimeHours * 60 + secondTimeMinutes;
    
            if (firstTotalMinutes < currentTotalMinutes && secondTotalMinutes > currentTotalMinutes) {
                const timeDifference = secondTotalMinutes - currentTotalMinutes;
                const hoursDifference = Math.floor(timeDifference / 60);
                const minutesDifference = timeDifference % 60;
                return `Осталось ${hoursDifference} часов и ${minutesDifference} минут`;
            } else {
                return time;
            }
        } else {
            return 'Неверный формат времени';
        }
    }
    

return (
    <Animated.View style={[styles.container, { backgroundColor: color.bgNight, opacity }]}>
        {info.map(item =>
            <View style={{ marginVertical: 5 }} key={item.name}>
                <View style={styles.header}>
                    {item.type == "Лекция" ?
                        <Ionicons name="school" size={16} color={color.main + 'A4'} /> :
                        <SimpleLineIcons name="chemistry" size={16} color={color.main + 'A4'}
                        />}
                    <Text style={[styles.typeText, { color: color.main + 'A4' }]}>{item.type}</Text>
                    <Text style={{ color: color.main + 'A4', fontFamily: 'Raleway-Regular' }}>{timeToEnd(item.time)}</Text>
                </View>
                <Text style={[styles.nameText, { color: color.main }]}>{item.name}</Text>
                <View style={[styles.teacherContainer, { backgroundColor: color.bgLight }]}>
                    <Text style={[styles.teacherText, { color: color.main }]}>{(item.teacher || item.group)}</Text>
                    {(item.location !== null) ?
                        <View style={styles.locationContainer}>
                            <Text style={[styles.locationText, { color: color.main }]}>{item.location}</Text>
                        </View> :
                        undefined}
                </View>
            </View>
        )}
    </Animated.View>
)
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 14,
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
    },
    teacherContainer: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5,
    },
    locationContainer: {
        paddingVertical: 3,
        paddingHorizontal: 12,
    },
    teacherText: {
        fontSize: 16,
        fontFamily: 'Raleway-Regular'
    },
    locationText: {
        fontSize: 16,
        fontFamily: 'Raleway-Regular'
    },
    typeText: {
        marginHorizontal: 5,
        fontFamily: 'Raleway-Regular'
    },
    nameText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 16,
        marginVertical: 8,
    },
})