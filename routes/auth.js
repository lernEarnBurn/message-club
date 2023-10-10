var express = require('express');
var router = express.Router();
const passport = require('passport')





router.post('/log-in', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}))

module.exports = router;
