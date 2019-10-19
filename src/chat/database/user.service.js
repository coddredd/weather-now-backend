const User = require('./user.scheme');

class UserService {

    static createUser(id) {
        const newUser = new User({id, location: 'Kiev'});
        return new Promise((resolve, reject) => newUser.save(error => error ? reject(error) : resolve()));
    }

    static setCity(id, location) {
        return new Promise((resolve, reject) => {
            User.findOne({id}, (error, user) => error ?
                reject(error) :
                user ?
                    User.update({id}, {$set: {location}}, error => error ? reject(error) : resolve()) :
                    reject(this._createError('Введите команду /start, пожалуйста.'))
            );
        })
    }

    static getCity(id) {
        return new Promise((resolve, reject) => {
            User.findOne({id}, (error, user) => error ?
                reject(error) :
                user && user.location ? resolve(user.location) : reject(this._createError('Установите город, пожалуйста.'))
            )
        })
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
            User.find((error, users) => error ? reject(error) : resolve(users || []));
        })
    }

    static _createError(message) {
        return new Error(message);
    }

}

module.exports = { UserService };