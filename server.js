//REQUIRES//
const express = require('express');
const app = express();
const usersController = require('./controllers/user.js');
const uploadsController = require('./controllers/uploads.js');
const sessionsController = require('./controllers/session.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');




//MIDDLEWARE//

app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('css'));
app.use('/user', usersController);  //go last after middleware
app.use('/uploads', uploadsController);
app.use('/session', sessionsController);

app.use(session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
}));


// app.get('/', (req, res)=>{
// 	// Upload.find({}, (err, foundUploads)=>{
// 	res.render('index.ejs');
// 	Uploads: foundUploads
// });


app.get('/', (req, res)=>{
    res.render('index.ejs', {
        currentUser: req.session.currentuser
    });
});

app.get('/app', (req, res) =>{
    if(req.session.currentuser){
        res.send('the party');
    } else {
        res.redirect('/sessions/new');
    }
});

mongoose.connect('mongodb://localhost:27017/blog');
mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});

app.listen(3000, ()=>{
	console.log('listening....');
});
