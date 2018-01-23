const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy    = require('passport-local').Strategy;

const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({'google.googleId': profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    'google.googleId': profile.id,
                    'google.username': profile.displayName,
                    'google.thumbnail': profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect"
  },
  (accessToken, refreshToken, profile, done)=> {
    User.findOne({'facebook.facebookId': profile.id}).then((currentUser) => {
            //console.log("HERRRRRRRRRRREEEEE");
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                //console.log("EH DAAAAAAA");
                new User({
                    //console.log(profile);
                    'facebook.facebookId': profile.id,
                    'facebook.username': profile.displayName,
                    'facebook.token':accessToken,
                    //'facebook.email':profile.email[0].value
                }).save().then((newUser) => {
                    console.log(profile);
                    //console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        },(err)=>{
            console.log(err);
        });
  	})
);
