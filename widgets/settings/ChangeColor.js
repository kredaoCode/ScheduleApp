import React, { useContext, useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

import ColorPicker, {
    HueSlider,
    SaturationSlider,
    BrightnessSlider,
} from 'reanimated-color-picker';
import { Context } from '../../context';

export default function ChangeColor() {
    const {color, setColor, colorTheme} = useContext(Context)
    const [showModal, setShowModal] = useState(false);

    const selectedColor = useSharedValue(color.main);

    const onColorSelect = (color) => {
        setColor(prev => {
            return { ...prev, main: color.hex }
        })
    };

    return (
        <View>
            <TouchableOpacity style={styles.openButton} onPress={() => setShowModal(true)}>
                <MaterialIcons name="color-lens" size={24} color={color.main} />
            </TouchableOpacity>

            <Modal
                transparent={true}
                onRequestClose={() => setShowModal(false)}
                visible={showModal}
                animationType="slide"
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={() => setShowModal(false)}
                    />
                    <View style={[styles.pickerContainer, { backgroundColor: color.bgLight }]}>
                        <ColorPicker
                            value={selectedColor.value}
                            sliderThickness={25}
                            thumbSize={24}
                            thumbShape='circle'
                            onComplete={onColorSelect}
                            boundedThumb
                        >
                            <HueSlider style={styles.sliderStyle} />

                            {(colorTheme == 'light') ? <BrightnessSlider style={styles.sliderStyle} /> :
                                <SaturationSlider style={styles.sliderStyle} />
                            }
                        </ColorPicker>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    pickerContainer: {
        padding: 20,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
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
        borderRadius: 50,
        marginRight: 8,
        padding: 5,
        borderRadius: 8
    },
    closeButton: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        fontFamily: 'Raleway-Regular',
    },
    sliderStyle: {
        marginVertical: 10,
        borderRadius: 15,
        elevation: 5,
    }
});
