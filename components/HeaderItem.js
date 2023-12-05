import { Pressable, StyleSheet, Text } from 'react-native'
import color from './Colors'
import React from 'react'


export default function HeaderItem({ item, activeDay, setActiveDay }) {

    function convertDay(day) {
        const dateParts = day.split('.');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    
        const newDate = new Date(formattedDate);
        if (isNaN(newDate)) {
            return `Некорректная дата`; // Обработка ошибки парсинга даты
        }
    
        const list = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = newDate.getDay(); // Получение номера дня недели
    
        return list[dayIndex];
    }

    return (
        <Pressable style={() => [{
                    borderColor: (activeDay === item.name) ? color.main : color.mainTransparent,
                }, styles.container]} onPress={() => setActiveDay(item.name)}>
            <Text style={{
                color: (activeDay == item.name) ? color.main : color.mainTransparent,
            }}>{`${convertDay(item.name)}, ${item.name}`}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 9,
        padding: 5,
        marginHorizontal: 2,
        height: 32,
    },
})