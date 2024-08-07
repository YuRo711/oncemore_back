const { createOrder, updateOrderStatus } = require('../controllers/orders');
const auth = require('../middlewares/auth');
const router = require('express').Router();


router.post('/', createOrder);
router.patch('/:id', auth, adminPrivilege, updateOrderStatus);

module.exports = router;