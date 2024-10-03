const express = require('express');
const categoryControllers = require('../controllers/category.controller');

const router = express.Router();

router.get('/', categoryControllers.getAllCategories);

module.exports = router;
