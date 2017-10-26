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


class Message {

  constructor({
    currentTemp,
    maxtempC,
    mintempC,
    location,
    date,
    iconUrl,
    weatherDesc,
    feelsLike,
    windspeed,
    humidity,
    weatherHoulrly
  }) {
    this.currentTemp = currentTemp;
    this.maxtempC = maxtempC;
    this.mintempC = mintempC;
    this.location = location;
    this.date = date;
    this.icon = iconUrl;
    this.weatherDesc = weatherDesc;
    this.feelsLike = feelsLike;
    this.windspeed = windspeed;
    this.humidity = humidity;
    this.weatherHoulrly = weatherHoulrly;
  }


  getCurrentTemp() {
    let m = `Сейчас в ${this.location} температура воздуха ${this.currentTemp}°C, чувствуется как ${this.feelsLike}°C`;
    return m;
  }

  getWeatherToday() {
    let m = `Сегодня в ${this.location} температура воздуха от ${this.mintempC}°C до ${this.maxtempC}°C
${this.weatherDesc}
Влажность: ${this.humidity}%
Скорость ветра: ${this.windspeed} км/ч
Сейчас: ${this.currentTemp}°C, чувствуется как ${this.feelsLike}°C
`;
    return m;
  }

  getWeatherDate() {
    let m = `В ${this.location} температура воздуха от ${this.mintempC}°C до ${this.maxtempC}°C
${this.weatherDesc}
Влажность: ${this.humidity}%
Скорость ветра: ${this.windspeed} км/ч
${this.date}
`;
    return m;
  }

  getWeatherDetails(){
    let m = ``;
    this.weatherHoulrly.forEach((wh)=>{
      m += `${this.getTime(wh['time'])} | ${wh['tempC']}°C | ${wh['lang_ru'][0]['value']} | Вероятность дождя: ${wh['chanceofrain']}%`;
      m += `                                                                                                                       `;
    })
    return m;
  }

  getTime(timeStr){
    switch(timeStr){
      case '0': return '00:00';
      case '300': return '03:00';
      case '600': return '06:00';
      case '900': return '09:00';
      case '1200': return '12:00';
      case '1500': return '15:00';
      case '1800': return '18:00';
      case '2100': return '21:00';
    }
  }

  getWeatherIcons(){
    return weatherIcons[this.weatherDesc];
  }
}

module.exports = Message;
