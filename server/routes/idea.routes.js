const express = require('express');
const ideaController = require('../controllers/idea.controller');

const router = express.Router();

router.route('/').get(ideaController.getAllIdeas).post(ideaController.addIdea);

router.route('/bulk').patch(ideaController.bulkUpdate);

router
  .route('/:ideaId')
  .get(ideaController.getIdea)
  .patch(ideaController.updateIdea);

module.exports = router;
