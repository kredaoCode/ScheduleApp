import {
        StyleSheet, 
        Modal, 
        Dimensions, 
        Switch,
        View,
    } from 'react-native';
import React, { useState } from 'react'
import ChangeFilter from './ChangeFilter';

export default function Settings({ 
    setId,
    setSettings,
    settings,
    color,
    setColor,
}) {
    

    return (
        <Modal 
            style={styles.container}
            animationType="fade"
            visible={settings}
            onRequestClose={() => {
                setSettings(prev => !prev)
            }}
            >
            <View style={[styles.item, {backgroundColor: color.bg}]}>
                <ChangeFilter setId={setId} setSettings={setSettings} color={color}/>
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