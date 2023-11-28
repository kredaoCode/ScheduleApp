import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import color from './Colors'

export default function ChangeGroup({ renderingModal, setRenderingModal, loadGroups }) {
    const [change, setChange] = useState()

    async function loadData() {
        const groupsResponse = await fetch("https://schedule-backend-production.koka.team/v1/groups");
        const groupsData = await groupsResponse.json();
    
        const combinedData = [
            ...groupsData.groups,
        ];
    
        setChange(combinedData);
    }

    useMemo(() => {
        loadData();
      }, []);
    
    return (
        <Modal
            transparent={true}
            visible={(renderingModal == 1) ? true : false}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text style={styles.heading}>Настройки и кастомизация</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Введите группу или преподователя'
                        placeholderTextColor={color.mainTransparent}
                    />
                    <FlatList 
                        style={styles.list}
                        data={change}
                        renderItem={({ item }) => <Pressable style={styles.buttonList} key={item.id} onPress={() => {
                            loadGroups(item.id)
                            setRenderingModal(0)
                        }}>
                            <Text style={{color: color.main}}>{item.name}</Text>
                        </Pressable>}
                    />
                    <Pressable style={styles.button} onPress={() => setRenderingModal(0)}>
                        <Text style={{padding: 6}}>Назад</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0000009C',
        height: '100%',
    },
    button: {
        backgroundColor: color.mainTransparent,
        borderRadius: 13,
        margin: 10,
    },
    buttonList: {
        margin: 5,
        padding: 10,
        backgroundColor: '#2B2A2A',
        borderRadius: 10,
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#272727',
        padding: 10,
        margin: 10,
        borderRadius: 15,
    },
    heading: {
        padding: 20,
        fontSize: 20,
        color: color.main,
    },
    input: {
        padding: 6,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 13,
        borderColor: color.main,
        color: color.main,
    },
    list: {
        height: 150,
    },
})