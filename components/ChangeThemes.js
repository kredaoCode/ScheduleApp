import { StyleSheet, Text, View, Switch } from 'react-native'
import React from 'react';

export default function ChangeThemes({ isEnabledTheme, setIsEnabledTheme, color }) {

    return (
        <View style={styles.container}>
            <Text style={{color: color.main, fontFamily: 'Raleway-Regular'}}>Тема</Text>
            <Switch
                trackColor={{ false: '#000000', true: '#FFFFFF' }}
                thumbColor={isEnabledTheme ? '#FFFFFF' : '#000000'}
                value={isEnabledTheme}
                onValueChange={() => setIsEnabledTheme(prev => !prev)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})