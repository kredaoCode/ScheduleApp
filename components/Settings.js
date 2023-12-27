import { FlatList, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import ChangeItem from './ChangeItem';
import CircularHue from './CircularHue';

export default function Settings({ setId, setSettings, color, setColor }) {
    const [changeId, setChangeId] = useState();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [type, setType] = useState('');

    function loadGroup() {
        fetch(`https://schedule-backend-production.koka.team/v1/groups`)
            .then(response => response.json())
            .then(response => {
                setChangeId(response.groups);
                setType('group');
                setLoading(false);
            })
    }
    function loadTeachers() {
        fetch(`https://schedule-backend-production.koka.team/v1/teachers`)
            .then(response => response.json())
            .then(response => {
                setChangeId(response.teachers);
                setType('teacher');
                setLoading(false);
            })
    }

    return (
        <View style={styles.container}>
            <View style={[styles.item, {backgroundColor: color.bgNight}]}>
                <View style={styles.heading}>
                    <Text style={{ color: color.main, fontSize: 20, fontFamily: 'Raleway-Medium'}}>Настройки</Text>
                    <TouchableOpacity onPress={() => setSettings(false)}>
                        <AntDesign name="close" size={24} color={color.main} />
                    </TouchableOpacity>
                </View>
                <View style={styles.change}>
                    <TouchableOpacity style={[styles.changeButton, { backgroundColor: color.main }]} onPress={() => { 
                        loadTeachers(); 
                        setLoading(true); 
                    }}>
                        <Text style={{ fontFamily: 'Raleway-Medium', }}>Преподаватель</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.changeButton, { backgroundColor: color.main }]} onPress={() => {
                        loadGroup();
                        setLoading(true);
                    }}>
                        <Text style={{ fontFamily: 'Raleway-Medium', }}>Группа</Text>
                    </TouchableOpacity>
                </View>
                {(!loading) ?
                    (changeId !== undefined) ? <>
                        <TextInput
                            style={[styles.input, {borderColor: color.main, color: color.main, fontFamily: 'Raleway-Regular'}]}
                            placeholder={(type == 'group') ? 'Группа' : 'Преподаватель'}
                            placeholderTextColor={color.main + '85'}
                            value={input}
                            onChangeText={setInput}
                        />
                        <FlatList
                            style={styles.list}
                            data={changeId.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))}
                            renderItem={({ item }) => <ChangeItem name={item.name} id={item.id} setId={setId} type={type} color={color} />}
                        />
                    </> : <></>
                     : <><ActivityIndicator style={{marginTop: 10}} size={'large'} color={color.main}/></>}
                <CircularHue setSettings={setSettings} color={color} setColor={setColor}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    item: {
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
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 15,
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 10,
        borderWidth: 1,
        borderRadius: 13,
    },
    list: {
        height: 150,
        margin: 10,
    },
})