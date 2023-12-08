import { FlatList, Pressable, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import React, { useState } from 'react'
import color from './Colors'
import ChangeItem from './ChangeItem';

export default function Settings({ setId }) {
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
        <View style={styles.container}>
            <View style={styles.item}>
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    item: {
        backgroundColor: color.bgNight,
        borderRadius: 14,
        marginHorizontal: 15,
        padding: 15,
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