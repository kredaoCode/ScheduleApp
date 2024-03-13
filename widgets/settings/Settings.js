import { StyleSheet, Modal, Dimensions, View} from 'react-native';
import React, { useContext} from 'react'
import ChangeFilter from './ChangeFilter';
import { Context } from '../../context';
import { CheckBox } from 'react-native-web';
import GoToCertificates from './GoToCertificates';

// Модальное окно настроек

export default function Settings() {
    const {user, showSettings, setShowSettings} = useContext(Context)
    return (
        <Modal
            style={styles.container}
            animationType="fade"
            visible={showSettings}
            // приказывает закрыть модальное окно при активации события назад на интерфейсе устройства
            onRequestClose={() => {
                setShowSettings(prev => !prev)
            }}
            >
            <View style={[styles.item, {backgroundColor: user.bg}]}>

                {/* Отвечает за выбор группы | преподавателя */}
                <ChangeFilter />
                {/* Кнопочка с ссылкой на заказ справки об обучении а колледже */}
                <GoToCertificates />
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