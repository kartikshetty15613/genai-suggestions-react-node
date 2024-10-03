const cors = require('cors');
const express = require('express');
const categoryRouter = require('./routes/category.routes');
const feedbackRouter = require('./routes/feedback.routes');
const errorController = require('./controllers/error.controller');
const AppError = require('./utils/appError');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/feedbacks', feedbackRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
