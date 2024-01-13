import { FlatList, StyleSheet, View, VirtualizedList, Dimensions, RefreshControl} from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React, { useState } from 'react'

export default function ScheduleList({ schedule, setSettings, color, id, refreshing, onRefresh }) {
    

    return (
        <View>
                <FlatList
                    horizontal
                    pagingEnabled
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    data={Object.values(schedule)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ScheduleDayList id={id} scheduleItem={item} setSettings={setSettings} color={color} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                    />
        </View>
    )
}

const styles = StyleSheet.create({})