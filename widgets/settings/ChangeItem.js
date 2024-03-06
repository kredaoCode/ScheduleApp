import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../../context'

export default function ChangeItem({ name, id, type}) {
	const {setDeviceId, colorTheme, setSettings} = useContext(Context);
	return (
		<TouchableOpacity style={[styles.button, { backgroundColor: colorTheme.bgLight }]} onPress={() => {
			setDeviceId({ id: id, type: type, name: name })
			setShowSettings(prev => !prev);
		}}>
			<Text style={{ color: colorTheme.main + 'A4', fontFamily: 'Raleway-Medium' }}>{name}</Text>
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