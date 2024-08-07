const { createOrder, updateOrderStatus } = require('../controllers/orders');
const adminPrivilege = require('../middlewares/adminPrivilege');
const auth = require('../middlewares/auth');
const router = require('express').Router();


router.post('/', auth, createOrder);
router.patch('/:id', auth, adminPrivilege, updateOrderStatus);

module.exports = router;