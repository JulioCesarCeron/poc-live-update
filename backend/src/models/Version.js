const mongoose = require('mongoose');
const VersionSchema = new mongoose.Schema({
  date: Number,
  description: String,
  version: String,
}, {
  collection: 'poc-live-update'
})

module.exports = mongoose.model('Version', VersionSchema);