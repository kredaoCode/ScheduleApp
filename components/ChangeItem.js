import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import colors from './Colors'

export default function ChangeItem({ name, id, setId, type }) {
  return (
      <Pressable style={styles.button} onPress={() => setId({id: id, type: type})}>
      <Text style={{ color: colors.color.mainTransparent}}>{name}</Text>
      </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
    backgroundColor: colors.color.bgLight,
        borderRadius: 12,
        padding: 8,
        margin: 2,
    },
})