import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Linking from 'expo-linking';
import { Context } from '../../context';
import React, { useContext } from 'react'

export default function GoToCertificates() {
    const { user } = useContext(Context)

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: user.bgNight, borderColor: user.main + 'A4'}]} onPress={() => {Linking.openURL('https://certificates.omsktec.ru/')}}>
            <Text style={{ color: user.main, fontFamily: 'Raleway-Regular', textAlign: 'center' }}>Заказать справку об обучении</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
    }
})