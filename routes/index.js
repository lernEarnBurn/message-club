var express = require('express');
var router = express.Router();


const userController = require('../controllers/userController')
const User = require('../models/user')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/sign-up', function(req, res, next) {
  res.render('signUp')
})

router.get('/club-entry', function(req, res, next){
  res.render('club')
})

router.post('/sign-up', userController.createUser)


module.exports = router;
