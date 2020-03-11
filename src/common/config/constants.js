module.exports = {

    time: '6:00',


};

const defaultMessages = {
    startMessage: `Добрый день, я могу предсказывать погоду.
  Просто напиши:
  1. /city Kiev что бы установить название твоего города;
  2. /now что бы получить текущую температуру;
  3. /weather in Kiev, 2017-09-06 что бы получить прогноз погоды в любом  городе в любое время.
  4. /today что бы посмотреть погоду на сегодня.
  5. /tomorrow что бы посмотреть погоду на завтра.
  6. /help если нужна помощь.`,
    helpMessage: `Доступные команды.
  1. /city Kiev что бы установить название твоего города;
  2. /now что бы получить текущую температуру;
  3. /weather in Kiev, 2017-09-06 что бы получить прогноз погоды в любом  городе в любое время.
  4. /today что бы посмотреть погоду на сегодня.
  5. /tomorrow что бы посмотреть погоду на завтра.
  6. /help если нужна помощь.`,
    errorMessage: `Что-то пошло не так. Попробуйте заново!`,
    errorMessageCity: `Не могу найти ваш город`,
};

const helpButtons = {
    dateButtons : [
        {
            text: 'Погода на сегодня',
            callback_data: 'weatherToday'
        },
        {
            text: 'Погода на завтра',
            callback_data: 'weatherTomorrow'
        }
    ],
    firstDetailedButton : [{
        text: 'Подробнее',
        callback_data: 'weatherDetails1'
    }],
    secondDetailedButton : [{
        text: 'Подробнее',
        callback_data: 'weatherDetails2'
    }]
};

const config = {
    host : 'api.worldweatheronline.com',
    wwoApiKey : '99db9b2242564de8a2c194026170409',
    city: 'Kiev',
    token: '391439800:AAF9kkaacnl0uq5cZ-Vk3aq6-A0zUMLyEOc',
    uri: 'mongodb://localhost:27017/users',
    isMockedServer: true
};

const weatherIcons = {
    'Солнечно' : 'icons/sun.png',
    'Ясно' : 'icons/sun.png',
    'Пасмурно': 'icons/cloud.png',
    'Дождь': 'icons/rain.png',
    storm: 'icons/storm.png',
    'Переменная облачность': 'icons/suncloud.png',
    rainsun: 'icons/rainsun.png',
    night: 'icons/night.png',
    rainstorm: 'icons/rainstorm.png',
    snow: 'icons/snow.png'
};

module.exports = { config, helpButtons, defaultMessages, weatherIcons };
