const router = require('express').Router();
const { getCurrentUser, getUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getCurrentUser);
router.get('/:id', getUser);

module.exports = router;