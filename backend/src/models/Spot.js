const mongoose = require('mongoose');

const { serverIp, tcpPort } = require('../config/settings');

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true,
  },
});

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://${serverIp}:${tcpPort}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);