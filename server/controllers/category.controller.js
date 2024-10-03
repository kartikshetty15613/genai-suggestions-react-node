const catchAsync = require('../utils/catchAsync');
const Category = require('../models/Category');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find().populate('subCategories');

  res.status(200).json({
    status: 'success',
    data: categories,
  });
});
