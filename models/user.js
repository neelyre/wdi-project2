const mongoose = require('mongoose');
const Upload = require('../models/uploads.js');

const userSchema = mongoose.Schema({
  username: String,
   password: String
	// uploads: [Upload.schema]
});
const User = mongoose.model('User', userSchema);

module.exports = User;
