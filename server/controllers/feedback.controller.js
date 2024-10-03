const Feedback = require('../models/Feedback');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createFeedback = catchAsync(async (req, res, next) => {
  const { feedbacks } = req.body;

  if (!feedbacks || !Array.isArray(feedbacks)) {
    return next(new AppError('Please provide a list of feedbacks', 400));
  }

  await Feedback.insertMany(feedbacks);

  res.status(201).json({
    status: 'success',
    message: 'Feedback submitted',
  });
});
