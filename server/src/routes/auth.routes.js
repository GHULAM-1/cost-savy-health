const express = require('express');
const { check } = require('express-validator');
const { protect } = require('../middleware/auth');
const passport = require('passport');
const router = express.Router();
const {
  register,
  login,
  getMe,
  logout,
  googleCallback
} = require('../controllers/auth.controller');

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleCallback
);

router.get('/me', protect, getMe);

router.get('/logout', logout);

module.exports = router;