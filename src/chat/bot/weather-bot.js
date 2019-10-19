const { CustomBot } = require('./custom-bot');
const { UserService } = require('../database/user.service');
const { Answer } = require('../../common/services/answer');
const { ChatMessage } = require('../../common/generators/chat-message');
const { helpButtons } = require('../../common/config/constants');

const { firstDetailedButton, secondDetailedButton, dateButtons } = helpButtons;

class WeatherBot extends CustomBot {

    constructor(token, options) {
        super(token, options)
    }

    start(id) {
        return UserService.createUser(id)
            .then(() => this.sendStartMessage(id))
            .catch((error) => this.sendErrorMessage(id, error.message));
    }

    setCity(id, location) {
        return UserService.setCity(id, location)
            .then(() => this.sendMessage(id, `City was set successfully!`))
            .catch((error) => this.sendErrorMessageCity(id, error.message))
    }

    sendNowData(id) {
        return UserService.getCity(id)
            .then(location => {
                const answer = this._createAnswer(location);
                return answer.getNowWeather();
            })
            .then(message => this.sendMessage(id, message))
            .catch((error) => this.sendErrorMessage(id, error.message));
    }

    sendDailyWeather() {
        return UserService.getUsers()
            .then(users => Promise.all(users.map(user => this._sendTodayWeather(user.id, user.location))))
            .catch((error) => this.sendErrorMessage(id, error.message))
    }

    sendTodayData(id) {
        return UserService.getCity(id)
            .then(location => this._sendTodayWeather(id, location))
            .catch((error) => this.sendErrorMessage(id, error.message));
    }

    sendTomorrowData(id) {
        return UserService.getCity(id)
            .then(location => {
                const answer = this._createAnswer(location);
                return answer.getTomorrowWeather();
            })
            .then(message => this._sendByDate(id, message, secondDetailedButton))
            .catch((error) => this.sendErrorMessage(id, error.message));
    }

    sendDataByDate(id, location, date) {
        const answer = this._createAnswer(location);
        return answer.getWeatherByDate(date)
            .then(message => this._sendByDate(id, message, dateButtons))
            .catch((error) => this.sendErrorMessage(id, error.message));
    }

    sendTodayDetails(id) {
        return UserService.getCity(id)
            .then(location => {
                const answer = this._createAnswer(location);
                return answer.getTodayDetails();
            })
            .then(message => this.sendMessage(id, message))
            .catch((error) => this.sendErrorMessage(id, error.message));
    }

    sendTomorrowDetails(id) {
        return UserService.getCity(id)
            .then(location => {
                const answer = this._createAnswer(location);
                return answer.getTomorrowDetails();
            })
            .then(message => this.sendMessage(id, message))
            .catch((error) => this.sendErrorMessage(id, error.message));
    }

    _sendTodayWeather(id, location) {
        const answer = this._createAnswer(location);
        return answer.getTodayWeather()
            .then(message => this._sendByDate(id, message, firstDetailedButton))
    }

    _sendByDate(id, message, button) {
        return this.sendPhoto(id, message.icon)
            .then(() => this.sendMessageWithButtons(id, message.text, button));
    }

    _createAnswer(location) {
        return new Answer(location, ChatMessage);
    }

}

module.exports = { WeatherBot };