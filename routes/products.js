const { deleteProduct, createProduct, getProducts, getProduct, editProduct, likeProduct, unlikeProduct } = require('../controllers/products');
const auth = require('../middlewares/auth');
const router = require('express').Router();
const adminPrivilege = require('../middlewares/adminPrivilege');
const { addProductToType } = require('../controllers/productType');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.patch('/:id', auth, adminPrivilege, editProduct);
router.post('/', createProduct);
router.post('/types', auth, adminPrivilege, addProductToType);
router.delete('/:id', auth, adminPrivilege, deleteProduct);

router.patch('/:id/like', auth, likeProduct);
router.patch('/:id/unlike', auth, unlikeProduct);

module.exports = router;