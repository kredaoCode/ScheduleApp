import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../../context'

export default function OfflineStatus() {
    const { colorTheme } = useContext(Context);

    return (
        <View style={[styles.container, { backgroundColor: colorTheme.main }]}>
            <Text style={{ color: colorTheme.bg, fontFamily: 'Raleway-Medium' || 'Arial', fontSize: 18 }}>#Не актуальное расписание#</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})