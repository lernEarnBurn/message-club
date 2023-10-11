const Message = require('../models/message')

const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")


exports.postMessage = [
  body('content')
  .trim()
  .isLength({ min: 1 })
  .escape()
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