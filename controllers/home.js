const express = require('express');
const router = express.Router();
const Upload = require('../models/uploads.js');
const User = require('../models/user.js');

router.get('/', (req, res)=>{
// 	// Upload.find({}, (err, foundUploads)=>{
	res.render('home/index.ejs');
// 	Uploads: foundUploads
});







module.exports = router;
