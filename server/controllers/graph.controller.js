const catchAsync = require('../utils/catchAsync');
const Feedback = require('../models/Feedback');

exports.getGraphData = catchAsync(async (req, res, next) => {
  const aggregation = await Feedback.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
      },
    },
    {
      $addFields: {
        category: '$category.name',
      },
    },
    {
      $lookup: {
        from: 'subcategories',
        localField: 'subCategory',
        foreignField: '_id',
        as: 'subCategory',
      },
    },
    {
      $unwind: {
        path: '$subCategory',
      },
    },
    {
      $addFields: {
        subCategory: '$subCategory.name',
      },
    },
    {
      $group: {
        _id: '$subCategory',
        category: {
          $first: '$category',
        },
        avg: {
          $avg: '$rating',
        },
      },
    },
    {
      $group: {
        _id: '$category',
        subCategories: {
          $push: {
            name: '$_id',
            avg: '$avg',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        subCategories: '$subCategories',
      },
    },
    {
      $sort: {
        category: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: aggregation,
  });
});
