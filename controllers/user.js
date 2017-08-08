const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Upload = require('../models/uploads.js');
const bcrypt = require('bcrypt');



router.get('/', (req, res)=>{
  User.find({}, (err, foundUsers)=>{
	   res.render('user/index.ejs', {
      users: foundUsers
		});
	})
});


router.get('/new', (req, res)=>{
	res.render('user/new.ejs');
});

router.post('/', (req, res)=>{
	User.create(req.body, (err, createdUser)=>{
		res.redirect('/user');
	});
});

router.get('/:id', (req, res)=>{
	User.findById(req.params.id, (err, foundUser)=>{
		res.render('user/show.ejs', {
			user: foundUser
		});
	});
});

router.get('/:id/edit', (req, res)=>{
	User.findById(req.params.id, (err, foundUser)=>{
		res.render('user/edit.ejs', {
			user: foundUser
		});
	});
});

router.put('/:id', (req, res)=>{
	User.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/user');
	});
});

router.delete('/:id', (req, res)=>{
	User.findByIdAndRemove(req.params.id, (err, foundUser)=>{
		const uploadIds = [];
		for (let i = 0; i < foundUser.uploads.length; i++) {
			articleIds.push(foundUser.uploads[i]._id);
		}
		Upload.remove(
			{
				_id : {
					$in: uploadIds
				}
			},
			(err, data)=>{
				res.redirect('/users');
			}
		);
	});
});

module.exports = router;
