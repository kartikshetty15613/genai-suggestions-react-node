const express = require('express');
const ideaController = require('../controllers/idea.controller');

const router = express.Router();

router.route('/').get(ideaController.getAllIdeas).post(ideaController.addIdea);

router
  .route('/:ideaId')
  .get(ideaController.getIdea)
  .patch(ideaController.updateIdea);

router.route('/:ideaId/bulk').patch(ideaController.bulkUpdate);

module.exports = router;
