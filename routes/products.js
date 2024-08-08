const { deleteProduct, createProduct, getProducts, getProduct, editProduct, likeProduct, unlikeProduct } = require('../controllers/products');
const auth = require('../middlewares/auth');
const router = require('express').Router();
const adminPrivilege = require('../middlewares/adminPrivilege');
const { getProductType } = require('../controllers/productType');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.patch('/:id', auth, adminPrivilege, editProduct);
router.post('/', createProduct);
router.delete('/:id', auth, adminPrivilege, deleteProduct);

router.get('/types', getProductType);

router.patch('/:id/like', auth, likeProduct);
router.patch('/:id/unlike', auth, unlikeProduct);

module.exports = router;