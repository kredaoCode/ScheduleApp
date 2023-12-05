function loadGroups(id) {
    let date = id.split('.');
    date = `${date[2]}.${date[1]}.${date[0]}`
    date = new Date(Date.parse(date)).getDay()


    const list = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    return list[date]
}

console.log(loadGroups('05.12.2023'))