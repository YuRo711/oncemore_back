const router = require('express').Router();
const { 
  getCurrentUser, 
  getUser, 
  editCurrentUser 
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, editCurrentUser);
router.get('/:id', getUser);

module.exports = router;