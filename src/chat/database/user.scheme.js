const mongoose = require('mongoose');
const { config } = require('../../common/config/constants');

mongoose.connect(config.uri);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    location:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);