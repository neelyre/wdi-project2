const express = require('express');
const router = express.Router();
const Upload = require('../models/uploads.js');
const User = require('../models/user.js');

router.get('/', (req, res)=>{
  if(req.session.logged){ //for login
	Upload.find({}, (err, foundUploads)=>{
		res.render('uploads/index.ejs', {
			Uploads: foundUploads
		});
	})
} else {   //redirect back to login
   res.redirect('/sessions/login')   //redirect back to login
 }   //redirect back to login
});



router.get('/new', (req, res)=>{
 User.find({}, (err, allUsers)=> {
	res.render('uploads/new.ejs');
  users:allUsers
  		});
  	});


    router.post('/', (req, res)=>{
      User.findById(req.body.userId, (err, foundUser) => {
        Upload.create(req.body, (err, createdUpload)=>{
          foundUser.uploads.push(createdUpload);
          foundUser.save((err, data)=>{
            res.redirect('/uploads');
          });
        });
      });
    });



router.get('/:id', (req, res)=>{
	Upload.findById(req.params.id, (err, foundUpload)=>{
    User.findOne({'uploads._id':req.params.id}, (err, foundUser)=>{
		res.render('uploads/show.ejs', {
      Upload: foundUpload,
      user: foundUser
      });
    });
  });
});


router.delete('/:id', (req, res)=>{
  Upload.findByIdAndRemove(req.params.id, ()=>{
    User.findOne({'uploads._id': req.params.id}, (err, foundUser) => {
      foundUser.uploads.id(req.params.id).remove();
      foundUser.save((err, savedUser)=>{
        res.redirect('/uploads');
      })
    });
  });
});


router.get('/:id/edit', (req, res)=>{
  Upload.findById(req.params.id, (err, foundUpload)=>{
    User.find({}, (err, allAuthors)=>{
      User.findOne({'uploads._id':req.params.id}, (err, foundUploadUser)=>{
        res.render('uploads/edit.ejs', {
          upload: foundUpload,
          users: allUsers,
          uploadUser: foundUploadUser
        });
      });
    });
  });
});

router.put('/:id', (req, res)=>{
  Upload.findByIdAndUpdate(req.params.id, req.body, ()=>{
    User.findOne({ 'uploads._id' : req.params.id }, (err, foundUser)=>{
      foundUser.uploads.id(req.params.id).remove();
      foundUser.uploads.push(updatedUpload);
      foundUser.save((err, data)=>{
        res.redirect('/uploads');
      });
    });
  });
});


module.exports = router;
