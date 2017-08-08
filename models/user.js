const mongoose = require('mongoose');
const Upload = require('../models/uploads.js');

const userSchema = mongoose.Schema({
  name: String,
  school: String,
  url: String,

	uploads: [Upload.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
