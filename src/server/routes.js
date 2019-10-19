const controller = require('./controller');

module.exports = (app) => {

  app.route('/now').get(controller.getNowWeather);

  app.route('/today').get(controller.getTodayWeather);

  app.route('/tomorrow').get(controller.getTomorrowWeather);

  app.route('/by-date').get(controller.getByDateWeather);

  app.route('/details').get(controller.getDetails);

};