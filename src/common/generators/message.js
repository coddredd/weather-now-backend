class Message {

    constructor() {
        if (this.constructor === Message) {
            throw new TypeError('Abstract class "Message" cannot be instantiated directly.');
        }

        if (this.weatherIcon === undefined) {
            throw new TypeError('Classes extending the message abstract class');
        }
        if (this.currentTemperature === undefined) {
            throw new TypeError('Classes extending the message abstract class');
        }
        if (this.weatherDate === undefined) {
            throw new TypeError('Classes extending the message abstract class');
        }
        if (this.weatherDetails === undefined) {
            throw new TypeError('Classes extending the message abstract class');
        }
    }

    getTime(timeStr) {
        switch(timeStr) {
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
}

module.exports = { Message };