import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from './Colors'

export default function NoSchedule() {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', color: color.bg, fontSize: 16 }}>Расписание отсутствует :(</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: 'flex',
    borderRadius: 12,
    marginHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: color.main,
  }
})