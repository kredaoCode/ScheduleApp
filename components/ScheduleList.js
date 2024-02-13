import { FlatList, StyleSheet, View, Dimensions, RefreshControl } from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React from 'react'

export default function ScheduleList({ schedule, setSettings, color, setColor, id, refreshing, onRefresh, offline_status }) {

    return (
        <View>
            <FlatList
                horizontal
                overScrollMode='never'
                showsHorizontalScrollIndicator={false}
                data={Object.values(schedule)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ScheduleDayList offline_status={offline_status} id={id} scheduleItem={item} setSettings={setSettings} color={color} setColor={setColor} />}
                decelerationRate={0.9}
                snapToInterval={Dimensions.get('window').width}
                disableIntervalMomentum={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[color.main, color.bg]}
                        progressBackgroundColor={color.bg}
                    />}
            />
        </View>
    )
}

const styles = StyleSheet.create({})