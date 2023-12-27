import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function NoSchedule({ color, setSettings }) {
  return (
    <>
      <View style={[styles.container]}>
        <Text style={{ textAlign: 'center', color: color.main, fontSize: 16, fontFamily: 'Raleway-Medium' }}>Расписание отсутствует :(</Text>
      </View>
      <Pressable style={[styles.container, { backgroundColor: color.bgLight }]} onPress={() => setSettings(true)}>
        <Text style={{color: color.main, fontFamily: 'Raleway-Regular', textAlign: 'center'}}>Открыть настройки</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: 'flex',
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 10,
    justifyContent: 'center',
  },
})