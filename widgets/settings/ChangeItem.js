import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../../context'

export default function ChangeItem({ name, id, type}) {
	const {setId, color, setSettings} = useContext(Context);
	return (
		<TouchableOpacity style={[styles.button, { backgroundColor: color.bgLight }]} onPress={() => {
			setId({ id: id, type: type, name: name })
			setSettings(prev => !prev);
		}}>
			<Text style={{ color: color.main + 'A4', fontFamily: 'Raleway-Medium' }}>{name}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 12,
		padding: 8,
		paddingVertical: 12,
		marginTop: 5,
	},
})