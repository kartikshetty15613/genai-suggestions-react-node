const catchAsync = require('../utils/catchAsync');
const Category = require('../models/Category');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({}, ['_id', 'name'], {
    sort: { name: 1 },
  }).populate('subCategories');

  res.status(200).json({
    status: 'success',
    data: categories,
  });
});
