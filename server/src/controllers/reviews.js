const { nanoid } = require('nanoid');
const prisma = require('../prisma');
const { MAX_RATING, MIN_RATING, RATING_INCREMENT } = require('../constants');
const { generateId } = require('../util');

const reviewSelect = {
  id: true,
  comment: true,
  maxRating: true,
  rating: true,
};

exports.getReviewById = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      select: reviewSelect,
    });
    res.status(200).json({ review });
  } catch (err) {
    return next(new UserError(err.message));
  }
};

exports.getReviewsByProductId = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      select: reviewSelect,
    });
    res.status(200).json({ reviews });
  } catch (err) {
    return next(new UserError(err.message));
  }
};

exports.createReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  if (
    !rating ||
    rating > MAX_RATING ||
    rating < MIN_RATING ||
    rating % RATING_INCREMENT != 0
  ) {
    return next(
      new UserError('Rating must be a value from 0 to 5 with increments of 0.5')
    );
  }

  if (!comment || comment.trim().length === 0) {
    return next(new UserError('Comment required to create a review'));
  }

  if (!productId || productId.trim().length === 0) {
    return next(new UserError('Product id required to create a review'));
  }

  try {
    const review = prisma.review.create({
      data: {
        id: generateId().next().value,
        comment,
        rating,
        productId,
        maxRating: MAX_RATING,
      },
      select: reviewSelect,
    });
    // update the averageRating of the product
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        averageRating: true,
      },
    });
    const newAverageRating =
      (product.averageRating * product.reviewsCount + rating) /
      (product.reviewsCount + 1);
    res.status(200).json({ review });
  } catch (err) {
    return next(new UserError(err.message));
  }
};
