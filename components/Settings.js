import {
        StyleSheet, 
        Modal, 
        Dimensions, 
        Switch,
        View,
    } from 'react-native';
import React, { useState } from 'react'
import CircularHue from './CircularHue';
import ChangeFilter from './ChangeFilter';
import ChangeThemes from './ChangeThemes';

export default function Settings({ 
    setId,
    setSettings,
    settings,
    color,
    setColor,
    isEnabledTheme,
    setIsEnabledTheme,
}) {
    

    return (
        <Modal 
            style={styles.container}
            animationType="fade"
            visible={settings}
            >
            <View style={[styles.item, {backgroundColor: color.bg}]}>
                <ChangeFilter setId={setId} setSettings={setSettings} color={color}/>
                <CircularHue setSettings={setSettings} color={color} setColor={setColor}/>
                <ChangeThemes color={color} isEnabledTheme={isEnabledTheme} setIsEnabledTheme={setIsEnabledTheme}/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    item: {
        padding: 15,
        height: '100%',
    },
})