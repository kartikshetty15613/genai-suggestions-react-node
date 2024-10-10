const catchAsync = require('../utils/catchAsync');
const Idea = require('../models/Idea');

exports.getGraphData = catchAsync(async (req, res, next) => {
  const aggregation = await Idea.aggregate([
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
        rating: { $ifNull: ['$rating', 0] },
      },
    },
    {
      $group: {
        _id: '$subCategory',
        category: {
          $first: '$category',
        },
        ratingAvg: {
          $avg: '$rating',
        },
      },
    },
    {
      $project: {
        _id: '$_id',
        category: '$category',
        ratingAvg: {
          $round: ['$ratingAvg', 0],
        },
      },
    },
    {
      $group: {
        _id: '$category',
        subCategories: {
          $push: {
            name: '$_id',
            ratingAvg: '$ratingAvg',
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
