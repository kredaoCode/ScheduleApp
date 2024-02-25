import {
        StyleSheet, 
        Modal, 
        Dimensions, 
        Switch,
        View,
    } from 'react-native';
import React, { useContext, useState } from 'react'
import ChangeFilter from './ChangeFilter';
import { Context } from '../../context';

export default function Settings() {
    const {color, settings, setSettings} = useContext(Context)

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
                <ChangeFilter />
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