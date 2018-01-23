const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');

const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

app.set('view engine', 'ejs');


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

mongoose.connect(keys.mongodb.dbURI)
    .then(() => {
        mongoose.connection.on('error', err => {
            console.log('mongoose connection error: '+err);
        });

        console.log('connected - attempting reconnect');
        return mongoose.connect(keys.mongodb.dbURI);
    })
    .catch(err => {
        console.log('rejected promise: '+err);
        mongoose.disconnect();
    });
;


app.get('/', (req, res) => {
    res.render('home',{user:req.user});
});

app.listen(3000,()=>{
	console.log("Connected on port 3000");
})

