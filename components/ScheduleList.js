import { FlatList, StyleSheet, View, Dimensions, RefreshControl } from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React, { useRef, useState } from 'react'
import NoSchedule from './NoSchedule';

export default function ScheduleList({ schedule, setSettings, color, id, refreshing, onRefresh, offline_status }) {

    const scheduleData = Object.values(schedule);
    const itemWidth = Dimensions.get('window').width;

    // Chat GPT
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
        // Do something with currentIndex if needed
    };

    const handleMomentumScrollEnd = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const newIndex = Math.round(contentOffset.x / layoutMeasurement.width);
        flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
    };
    // Chat GPT

    return (
        <View>
            <FlatList
                ref={flatListRef}
                horizontal
                overScrollMode='never'
                showsHorizontalScrollIndicator={false}
                data={Object.values(schedule)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ScheduleDayList offline_status={offline_status} id={id} scheduleItem={item} setSettings={setSettings} color={color} />
                )}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[color.main, color.bg]} progressBackgroundColor={color.bg} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({})