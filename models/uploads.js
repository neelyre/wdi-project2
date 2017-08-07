const mongoose = require('mongoose');


const uploadSchema = mongoose.Schema({
  title:  { type: String, required: true, unique: true },
	author: { type: String, required: true },
	body:   String,
	comments: [{ body: String, date: Date }], // can have arrays of objects with specific properties
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: { // can have properties that are objects
		votes: Number,
		favs:  Number
	}
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
