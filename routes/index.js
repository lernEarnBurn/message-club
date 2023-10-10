var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')



/* GET home page. */
router.get('/', function(req, res, next) {
  const currentUser = res.locals.currentUser;
  

  if(currentUser === undefined){
    res.redirect('/log-in')
  }else{
    res.render('index');
  }
});

router.get('/log-in', function(req, res, next) {
  res.render('login')
})

router.get('/sign-up', function(req, res, next) {
  res.render('signUp')
})

router.get('/club-entry', function(req, res, next){
  res.render('club')
})

router.post('/sign-up', userController.createUser)




module.exports = router;
