var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const messageController = require('../controllers/messageController')



/* GET home page. */
router.get('/', messageController.displayMessages)

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

router.post('/post-message', messageController.postMessage)

router.post('/club-entry', userController.checkPassword)




module.exports = router;
