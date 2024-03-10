import { FlatList, Dimensions } from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React, { useContext } from 'react'
import { Context } from '../../context';

export default function ScheduleList() {
    const {fetchedSchedule} = useContext(Context);
    
    return (
            // горизонтальный список по дням 
            <FlatList
                horizontal
                overScrollMode='never'
                showsHorizontalScrollIndicator={false}
                data={Object.values(fetchedSchedule)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ScheduleDayList scheduleItem={item} />}
                decelerationRate={0.9}
                snapToInterval={Dimensions.get('window').width}
                disableIntervalMomentum={true}
            />
    )
}