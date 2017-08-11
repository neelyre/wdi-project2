const express = require('express');
const router = express.Router();
const Upload = require('../models/uploads.js');
const User = require('../models/user.js');

router.get('/', (req, res)=>{
	if(req.session.logged){
	Upload.find({}, (err, foundUploads)=>{
		res.render('uploads/index.ejs', {
			Uploads: foundUploads
		});
	})
} else {
		res.redirect('/sessions/login')
	}
});




router.get('/new', (req, res)=>{
   User.find({}, (err, allUsers)=>{
	res.render('uploads/new.ejs',  {
  users: allUsers
});
});
});



router.post('/', (req, res)=>{
	console.log('logging the body');
	console.log(req.body);
    User.findById(req.body.userId, (err, foundUser)=>{
        Upload.create(req.body, (err, createdUpload)=>{ //req.body.userId is ignored due to Schema
            foundUser.uploads.push(createdUpload);
            foundUser.save((err, data)=>{
							console.log(createdUpload);
                res.redirect('/uploads');
            });
        });
    });
});


router.get('/:id', (req, res)=>{
    Upload.findById(req.params.id, (err, foundUpload)=>{
        User.findOne({'uploads._id':req.params.id}, (err, foundUser)=>{
// console.log(foundUser);
            res.render('uploads/show.ejs', {
                user:foundUser,
                upload: foundUpload
            });
            // res.send(foundUser)
        })
    });
});

router.delete('/:id', (req, res)=>{
    Upload.findByIdAndRemove(req.params.id, (err, foundUpload)=>{
        User.findOne({'uploads._id':req.params.id}, (err, foundUser)=>{
            foundUser.uploads.id(req.params.id).remove();
            foundUser.save((err, data)=>{
                res.redirect('/uploads');
            });
        });
    });
});

router.get('/:id/edit', (req, res)=>{
	Upload.findById(req.params.id, (err, foundUpload)=>{
		console.log(foundUpload);
		res.render('uploads/edit.ejs', {
			upload: foundUpload
		});
	});
});

router.put('/:id', (req, res)=>{
    Upload.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUpload)=>{
        User.findOne({ 'uploads._id' : req.params.id }, (err, foundUser)=>{
            foundUser.uploads.id(req.params.id).remove();
            foundUser.uploads.push(updatedUpload);
            foundUser.save((err, data)=>{
                res.redirect('/uploads/'+req.params.id);
            });
        });
    });
});

module.exports = router;
