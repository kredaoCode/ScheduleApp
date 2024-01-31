import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function OfflineStatus({color}) {
  return (
    <View style={[styles.container, {backgroundColor: color.main}]}>
      <Text style={{ color: color.bg, fontFamily: 'Raleway-Medium', fontSize: 18}}>#Не актуальное расписание#</Text>
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