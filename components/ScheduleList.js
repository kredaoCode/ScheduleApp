import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import ScheduleItem from './ScheduleItem';

export default function SchuduleList({ schedule, activeDay }) {

    return (
        <View style={styles.container}>
            <View style={styles.schedule}>
                {(schedule && schedule[activeDay]) ?
                    <FlatList
                        style={styles.list}
                        data={schedule[activeDay].schedule.filter(item => item !== null)}
                        renderItem={({ item }) => <ScheduleItem info={item} />}
                    /> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    list: {
    },
})