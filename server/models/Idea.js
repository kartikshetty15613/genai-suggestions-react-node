const mongoose = require('mongoose');
const Category = require('./Category');
const SubCategory = require('./SubCategory');

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide a category'],
    ref: Category,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide a subCategory'],
    ref: SubCategory,
  },
  description: {
    type: String,
    required: [true, 'Please provide description of your idea'],
  },
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
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

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
