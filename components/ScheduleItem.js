import { StyleSheet, Text, View } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react'
import colors from './Colors'

export default function ScheduleItem({ info }) {
    return (
        <View style={styles.container}>
            {info.map(item =>
                <View style={{marginVertical: 5}} key={item.name}>
                    <View style={styles.header}>
                        {item.type == "Лекция" ?
                            <Ionicons name="school" size={16} color={colors.color.mainTransparent} /> :
                            <SimpleLineIcons name="chemistry" size={16} color={colors.color.mainTransparent}
                            />}
                        <Text style={styles.typeText}>{item.type}</Text>
                        <Text style={styles.textTransparent}>{item.time}</Text>
                    </View>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <View style={styles.teacherContainer}>
                        <Text style={styles.teacherText}>{(item.teacher || item.group)}</Text>
                        {(item.location !== null) ?
                            <View style={styles.locationContainer}>
                                <Text style={styles.locationText}>{item.location}</Text>
                            </View> :
                            undefined}
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color.bgNight,
        borderRadius: 14,
        padding: 10,
        marginBottom: 10,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
    },
    teacherContainer: {
        backgroundColor: colors.color.bgLight,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    locationContainer: {
        backgroundColor: colors.color.bgLight,
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    teacherText: {
        color: colors.color.main,
        fontSize: 16,
    },
    locationText: {
        color: colors.color.main,
        fontSize: 16,
    },
    textTransparent: {
        color: colors.color.mainTransparent,
    },
    typeText: {
        color: colors.color.mainTransparent,
        marginHorizontal: 5,
    },
    nameText: {
        color: colors.color.main,
        fontSize: 16,
        marginVertical: 8,
    },
})