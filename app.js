const express = require("express")
const app = express()

const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const session = require('express-session') 
const flash = require('connect-flash')

const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const path = require('path')

app.use(expressLayouts);
app.set("view engine",'ejs')

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// bring body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules'))

// session and flash config .
app.use(session({
    secret: "CHEDLI ANIS",
    resave: false,
    saveUninitialized: false, 
    cookie: {maxAge: 60000 * 15}
}))
app.use(flash())


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
const events = require('./routes/event-routes')
app.use('/events',events)

app.listen(3000, ( d => {
    console.log("App listening on port 3000")
}))