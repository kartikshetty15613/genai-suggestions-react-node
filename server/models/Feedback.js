const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide a category'],
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide a subCategory'],
  },
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Feedback must have a rating '],
  },
  evaluation: {
    type: Number,
  },
  submittedBy: {
    type: String,
    required: [true, 'Feedback must have the submitted user name'],
  },
  role: {
    type: String,
    required: [true, 'Submitted user role is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

feedbackSchema.pre('insertMany', (next, docs) => {
  docs.forEach((doc) => {
    doc.evaluation = doc.role === 'sales' ? doc.rating * 70 : doc.rating * 30;
  });

  next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
