var express = require('express');
var router = express.Router();
const passport = require('passport')
var LocalStrategy = require('passport-local');

const User = require('../models/user')


passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        const match = await bcrypt.compare(password, user.password);
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        };
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        };
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
  );
  
  passport.serializeUser((user, done) => {
    console.log('serialize user')

    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    console.log('deserialize user')
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });

  
router.post('/log-in', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  }))

module.exports = router;
