const catchAsync = require('../utils/catchAsync');
const Idea = require('../models/Idea');
const AppError = require('../utils/appError');

exports.getAllIdeas = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const ideas = await Idea.find().limit(limit).skip(skip).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: ideas,
  });
});

exports.addIdea = catchAsync(async (req, res, next) => {
  const newIdea = new Idea(req.body);

  await newIdea.save();

  res.status(201).json({
    status: 'success',
    message: 'Idea submitted',
  });
});

exports.getIdea = catchAsync(async (req, res, next) => {
  const idea = await Idea.findById(req.params.ideaId)
    .populate('category')
    .populate('subCategory');

  if (!idea) {
    return next(new AppError('No submitted idea found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: idea,
  });
});

exports.updateIdea = catchAsync(async (req, res, next) => {
  if (!req.body.rating || Number.isNaN(req.body.rating)) {
    return next(new AppError('Please provide valid rating', 400));
  }

  const idea = await Idea.findById(req.params.ideaId);

  idea.rating = req.body.rating;
  idea.comment = req.body.comment;

  await idea.save();

  res.status(200).json({
    status: 'success',
    message: 'Idea updated',
  });
});

exports.bulkUpdate = catchAsync(async (req, res, next) => {
  const { ideas } = req.body;

  console.log(ideas);

  const updatedIdeas = await Promise.all(
    ideas.map(async (item) => {
      const idea = await Idea.findById(item._id);

      idea.rating = req.body.rating;
      idea.comment = req.body.comment;

      await idea.save();

      return idea;
    }),
  );
  res.status(200).json({
    status: 'succes',
    message: 'Ideas updated',
  });
});
