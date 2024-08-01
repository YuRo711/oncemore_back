const router = require('express').Router();
const { 
  getCurrentUser, 
  getUser, 
  editCurrentUser, 
  blockUser
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, editCurrentUser);
router.get('/:id', getUser);
router.patch('/block/:id', blockUser);

module.exports = router;