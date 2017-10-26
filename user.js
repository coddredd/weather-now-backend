let mongoose = require('./mongoose');
let config = require('./config');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
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
