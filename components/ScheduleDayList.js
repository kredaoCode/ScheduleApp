import { FlatList, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import ScheduleItem from './ScheduleItem';
import Header from './Header';
import OfflineStatus from './OfflineStatus';

export default function SchuduleList({ scheduleItem, setSettings, color, setColor, id, offline_status }) {

    return (
        <View style={styles.container}>
            {(scheduleItem) ?
                <>
                    <Header id={id} date={scheduleItem.date} setSettings={setSettings} color={color} setColor={setColor} />
                    {(!offline_status) ? <OfflineStatus color={color}/>: null}
                    <FlatList
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={scheduleItem.schedule.filter(item => item !== null)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <ScheduleItem index={index} info={item} color={color} />}
                    />
                </>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: Dimensions.get('window').width,
    },
    header: {

    }
})