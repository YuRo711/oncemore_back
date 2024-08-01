const { deleteProduct, createProduct, getProducts, getProduct, editProduct } = require('../controllers/products');
const auth = require('../middlewares/auth');
const router = require('express').Router();
const adminPrivilege = require('../middlewares/adminPrivilege');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.patch('/:id', auth, adminPrivilege, editProduct);
router.post('/', auth, adminPrivilege, createProduct);
router.delete('/:id', auth, adminPrivilege, deleteProduct);

module.exports = router;