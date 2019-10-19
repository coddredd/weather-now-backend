const express = require('express');
bodyParser = require('body-parser');

function runServer() {

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res) => !req.params.location && res.status(400).send());

  const routes = require('./routes');
  routes(app);

  app.listen(port);

}

module.exports = { runServer };