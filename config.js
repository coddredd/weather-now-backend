module.exports = {
  uri: "mongodb://localhost:27017/users",
  startMessage: `Добрый день, я могу предсказывать погоду.
  Просто напиши:
  1. /city Kiev что бы установить название твоего города;
  2. /now что бы получить текущую температуру;
  3. /weather in Kiev, 2017-09-06 что бы получить прогноз погоды в любом  городе в любое время.
  4. /today что бы посмотреть погоду на сегодня.
  5. /tomorrow что бы посмотреть погоду на завтра.
  6. /help если нужна помощь.`,
  startMessageError: "Ты уже нажимал это!",
  errorMessage: `Что-то пошло не так. Попробуй заново!`,
  errorMessageCity: `Не могу найти твой город`,
  time: '6:00',
  token: '391439800:AAF9kkaacnl0uq5cZ-Vk3aq6-A0zUMLyEOc',
  buttons1 : [{
      text: 'Погода на сегодня',
      callback_data: 'weatherToday'
    },
    {
      text: 'Погода на завтра',
      callback_data: 'weatherTomorrow'
    }
  ],
  buttons2 : [{
    text: 'Подробнее',
    callback_data: 'weatherDetails1'
  }],
  buttons3 : [{
    text: 'Подробнее',
    callback_data: 'weatherDetails2'
  }],
  host : 'api.worldweatheronline.com',
  wwoApiKey : '99db9b2242564de8a2c194026170409',
  city: 'Kiev'
}
