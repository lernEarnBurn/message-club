var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/sign-up', function(req, res, next) {
  res.render('signUp')
})

router.post('/sign-up', userController.createUser)

module.exports = router;
