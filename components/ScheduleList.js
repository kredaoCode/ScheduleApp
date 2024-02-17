import { FlatList, StyleSheet, View, Dimensions, RefreshControl } from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React, { useContext } from 'react'
import { Context } from '../context';


export default function ScheduleList({refreshing, onRefresh}) {
    const {color, schedule} = useContext(Context);

    return (
        <View>
            <FlatList
                horizontal
                overScrollMode='never'
                showsHorizontalScrollIndicator={false}
                data={Object.values(schedule)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ScheduleDayList scheduleItem={item} />}
                decelerationRate={0.9}
                snapToInterval={Dimensions.get('window').width}
                disableIntervalMomentum={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[color.main, color.bg]}
                        progressBackgroundColor={color.bg}
                        enabled={true}
                    />}
            />
        </View>
    )
}

const styles = StyleSheet.create({})