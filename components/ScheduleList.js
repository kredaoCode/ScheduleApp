import { FlatList, StyleSheet, View, VirtualizedList, Dimensions } from 'react-native'
import ScheduleDayList from './ScheduleDayList';
import React, { useState } from 'react'

export default function ScheduleList({ schedule, setSettings, color, id }) {
    const [list, setList] = useState(false);

    return (
        <View>
            {(list) ?
                <FlatList
                    horizontal
                    pagingEnabled
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    data={Object.values(schedule)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ScheduleDayList id={id} scheduleItem={item} setSettings={setSettings} color={color} />}
                /> :
                <VirtualizedList
                    horizontal
                    data={Object.values(schedule)}
                    renderItem={({ item }) => (
                        <View style={{ width: Dimensions.get('window').width }}>
                            <ScheduleDayList id={id} scheduleItem={item} setSettings={setSettings} color={color} />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    getItem={(data, index) => data[index]}
                    getItemCount={data => data.length}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                    getItemLayout={(data, index) => ({
                        length: Dimensions.get('window').width,
                        offset: Dimensions.get('window').width * index,
                        index,
                    })}
                    snapToInterval={Dimensions.get('window').width}
                    snapToAlignment={'start'}
                    pagingEnabled={false}
                />

            }

        </View>
    )
}

const styles = StyleSheet.create({})