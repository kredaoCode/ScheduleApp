import { FlatList, StyleSheet, View, Dimensions } from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React, { useContext } from 'react'
import { Context } from '../context';


export default function ScheduleList() {
    const {schedule} = useContext(Context);

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
            />
        </View>
    )
}

const styles = StyleSheet.create({})