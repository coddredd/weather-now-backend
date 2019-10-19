class Helper {

    static getTodayDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }

    static getTomorrowDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
    }

}

module.exports = { Helper };