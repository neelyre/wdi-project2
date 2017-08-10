//REQUIRES//
const express = require('express');
const app = express();
const usersController = require('./controllers/user.js');
const uploadsController = require('./controllers/uploads.js');
const sessionsController = require('./controllers/sessions.js');
const homeController = require('./controllers/home.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session        = require('express-session');


console.log(usersController);



//MIDDLEWARE//

app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('css'));


app.use(session({
    secret: "this is a random string secret", //a random string do not copy this value or your stuff will get hacked
    resave: false,
    saveUninitialized: false

}));

app.use('/user', usersController);  //go last after middleware
app.use('/uploads', uploadsController);
app.use('/sessions', sessionsController);
app.use('/home', homeController);



app.get('/', (req, res)=>{
// 	// Upload.find({}, (err, foundUploads)=>{
	res.render('index.ejs');
// 	Uploads: foundUploads
});


const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project2'
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});

const port = process.env.PORT || 3000

app.listen(port, ()=>{
	console.log('---------------------------------');
console.log('Server running on port: ' + port);
console.log('---------------------------------');
});
