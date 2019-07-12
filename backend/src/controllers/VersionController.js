const Version = require('../models/Version');

module.exports = {
   async index(req, res) {
    const version = await Version.find();
    return res.json(version[0]);
  },

  store(req, res) {
    const { notes } = req.body;
    req.io.emit('news', { version: '0.0.1', notes });
    return res.json(req.body);
  }
}