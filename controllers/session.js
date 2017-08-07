const express = require('express');
const router = express.Router();
const User   = require('../models/user.js');
const bcrypt = require('bcrypt');



router.get('/login', (req, res, next) => {
  res.render('users/login.ejs', {})
})


router.get('/register', (req, res, next) => {
  res.render('users/register.ejs', {})
})

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

router.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(req.body.password == foundUser.password){
            res.send('logged in');
        } else {
            res.send('wrong password');
        }
    });
});

router.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, function(err, foundUser){
        if(req.body.password == foundUser.password){
            req.session.currentuser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    });
});

router.post('/', function(req, res){
    User.findOne({ username: req.body.username },(err, foundUser) => {
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentuser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    });
});

router.post('/login', (req, res)=>{
  req.session.username = req.body.username;
  req.session.logged   = true;
  console.log(req.session);
  res.redirect('/users')
});

router.get('/retrieve', function(req, res){ //any route will work
	if(req.session.anyProperty === "something you want it to"){//test to see if that value exists
		//do something if it's a match
	} else {
		//do something else if it's not
	}
});

router.get('/update', function(req, res){ //any route will work
	req.session.anyProperty = 'changing anyProperty to this value';
});

router.get('/logout', function(req, res){
  req.session.destroy(function(err){

	    if(err){
	      // do something
	    } else {
	      res.redirect('/')
	    }
  })
})

router.delete('/', (req, res) => {
    req.session.destroy(function(){
        res.redirect('/');
    });
})





// export the controller
module.exports = router;
