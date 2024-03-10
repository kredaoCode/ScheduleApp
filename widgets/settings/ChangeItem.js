import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../../context'

export default function ChangeItem({ name, id, type}) {
	const {setUser, user, setShowSettings, setIsLoadShedule} = useContext(Context);
	return (
		<TouchableOpacity style={[styles.button, { backgroundColor: user.bgLight }]} onPress={() => {
			setUser(prev => {
				return { ...prev, id: id, type: type, name: name }
			})
			setIsLoadShedule(true)
			setShowSettings(prev => !prev);
		}}>
			<Text style={{ color: user.main + 'A4', fontFamily: 'Raleway-Medium' }}>{name}</Text>
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