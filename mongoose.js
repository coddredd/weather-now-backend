var mongoose = require('mongoose');
let config = require('./config');
mongoose.connect(config.uri);

module.exports = mongoose;
