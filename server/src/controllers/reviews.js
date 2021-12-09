const { nanoid } = require('nanoid');
const prisma = require('../prisma');
const { MAX_RATING, MIN_RATING, RATING_INCREMENT } = require('../constants');
const { generateId } = require('../util');
const UserError = require('../classes/user-error');

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
    return next(new UserError(err.message, 400));
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
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json({ reviews });
  } catch (err) {
    return next(new UserError(err.message, 400));
  }
};

exports.createReview = async (req, res, next) => {
  let { rating, comment, productId } = req.body;
  rating = parseInt(rating);

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
    await prisma.review.create({
      data: {
        id: generateId().next().value,
        comment,
        rating,
        productId,
        maxRating: MAX_RATING,
      },
    });

    const { averageRating, reviewsCount } = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: { averageRating: true, reviewsCount: true },
    });

    const updatedReviewsCount = reviewsCount + 1;
    const updatedAverageRating =
      (averageRating * reviewsCount + rating) / updatedReviewsCount;

    // update the averageRating of the product
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        averageRating: updatedAverageRating,
        reviewsCount: updatedReviewsCount,
      },
      select: {
        averageRating: true,
      },
    });
    res.status(200).redirect('/');
  } catch (err) {
    return next(new UserError(err.message, 400));
  }
};
