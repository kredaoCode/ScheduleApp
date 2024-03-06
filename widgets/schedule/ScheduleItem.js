import { StyleSheet, Text, View } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useContext } from 'react'
import { Context } from '../../context';

export default function ScheduleItem({ index, info }) {
    const { colorTheme } = useContext(Context);

    return (
        <View style={[styles.container, { backgroundColor: colorTheme.bgNight }]}>
            {info.map((item, index) =>
                <View style={{ marginVertical: 5 }} key={`${item.name}_${index}`}>
                    <View style={styles.header}>
                        {item.type == "Лекция" ?
                            <Ionicons name="school" size={16} color={colorTheme.main + 'A4'} /> :
                            <SimpleLineIcons name="chemistry" size={16} color={colorTheme.main + 'A4'} />}
                        <Text style={[styles.typeText, { color: colorTheme.main + 'A4' }]}>{item.type}</Text>
                        <Text style={{ color: colorTheme.main + 'A4', fontFamily: 'Raleway-Regular' }}>{item.time}</Text>
                    </View>
                    <Text style={[styles.nameText, { color: colorTheme.main }]}>{item.name}</Text>
                    <View style={[styles.teacherContainer, { backgroundColor: colorTheme.bgLight }]}>
                        <Text style={[styles.teacherText, { color: colorTheme.main }]}>{(item.teacher || item.group)}</Text>
                        {(item.location !== null) ?
                            <View style={styles.locationContainer}>
                                <Text style={[styles.locationText, { color: colorTheme.main }]}>{item.location}</Text>
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
        borderRadius: 10,
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
        fontFamily: 'Raleway-Regular' || 'Arial',
    },
    locationText: {
        fontSize: 16,
        fontFamily: 'Raleway-Regular' || 'Arial',
    },
    typeText: {
        marginHorizontal: 5,
        fontFamily: 'Raleway-Regular' || 'Arial'
    },
    nameText: {
        fontFamily: 'Raleway-Medium' || 'Arial',
        fontSize: 16,
        marginVertical: 8,
    },
})