const { 
  getReviews, 
  getReview, 
  getProductReviews, 
  getUserReviews, 
  createReview
} = require('../controllers/reviews');
const router = require('express').Router();
const auth = require('../middlewares/auth');

router.get('/', getReviews);
router.get('/:id', getReview);
router.get('/product/:id', getProductReviews);
router.get('/user/:id', getUserReviews);
router.post('/', auth, createReview);

module.exports = router;