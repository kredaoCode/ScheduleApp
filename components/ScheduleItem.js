import { StyleSheet, Text, View } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react'
import color from './Colors'

export default function ScheduleItem({ item }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {item[0].type == "Лекция" ? 
                    <Ionicons name="school" size={16} color={color.mainTransparent} /> : 
                    <SimpleLineIcons name="chemistry" size={16} color={color.mainTransparent} />}
                
                <Text style={styles.typeText}>{item[0].type}</Text>
                <Text style={styles.textTransparent}>{item[0].time}</Text>
            </View>
            <Text style={styles.nameText}>{item[0].name}</Text>
            <View style={styles.teacherContainer}>
                <Text style={styles.teacherText}>{item[0].teacher}</Text>
                {(item[0].location !== null) ? 
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>{item[0].location}</Text>
                    </View> : 
                    undefined}
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333333',
        borderRadius: 14,
        padding: 10,
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
    },
    teacherContainer: {
        backgroundColor: '#383838',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    locationContainer: {
        backgroundColor: '#4B4B4B',
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    teacherText: {
        color: color.main,
        fontSize: 16,
    },
    locationText: {
        color: color.main,
        fontSize: 16,
    },
    textTransparent: {
        color: color.mainTransparent,
    },
    typeText: {
        color: color.mainTransparent,
        marginHorizontal: 5, 
    },
    nameText: {
        color: color.main,
        fontSize: 16,
        marginVertical: 8,
    },
})