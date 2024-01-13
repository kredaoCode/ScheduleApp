import React, { useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useSharedValue,
} from 'react-native-reanimated';

import ColorPicker, {
    Panel1,
    HueCircular,
} from 'reanimated-color-picker';

export default function Example({ setSettings, color, setColor}) {
    const [showModal, setShowModal] = useState(false);

    const selectedColor = useSharedValue(color.main);

    const onColorSelect = (color) => {
        selectedColor.value = color.hex;
    };

    return (
        <View>
            <TouchableOpacity style={styles.openButton} onPress={() => setShowModal(true)}>
                <Text
                    style={{ color: color.main, textAlign: 'center', fontFamily: 'Raleway-Medium'}}>
                    Выбрать цвет
                </Text>
                <View style={{backgroundColor: color.main, width: '20%', height: '100%'}}></View>
            </TouchableOpacity>

            <Modal
                transparent={true}
                onRequestClose={() => setShowModal(false)}
                visible={showModal}
                animationType="slide">
                <View style={[styles.container, {backgroundColor: '#000000D0'}]}>
                    <View style={[styles.pickerContainer, {backgroundColor: color.bg}]}>
                        <ColorPicker
                            value={selectedColor.value}
                            sliderThickness={20}
                            thumbSize={24}
                            onChange={onColorSelect}
                            boundedThumb>
                            <HueCircular
                                containerStyle={[styles.hueContainer, { backgroundColor: color.bg }]}
                                thumbShape="pill">
                                <Panel1 style={styles.panelStyle} />
                            </HueCircular>
                        </ColorPicker>
                        <TouchableOpacity
                            style={[styles.closeButton, { backgroundColor: color.bgLight, borderColor: color.main}]}
                            onPress={async () => {
                                setColor(prev => {
                                    return {...prev, main: selectedColor.value}
                                })
                                setShowModal(false);
                                setSettings(false);
                            }}>
                            <Text style={{ color: color.main }}>Установить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    pickerContainer: {
        alignSelf: 'center',
        width: 300,
        padding: 20,
        borderRadius: 20,
    },
    hueContainer: {
        justifyContent: 'center',
    },
    panelStyle: {
        width: '70%',
        height: '70%',
        alignSelf: 'center',
        borderRadius: 16,
    },
    openButton: {
        padding: 15,
        marginHorizontal: 5,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        padding: 15,
        marginTop: 15,
        borderRadius: 15,
        alignItems: 'center',
        fontFamily: 'Raleway-Regular',
        borderWidth: 1,
    },
});
