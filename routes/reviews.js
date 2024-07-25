const { 
  getReviews, 
  getReview, 
  getProductReviews, 
  getUserReviews 
} = require('../controllers/reviews');
const router = require('express').Router();

router.get('/', getReviews);
router.get('/:id', getReview);
router.get('/product/:id', getProductReviews);
router.get('/user/:id', getUserReviews);

module.exports = router;