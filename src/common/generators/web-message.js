const { Message } = require('./message');
const { weatherIcons } = require('../config/constants');

class WebMessage extends Message {

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
        return {
            location: this.location,
            currentTemp: this.currentTemp,
            feelsLike: this.feelsLike
        }
    }

    get weatherDate() {
        return {
            location: this.location,
            mintempC: this.mintempC,
            maxtempC: this.maxtempC,
            weatherDesc: this.weatherDesc,
            humidity: this.humidity,
            windspeed: this.windspeed,
            date: this.date
        }
    }

    get weatherDetails() {
        let message = {};
        if (this.weatherHoulrly) {
            this.weatherHoulrly.forEach(wh => {
                message[this.getTime(wh.time)] = {
                    tempC: wh.tempC,
                    value: wh.lang_ru[0].value,
                    chanceofrain: wh.chanceofrain
                };
            });
        }
        return message;
    }

}

module.exports = { WebMessage };