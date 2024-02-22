import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import ChangeItem from './ChangeItem';
import { Context } from '../context';
import SegmentedControl from '@react-native-segmented-control/segmented-control'

export default function ChangeFilter() {
    const [selectedIndex, setSelectedIndex] = useState(1)
    const { setId, setSettings, color } = useContext(Context)
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

    useEffect(() => {
        loadGroup();
    }, [])


    return (
        <View>
            <View style={styles.heading}>
                <Text style={{ color: color.main, fontSize: 20, fontFamily: 'Raleway-Medium' }}>Настройки</Text>
                <TouchableOpacity onPress={() => setSettings(false)}>
                    <AntDesign name="close" size={24} color={color.main} />
                </TouchableOpacity>
            </View>
            <View>
                <SegmentedControl
                    style={styles.segmented}
                    values={["Преподаватель", "Группа"]}
                    selectedIndex={selectedIndex}
                    onChange={(event) => {
                        if (event.nativeEvent.selectedSegmentIndex == 0) {
                            loadTeachers()
                        } else if (event.nativeEvent.selectedSegmentIndex == 1) {
                            loadGroup()
                        }
                        setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
                        setLoading(true);
                    }}
                    tintColor={color.main}
                    backgroundColor={color.bgLight}
                    fontStyle={{
                        color: color.main,
                        fontFamily: 'Raleway-Medium'
                    }}
                    activeFontStyle={{
                        color: color.bg,
                        fontFamily: 'Raleway-Regular'
                    }}
                />
            </View>
            {(!loading) ?
                <>
                    <TextInput
                        style={[styles.input, { borderColor: color.main, color: color.main, fontFamily: 'Raleway-Regular' }]}
                        placeholder={'Группа or Преподаватель'}
                        placeholderTextColor={color.main + '85'}
                        value={input}
                        onChangeText={setInput}
                    />
                    {(changeId !== undefined) ?
                        <FlatList
                            style={styles.list}
                            data={changeId.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))}
                            renderItem={({ item }) => <ChangeItem
                                name={item.name}
                                id={item.id}
                                type={type}
                            />}
                        />
                        : <></>}
                </>
                : <><ActivityIndicator style={{ marginTop: 10 }} size={'large'} color={color.main} /></>}
        </View>
    )
}

const styles = StyleSheet.create({
    change: {
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
        elevation: 5,
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
        paddingVertical: 10,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
    list: {
        height: 300,
        marginTop: 10,
    },
    segmented: {
        height: 55,
        marginTop: 10,
        marginBottom: 10,
    }
})