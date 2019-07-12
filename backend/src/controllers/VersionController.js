module.exports = {
  index(req, res) {
    const response = {
      id: 1,
      date: Date.now(),
      description: 'API test',
      version: '0.0.0',
    };
    res.status(200).json(response);
  },

  store(req, res) {
    const { notes } = req.body;
    req.io.emit('news', {version: '0.0.1', notes});
    return res.json(req.body);
  }
}