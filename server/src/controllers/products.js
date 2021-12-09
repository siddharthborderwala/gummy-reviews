const prisma = require('../prisma');
const UserError = require('../classes/user-error');

const productSelect = {
  id: true,
  name: true,
  averageRating: true,
};

exports.getDefaultProduct = async (req, res, next) => {
  try {
    const defaultProduct = await prisma.product.findFirst({
      select: productSelect,
      orderBy: {
        createdAt: 'asc',
      },
    });
    res.status(200).json({ product: defaultProduct });
  } catch (err) {
    return next(new UserError(err.message, 400));
  }
};
