import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

import ColorPicker, {
    Panel1,
    Swatches,
    colorKit,
    PreviewText,
    HueCircular,
} from 'reanimated-color-picker';
import colors from './Colors';

export default function Example({ setSettings }) {
    const [showModal, setShowModal] = useState(false);

    const customSwatches = new Array(6)
        .fill('#fff')
        .map(() => colorKit.randomRgbColor().hex());

    const selectedColor = useSharedValue(customSwatches[0]);

    const onColorSelect = (color) => {
        selectedColor.value = color.hex;
    };
    const backgroundColorStyle = useAnimatedStyle(() => ({
        backgroundColor: selectedColor.value,
    }));

    return (
        <View>
            <Pressable style={styles.openButton} onPress={() => setShowModal(true)}>
                <Text
                    style={{ color: '#000', textAlign: 'center' }}>
                    Выбрать цвет
                </Text>
            </Pressable>

            <Modal
                onRequestClose={() => setShowModal(false)}
                visible={showModal}
                animationType="slide">
                <Animated.View style={[styles.container, backgroundColorStyle]}>
                    <View style={styles.pickerContainer}>
                        <ColorPicker
                            value={selectedColor.value}
                            sliderThickness={20}
                            thumbSize={24}
                            onChange={onColorSelect}
                            boundedThumb>
                            <HueCircular
                                containerStyle={styles.hueContainer}
                                thumbShape="pill">
                                <Panel1 style={styles.panelStyle} />
                            </HueCircular>
                            <Swatches
                                style={styles.swatchesContainer}
                                swatchStyle={styles.swatchStyle}
                                colors={customSwatches}
                            />
                            <View style={styles.previewTxtContainer}>
                                <PreviewText style={{ color: colors.color.main }} colorFormat="hex" />
                            </View>
                        </ColorPicker>
                    </View>

                    <Pressable
                        style={styles.closeButton}
                        onPress={() => {
                            colors.color = {...colors.color, main: selectedColor.value};
                            setShowModal(false);
                            setSettings(false);
                        }}>
                        <Text style={{ color: colors.color.main, fontWeight: 'bold' }}>Установить</Text>
                    </Pressable>
                </Animated.View>
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
        backgroundColor: colors.color.bgNight,
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    hueContainer: {
        justifyContent: 'center',
        backgroundColor: colors.color.bgNight,
    },
    panelStyle: {
        width: '70%',
        height: '70%',
        alignSelf: 'center',
        borderRadius: 16,
    },
    previewTxtContainer: {
        paddingTop: 20,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: colors.color.bgLight,
    },
    swatchesContainer: {
        paddingTop: 20,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: colors.color.bgLight,
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: 10,
    },
    swatchStyle: {
        borderRadius: 20,
        height: 30,
        width: 30,
        margin: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
    },
    openButton: {
        borderRadius: 20,
        padding: 15,
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: colors.color.mainTransparent,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        bottom: 20,
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        alignSelf: 'center',
        backgroundColor: colors.color.bgNight,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
