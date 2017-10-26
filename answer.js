const http = require('http');
const Message = require('./message');
let config = require('./config');

class Answer{
  constructor(userId, currentCity, bot){
    this.userId = userId;
    this.currentCity = currentCity;
    this.bot = bot
    this.weatherHoulrly;
  }

  getOptions(buttons){
    let options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [buttons],
      })
    };
    return options;
  }

  getWeather(city, date) {
    return new Promise((resolve, reject) => {
      let path = '/premium/v1/weather.ashx?format=json&num_of_days=1' +
        '&q=' + encodeURIComponent(city) + '&key=' + config.wwoApiKey + '&date=' + date + '&lang=ru';
      console.log(config.host + path);

      this.WeatherRequest(path).then((output) => {
          resolve(output);
        },
        (error) => {
          reject(error);
        })
    })
  }

  WeatherRequest(path) {
    return new Promise((resolve, reject) => {
      http.get({
        host:config.host,
        path: path
      }, (res) => {
        let body = '';
        res.on('data', (d) => {
          body += d
        });
        res.on('end', () => {
          try {
            let output = {};
            let response = JSON.parse(body);
            if (response) {
              let current_condition = response['data']['current_condition'][0];
              output.currentTemp = response['data']['current_condition'][0]['temp_C'];
              output.maxtempC = response['data']['weather'][0]['maxtempC'];
              output.mintempC = response['data']['weather'][0]['mintempC'];
              output.location = response['data']['request'][0]['query'];
              output.date = response['data']['weather'][0]['date'];
              output.iconUrl = current_condition['weatherIconUrl'][0]['value'];
              output.weatherDesc = current_condition['lang_ru'][0]['value'];
              output.feelsLike = current_condition['FeelsLikeC'];
              output.windspeed = current_condition['windspeedKmph'];
              output.humidity = current_condition['humidity'];
              output.weatherHoulrly = response['data']['weather'][0]['hourly'];
              resolve(output);
            } else {
              let error = 'Error';
              resolve(error);
            }
          } catch (err) {
            reject(err);
          }
        });

        res.on('error', (error) => {
          reject(error);
        })
      })
    })
  }


  getAnswer(date, buttons){
    this.getWeather(this.currentCity, date).then(
      (output) => {
        let message = new Message(output);
        if (date === `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) {
          this.bot.sendMessage(this.userId, message.getWeatherToday(), this.getOptions(buttons));
        } else {
          this.bot.sendMessage(this.userId, message.getWeatherDate(), this.getOptions(buttons));
        }
        this.bot.sendPhoto(this.userId, message.getWeatherIcons());
    },
    (error) => {
      this.bot.sendMessage(this.userId, config.errorMessage);
    })
  }

  getAnswerNow(date, buttons){
    this.getWeather(this.currentCity, date).then(
      (output) => {
        let message = new Message(output);
        this.bot.sendMessage(this.userId, message.getCurrentTemp(), this.getOptions(buttons));
      },
      (error) => {
        this.bot.sendMessage(this.userId, config.errorMessage);
      }
    )
  }

  getAnswerDetails(date){
    this.getWeather(this.currentCity, date).then(
      (output) => {
        let message = new Message(output);
        this.bot.sendMessage(this.userId, message.getWeatherDetails());
      },
      (error) => {
        this.bot.sendMessage(this.userId, config.errorMessage);
      }
    )
  }
}
module.exports = Answer;
