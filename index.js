let data;

function loadGroups(id) {
    if (id !== undefined) {
        fetch(`https://schedule-backend-production.koka.team/v1/schedule?group_id=${id}&is_new=true`)
            .then(response => response.json())
            .then(response => {
                data = JSON.parse(JSON.stringify(response.schedule));
                if (typeof data === 'object' && data !== null && Object.keys(data).length > 0) {
                    console.log('Данные успешно загружены');
                    console.log(data); // Вывод данных здесь, после загрузки
                } else {
                    console.log('Данные не загружены');
                }
            })
            .catch(error => {
                console.error('Произошла ошибка при загрузке данных:', error);
            });
    }
}

loadGroups(238);