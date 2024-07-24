const router = require('express').Router();
const { getUsers } = require('../controllers/users');
const { getCurrentUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getCurrentUser);
router.get('/', getUsers);

module.exports = router;