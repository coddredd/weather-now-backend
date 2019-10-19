const { Message } = require('./message');
const { weatherIcons } = require('../config/constants');

class ChatMessage extends Message {

  constructor({currentTemp, maxtempC, mintempC, location, date, weatherDesc, feelsLike, windspeed, humidity, weatherHoulrly}) {
    super();
    this.currentTemp = currentTemp;
    this.maxtempC = maxtempC;
    this.mintempC = mintempC;
    this.location = location;
    this.date = date;
    this.weatherDesc = weatherDesc;
    this.feelsLike = feelsLike;
    this.windspeed = windspeed;
    this.humidity = humidity;
    this.weatherHoulrly = weatherHoulrly;
  }

  get weatherIcon() {
    return weatherIcons[this.weatherDesc] || weatherIcons['Солнечно'];
  }

  get currentTemperature() {
    return `Сейчас в ${this.location} температура воздуха ${this.currentTemp}°C, чувствуется как ${this.feelsLike}°C`;
  }

  get weatherDate() {
    return {
      text: `В ${this.location} температура воздуха от ${this.mintempC}°C до ${this.maxtempC}°C ` +
          `\n${this.weatherDesc}. Влажность: ${this.humidity}%. Скорость ветра: ${this.windspeed} км/ч \n${this.date}`,
      icon: this.weatherIcon
    };
  }

  get weatherDetails() {
    let m = ``;
    if (this.weatherHoulrly) {
      this.weatherHoulrly.forEach(wh => {
        m += `${this.getTime(wh.time)}| ${wh.tempC}°C. ${wh.lang_ru[0].value}. Вероятность дождя: ${wh.chanceofrain}%\n`;
      });
    }
    return m;
  }

}

module.exports = { ChatMessage };
