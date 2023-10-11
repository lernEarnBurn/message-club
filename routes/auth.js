var express = require('express');
var router = express.Router();
const passport = require('passport')


router.post('/log-in', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}))

router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

module.exports = router;
