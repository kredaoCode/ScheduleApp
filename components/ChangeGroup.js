import { FlatList, Modal, Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import color from './Colors'
import ChangeItem from './ChangeItem';

export default function ChangeGroup({ renderingModal, setRenderingModal, setId }) {
    const [changeId, setChangeId] = useState();
    const [input, setInput] = useState('');
    const [type, setType] = useState('')

    function loadGroup() {
        fetch(`https://schedule-backend-production.koka.team/v1/groups`)
            .then(response => response.json())
            .then(response => {
                setChangeId(response.groups);
                setType('group')
            })
    }
    function loadTeachers() {
        fetch(`https://schedule-backend-production.koka.team/v1/teachers`)
            .then(response => response.json())
            .then(response => {
                setChangeId(response.teachers);
                setType('teacher');
            })
    }

    return (
        <Modal
            transparent={true}
            visible={(renderingModal == 1) ? true : false}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text style={styles.heading}>Настройки и кастомизация</Text>
                    <View style={styles.change}>
                        <Pressable style={styles.changeButton} onPress={() => loadTeachers()}>
                            <Text>Преподаватель</Text>
                        </Pressable>
                        <Pressable style={styles.changeButton} onPress={() => loadGroup()}>
                            <Text>Группа</Text>
                        </Pressable>
                    </View>
                    {(changeId !== undefined) ?
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder='Введите группу или преподователя'
                                placeholderTextColor={color.mainTransparent}
                                value={input}
                                onChangeText={setInput}
                            />
                            <FlatList
                                style={styles.list}
                                data={changeId.filter(item => item.name.includes(input))}
                                renderItem={({ item }) => <ChangeItem name={item.name} id={item.id} setId={setId} type={type} />}
                            />
                        </> : <></>}
                    <Pressable style={styles.button} onPress={() => setRenderingModal(0)}>
                        <Text style={{ padding: 6 }}>Назад</Text>
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
    change: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    changeButton: {
        backgroundColor: color.mainTransparent,
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 15,
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: color.mainTransparent,
        borderRadius: 13,
        margin: 10,
    },
    modal: {
        backgroundColor: color.bg,
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
        margin: 10,
        borderWidth: 1,
        borderRadius: 13,
        borderColor: color.main,
        color: color.main,
    },
    list: {
        height: 150,
        margin: 10,
    },
})