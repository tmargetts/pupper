const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');

module.exports = router;

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 */

const {PUBLIC_URL=''} = process.env

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.');
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:`${PUBLIC_URL}/${process.env.GOOGLE_CALLBACK}`,
  };

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.find({ where: { googleId } })
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({ name, email, googleId })
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done);
  });

  passport.use(strategy);

  router.get('/', passport.authenticate('google', { scope: 'email' }));


  router.get('/callback', (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) { return next(err); }

      req.logIn(user, (err) => {
      if (err) { return next(err); }

      if(user._options.isNewRecord){
        return res.redirect('/createProfile')
      }

      return res.redirect('/pets');
    });
    })(req, res, next);
  });
}