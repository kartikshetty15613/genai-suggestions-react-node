const express = require('express');
const graphController = require('../controllers/graph.controller');
const router = express.Router();

router.get('/', graphController.getGraphData);

module.exports = router;
