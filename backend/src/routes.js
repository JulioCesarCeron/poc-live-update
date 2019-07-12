const express = require('express')
const routes = express.Router()

const VersionController = require('./controllers/VersionController');

routes.get('/', (req, res) => {
  res.send('Hello World!');
});

routes.get('/version', VersionController.index);
routes.post('/version', VersionController.store)

module.exports = routes