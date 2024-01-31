import { StyleSheet, Text, View } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import Animated, {useSharedValue, withSpring, withTiming} from 'react-native-reanimated';

export default function ScheduleItem({ index, info, color }) {
    const opacity = useSharedValue(0);

    useEffect(() => {
        setTimeout(() => {
            opacity.value = withTiming(1, {
                duration: 300,
            });
        }, (index + 1) * 250)
    }, [])

    return (
        <Animated.View style={[styles.container, {backgroundColor: color.bgNight, opacity}]}>
            {info.map(item =>
                <View style={{marginVertical: 5}} key={item.name}>
                    <View style={styles.header}>
                        {item.type == "Лекция" ?
                            <Ionicons name="school" size={16} color={color.main + 'A4'} /> :
                            <SimpleLineIcons name="chemistry" size={16} color={color.main + 'A4'}
                            />}
                        <Text style={[styles.typeText, { color: color.main + 'A4'}]}>{item.type}</Text>
                        <Text style={{ color: color.main + 'A4', fontFamily: 'Raleway-Regular' }}>{item.time}</Text>
                    </View>
                    <Text style={[styles.nameText, { color: color.main }]}>{item.name}</Text>
                    <View style={[styles.teacherContainer, { backgroundColor: color.bgLight}]}>
                        <Text style={[styles.teacherText, {color: color.main}]}>{(item.teacher || item.group)}</Text>
                        {(item.location !== null) ?
                            <View style={styles.locationContainer}>
                                <Text style={[styles.locationText, {color: color.main}]}>{item.location}</Text>
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