import { FlatList, StyleSheet, View, Dimensions, RefreshControl  } from 'react-native'
import React, { useContext } from 'react'
import ScheduleItem from './ScheduleItem';
import Header from './Header';
import OfflineStatus from './OfflineStatus';
import { Context } from '../../context';

export default function SchuduleList({ scheduleItem }) {
    const {isConnected, color, onRefresh, refreshing} = useContext(Context);

    return (
        <View style={styles.container}>
            {(scheduleItem) ?
                <>
                    <Header date={scheduleItem.date} />
                    {(!isConnected) ? <OfflineStatus/>: null}
                    <FlatList
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        data={scheduleItem.schedule.filter(item => item !== null)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <ScheduleItem index={index} info={item} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[color.main, color.bg]}
                                progressBackgroundColor={color.bg}
                            />}
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