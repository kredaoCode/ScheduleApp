import { StyleSheet, Modal, Dimensions, View} from 'react-native';
import React, { useContext} from 'react'
import ChangeFilter from './ChangeFilter';
import { Context } from '../../context';

export default function Settings() {
    const {colorTheme, showSettings, setShowSettings} = useContext(Context)
    return (
        <Modal 
            style={styles.container}
            animationType="fade"
            visible={showSettings}
            onRequestClose={() => {
                setShowSettings(prev => !prev)
            }}
            >
            <View style={[styles.item, {backgroundColor: colorTheme.bg}]}>
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