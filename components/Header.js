import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

import HeaderItem from './HeaderItem'
import color from './Colors';

export default function Header({ dates, activeDay, setActiveDay }) {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                horizontal
                data={dates}
                renderItem={({ item }) => 
                    <HeaderItem 
                        item={item} 
                        activeDay={activeDay} 
                        setActiveDay={setActiveDay}
                        />}
            />
            <Pressable style={styles.button}>
                <Ionicons name="settings-outline" size={32} color={color.main} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginLeft: 4,
        padding: 5,
    },
    list: {
        paddingHorizontal: 10,
    },
})