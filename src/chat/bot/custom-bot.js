const TelegramBot = require('node-telegram-bot-api');

const { defaultMessages } = require('../../common/config/constants');

class CustomBot extends TelegramBot {

    constructor(token, options) {
        super(token, options);
    }

    getOptions(buttons) {
        return { reply_markup: JSON.stringify({ inline_keyboard: [buttons] }) };
    }

    sendStartMessage(id) {
        this.sendMessage(id, defaultMessages.startMessage)
    }

    sendHelp(id) {
        this.sendMessage(id, defaultMessages.helpMessage)
    }

    sendErrorMessage(id, message) {
        this.sendMessage(id, message)
    }

    sendErrorMessageCity(id, message) {
        this.sendMessage(id, message);
    }

    sendMessageWithButtons(userId, message, buttons) {
        this.sendMessage(userId, message, this.getOptions(buttons))
    }

}

module.exports = { CustomBot };