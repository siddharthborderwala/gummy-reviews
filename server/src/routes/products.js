const express = require('express');
const { getDefaultProduct } = require('../controllers/products');
const { getReviewsByProductId } = require('../controllers/reviews');

const router = express.Router();

router.get('/default', getDefaultProduct);
router.get('/:productId/reviews/', getReviewsByProductId);

module.exports = router;
