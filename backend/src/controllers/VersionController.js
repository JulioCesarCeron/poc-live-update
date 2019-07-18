const Version = require('../models/Version');

module.exports = {
   async index(req, res) {
    const version = await Version.find();
    return res.json(version[0]);
  },

  async sendNotification(req, res) {
    const { notes } = req.body;
    const version = await Version.find();
    req.io.emit('news', { version: version[0].version, notes });
    return res.json('notify sent');
  },

  async updateVersion(req, res) {
    const { version } = req.body;
    const versionToUpdate = await Version.findById('5d27e6361c9d4400004f5612');
    
    if (versionToUpdate.version === version) {
      return res.json("version alredy updated");
    }

    versionToUpdate.set({
      version: version
    });
    await versionToUpdate.save();
    return res.json(`version successful update to ${version}`);
  }
}