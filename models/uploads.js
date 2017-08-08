const mongoose = require('mongoose');


const uploadSchema = mongoose.Schema({
  title: String,
	url: String,
	description: String
});


const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
