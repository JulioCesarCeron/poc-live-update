const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
  res.send('Hello World!');
});

routes.get('/version', function(req, res) {
  const response = {
    id: 1,
    date: Date.now(),
    description: 'API test',
    version: '0.0.0',
  };

  res.status(200).json(response);
});


module.exports = routes