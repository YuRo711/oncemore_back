const { createOrder, updateOrderStatus, getOrders } = require('../controllers/orders');
const adminPrivilege = require('../middlewares/adminPrivilege');
const auth = require('../middlewares/auth');
const router = require('express').Router();


router.get('/', auth, adminPrivilege, getOrders);
router.post('/', auth, createOrder);
router.patch('/:id', auth, adminPrivilege, updateOrderStatus);

module.exports = router;