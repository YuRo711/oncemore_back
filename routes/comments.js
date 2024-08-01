const auth = require('../middlewares/auth');
const router = require('express').Router();
const { 
  createComment, 
  deleteComment 
} = require('../controllers/comments');

router.post('/', auth, createComment);
router.delete('/:id', auth, adminPrivilege, deleteComment);

module.exports = router;