const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//GOOGLE AUTHENTICATION

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});
///////////////////////////////////////////////
//FACEBOOK AUTHENTICATION

router.get('/facebook', passport.authenticate('facebook',{
	scope : ['public_profile', 'email','profile']
}));


// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/facebook/redirect',passport.authenticate('facebook'), (req, res) => {
    // res.send(req.user);
    console.log("facebook redirect");
    res.redirect('/profile');
});
module.exports = router;
