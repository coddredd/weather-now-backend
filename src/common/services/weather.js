const http = require('http');

const { config } = require('../config/constants');

class Weather {

  constructor(city) {
    this.currentCity = city;
  }

  get(date) {
    const { weatherUrl, wwoApiKey } = config;
    const path = `${weatherUrl}&q=${encodeURIComponent(this.currentCity)}&key=${wwoApiKey}&date=${date}&lang=ru`;
    return this._executeWeatherRequest(path);
  }

  _executeWeatherRequest(path) {
    return new Promise((resolve, reject) => {
      http.get({ host: config.host, path }, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', () => {
          try {
            let response = JSON.parse(body);
            if (response) {
              const current_condition = response.data.current_condition[0];
              const weather = response.data.weather[0];
              resolve({
                currentTemp: current_condition.temp_C,
                maxtempC: weather.maxtempC,
                mintempC: weather.mintempC,
                location: this.currentCity,
                date: weather.date,
                iconUrl: current_condition.weatherIconUrl[0].value,
                weatherDesc: current_condition.lang_ru[0].value,
                feelsLike: current_condition.FeelsLikeC,
                windspeed: current_condition.windspeedKmph,
                humidity: current_condition.humidity,
                weatherHoulrly: weather.hourly
              });
            } else {
              let error = new Error('There is no response');
              reject(error);
            }
          } catch (err) {
            reject(err);
          }
        });
        res.on('error', (error) => reject(error))
      })
    })
  }
}

module.exports = { Weather };
