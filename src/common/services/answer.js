const { Weather } = require('./weather');
const { Helper } = require('./helper');

class Answer {

    constructor(location, Generator) {
        this.location = location;
        this.Generator = Generator;
    }

    getNowWeather() {
        const date = Helper.getTodayDate();
        return this._getWeather(date)
            .then(output => {
                const generator = new this.Generator(output);
                return generator.currentTemperature;
            })
    }

    getTodayWeather() {
        const date = Helper.getTodayDate();
        return this._getByDate(date)
    }

    getTomorrowWeather() {
        const date = Helper.getTomorrowDate();
        return this._getByDate(date)
    }

    getWeatherByDate(date) {
        return this._getByDate(date)
    }

    getTodayDetails() {
        const date = Helper.getTodayDate();
        return this._getDetails(date)
    }

    getTomorrowDetails() {
        const date = Helper.getTomorrowDate();
        return this._getDetails(date)
    }

    _getByDate(date = Helper.getTodayDate()) {
        return this._getWeather(date)
            .then(output => {
                const generator = new this.Generator(output);
                return generator.weatherDate;
            })
    }

    _getDetails(date) {
        return this._getWeather(date)
            .then(output => {
                const generator = new this.Generator(output);
                return generator.weatherDetails;
            });
    }

    _getWeather(date) {
        const weather = new Weather(this.location);
        return weather.get(date)
    }

}

module.exports = { Answer };