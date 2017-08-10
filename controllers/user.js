const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Upload = require('../models/uploads.js');




router.get('/', (req, res)=>{
  if(req.session.logged){
  User.find({}, (err, foundUsers)=>{
	   res.render('user/index.ejs', {
      users: foundUsers
		});
	})
} else {
    res.redirect('/sessions/login')
  }
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
	User.findByIdAndRemove(req.params.id, ()=>{
		res.redirect('/user');
	});
});

module.exports = router;
