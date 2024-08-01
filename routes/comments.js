const auth = require('../middlewares/auth');
const router = require('express').Router();
const { createComment } = require('../controllers/comments');

router.post('/', auth, createComment);

module.exports = router;