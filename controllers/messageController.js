const Message = require('../models/message')

const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")


exports.displayMessages = asyncHandler(async(req, res, next) => {
  const currentUser = res.locals.currentUser;

  if(currentUser === undefined){
    res.redirect('/log-in')
  }else{
    const messages = await Message.find({}).populate('author').exec()
    res.render('index', {messages: messages});
  }
})

exports.postMessage = [
  body('content')
  .trim()
  .isLength({ min: 1 })
  .unescape()
  .withMessage("Content must be specified."),

  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)
    const currentUser = res.locals.currentUser

    const message = new Message({
      author: currentUser,
      content: req.body.content
    })

    if(errors.isEmpty()){
      await message.save()
      res.redirect('/')
    }else{
      res.render("index", {
        message: message,
        errors: errors.array(),
      });
    }
  })
]

exports.deleteMessage = asyncHandler(async(req, res, next) => {
  const messageId = req.params.messageId;

  await Message.findByIdAndRemove(messageId)
  res.redirect('/')

})