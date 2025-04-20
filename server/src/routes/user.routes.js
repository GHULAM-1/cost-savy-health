const express = require('express');
const { check } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(getUser)
  .put([
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail()
  ], updateUser)
  .delete(deleteUser);

module.exports = router;