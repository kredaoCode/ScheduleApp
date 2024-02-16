const str1 = "1 пара, 08:45-10:15";
const str2 = "2 пара, 10:25-11:10 - 11:40-12:25";

// Регулярное выражение для поиска времени
const timeRegex = /\b\d{1,2}:\d{2}\b/g;

// Извлекаем время из строки 1
const times1 = str1.match(timeRegex);
console.log("Время из первой строки:", times1);

// Извлекаем время из строки 2
const times2 = str2.match(timeRegex);
console.log("Время из второй строки:", times2);
