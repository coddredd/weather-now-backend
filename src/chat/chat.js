const { WeatherBot } = require('./chat/bot/weather-bot');
const { config } = require('./common/config/constants');

function runBot() {

  const weatherBot = new WeatherBot(config.token, { polling: true });

  weatherBot.onText(/\/start/, msg => weatherBot.start(msg.from.id));

  weatherBot.onText(/\/help/, (msg) => weatherBot.sendHelp(msg.from.id));

  weatherBot.onText(/\/city (.+)/, (msg, match) => weatherBot.setCity(msg.from.id, match[1]));

  weatherBot.onText(/\/now/, msg => weatherBot.sendNowData(msg.from.id));

  weatherBot.onText(/\/today/, msg => weatherBot.sendTodayData(msg.from.id));

  weatherBot.onText(/\/tomorrow/, msg => weatherBot.sendTomorrowData(msg.from.id));

  weatherBot.onText(/\/weather in ([a-zA-Z]+), ([0-9]{4}-[0-9]{2}-[0-9]{2})/, (msg, match) => {
    const location = match[1], date = match[2];
    return weatherBot.sendDataByDate(msg.from.id, location, date)
  });

  weatherBot.on('callback_query', (msg) => {
    const id = msg.from.id;
    switch(msg.data) {
      case 'weatherToday': return weatherBot.sendTodayData(id);
      case 'weatherTomorrow': return weatherBot.sendTomorrowData(id);
      case 'weatherDetails1': return weatherBot.sendTodayDetails(id);
      default: return weatherBot.sendTomorrowDetails(id);
    }
  });

  setInterval(() => new Date().getHours() === 6 && weatherBot.sendDailyWeather(), 3600);
}

module.exports = { runBot };