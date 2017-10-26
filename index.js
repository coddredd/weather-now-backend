const User = require('./user');
const Message = require('./message');
const Answer = require('./answer');
const TelegramBot = require('node-telegram-bot-api');
let config = require('./config');

let bot = new TelegramBot(config.token, {
  polling: true
});

bot.onText(/\/start/, (msg, match) => {
  let newUser = new User({
    id: msg.from.id,
    location: config.city
  })
  newUser.save((err, list) => {
    if (err) {
      bot.sendMessage(msg.from.id, config.startMessageError);
    } else bot.sendMessage(msg.from.id, config.startMessage);
  })
})

bot.onText(/\/city (.+)/, (msg, match) => {
  setCity(msg, match);
})

bot.onText(/\/now/, (msg, match) => {
  let userId = msg.from.id;
  let date = getDate(false);
  getCity(userId, (location) => {
    new Answer(userId, location, bot).getAnswerNow(date, config.buttons1)
  });
  User.find((err, users) => {
    console.log(users);
  })
})

bot.onText(/\/today/, (msg, match) => {
  let userId = msg.from.id;
  let date = getDate(false);
  getCity(userId, (location) => {
    new Answer(userId, location, bot).getAnswer(date, config.buttons2);
  });
})

bot.onText(/\/tomorrow/, (msg, match) => {
  let userId = msg.from.id;
  let date = getDate(true);
  getCity(userId, (location) => {
    new Answer(userId, location, bot).getAnswer(date, config.buttons3);
  });
})

bot.onText(/\/weather in (.+), (.+)/, (msg, match) => {
  let userId = msg.from.id;
  let currentCity = match[1];
  let date = match[2];
  new Answer(userId, location, bot).getAnswer(date, config.buttons3);
})

bot.onText(/\/help/, (msg, match) => {
  let userId = msg.from.id;
  bot.sendMessage(userId, config.startMessage);
})

bot.on('callback_query', (msg) => {
  let userId = msg.from.id;
  let answer = msg.data;
  getCity(userId, (location) => {
    if (answer === 'weatherToday') {
      let date = getDate(false);
      new Answer(userId, location, bot).getAnswer(date, config.buttons2);
    } else if (answer === 'weatherTomorrow') {
      let date = getDate(true);
      new Answer(userId, location, bot).getAnswer(date, config.buttons3);
    } else if (answer === 'weatherDetails1') {
      let date = getDate(false);
      new Answer(userId, location, bot).getAnswerDetails(date);
    } else if (answer === 'weatherDetails2') {
      let date = getDate(true);
      new Answer(userId, location, bot).getAnswerDetails(date);
    }
  });
})


function setCity(msg, match) {
  let userId = msg.from.id;
  let Curcity = match[1];
  let date = getDate(false);
  new Answer(userId, Curcity, bot).getWeather(Curcity, date).then((output) => {
      User.update({
        id: userId
      }, {
        $set: {
          location: Curcity
        }
      }, (err, user) => {
          bot.sendMessage(userId, `Установлен город ${Curcity}`);
      });

    },
    (error) => {
      bot.sendMessage(userId, config.errorMessageCity);
    })
}

function getCity(userId, callback) {
  User.findOne({
    id: userId
  }, (err, user) => {
    if (err) throw err;
    callback(user.location);
  })
}

function getDate(check) {
  let date;
  if (check) {
    date = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()+1}`;
  } else {
    date = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
  }
  return date;
}

setInterval(() => {
  let currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
  if (currentTime === config.time) {
    let date = getDate(false);
    User.find((err, users) => {
      if (err) throw err;
      users.forEach((user) => {
        new Answer(user.id, user.location, bot).getAnswer(date, config.buttons2);
      })
    });
  }
}, 60000);
