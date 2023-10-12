const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

const bcrypt = require('bcryptjs');

exports.createUser = [
  body('firstname')
    .trim()
    .isLength({ min: 1, max: 15 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('lastname')
    .trim()
    .isLength({ min: 1, max: 15 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('email')
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .withMessage('Email must be specified'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('signUp', { errors: errors.array() });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
          });

          const result = await user.save();
          res.redirect('/');
        }
      });
    }
  }),
];

exports.checkPassword = asyncHandler(async (req, res, next) => {
  const currentUser = res.locals.currentUser;

  if (req.body.password === 'member' && currentUser) {
    const user = await User.findByIdAndUpdate(
      currentUser.id,
      { membership: 'member' },
      { new: true },
    );
    res.redirect('/');
  } else if (req.body.password === 'admin' && currentUser) {
    const user = await User.findByIdAndUpdate(
      currentUser.id,
      { membership: 'admin' },
      { new: true },
    );
    res.redirect('/');
  } else {
    res.render('club', { incorrect: 'Password is incorrect' });
  }
});
