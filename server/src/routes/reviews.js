const express = require('express');
const {
  getReviewById,
  getReviewsByProductId,
  createReview,
} = require('../controllers/reviews');

const router = express.Router();

router.get('/:reviewId', getReviewById);
router.get('/product/:productId', getReviewsByProductId);

router.post('/', createReview);

module.exports = router;
