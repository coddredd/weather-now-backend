const { Answer } = require('../common/services/answer');
const { WebMessage } = require('../common/generators/web-message');

exports.getNowWeather = async (req, res, next) => {
  try {
    const answer = getAnswer(req);
    const body = await answer.getNowWeather();
    sendAnswer(body, res);
  } catch (error) {
    next(error)
  }
};

exports.getTodayWeather = async (req, res, next) => {
  try {
    const answer = getAnswer(req);
    const body = await answer.getTodayWeather();
    sendAnswer(body, res);
  } catch (error) {
    next(error)
  }
};

exports.getTomorrowWeather = async (req, res, next) => {
  try {
    const answer = getAnswer(req);
    const body = await answer.getTomorrowDetails();
    sendAnswer(body, res);
  } catch (error) {
    next(error)
  }
};

exports.getByDateWeather = async (req, res, next) => {
  try {
    const date = req.params.date;
    const answer = getAnswer(req);
    const body = await answer.getWeatherByDate(date);
    sendAnswer(body, res);
  } catch (error) {
    next(error)
  }
};

exports.getDetails = async (req, res, next) => {
  try {
    const date = req.params.date;
    const answer = getAnswer(req);
    const body = await answer._getByDate(date);
    sendAnswer(body, res);
  } catch (error) {
    next(error)
  }
};

function getAnswer(req) {
  const location = req.params.location;
  return new Answer(location, WebMessage);
}

function sendAnswer(answer, res) {
  if (answer) res.status(200).json(answer);
  else throw new Error('The information about weather not found');
}