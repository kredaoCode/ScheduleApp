import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import React from 'react'

export default function ChangeItem({ name, id, setId, type, color}) {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: color.bgLight}]} onPress={() => {
        setId({id: id, type: type, name: name})
      }}>
          <Text style={{ color: color.main + 'A4', fontFamily: 'Raleway-Medium' }}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        padding: 8,
        margin: 2,
    },
})