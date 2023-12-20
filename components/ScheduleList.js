import { FlatList, StyleSheet, View } from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React from 'react'

export default function ScheduleList({ schedule, setSettings }) {

    return (
        <View>
            <FlatList
                horizontal
                pagingEnabled
                overScrollMode='never'
                showsHorizontalScrollIndicator={false}
                data={Object.values(schedule)}
                keyExtractor={(item , index) => index.toString()}
                renderItem={({ item }) => <ScheduleDayList scheduleItem={item} setSettings={setSettings} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({})