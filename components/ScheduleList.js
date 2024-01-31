import { FlatList, StyleSheet, View, Dimensions, RefreshControl } from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React, { useState } from 'react'
import NoSchedule from './NoSchedule';

export default function ScheduleList({ schedule, setSettings, color, id, refreshing, onRefresh, offline_status }) {

    const scheduleData = Object.values(schedule);
    const itemWidth = Dimensions.get('window').width;

    return (
        <View>
            <FlatList
                horizontal
                overScrollMode='never'
                showsHorizontalScrollIndicator={false}
                data={scheduleData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ScheduleDayList
                        offline_status={offline_status}
                        id={id}
                        scheduleItem={item}
                        setSettings={setSettings}
                        color={color}
                    />
                )}
                disableIntervalMomentum={true}
                decelerationRate={0.9}
                snapToInterval={Dimensions.get('window').width}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[color.main, color.bg]}
                        progressBackgroundColor={color.bg}
                    />
                }
                ListEmptyComponent={() => (
                    <NoSchedule
                        color={color}
                        setSettings={setSettings}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({})