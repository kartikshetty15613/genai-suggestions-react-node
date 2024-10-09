const express = require('express');
const ideaController = require('../controllers/idea.controller');

const router = express.Router();

router.route('/').post(ideaController.addIdea);

router
  .route('/:ideaId')
  .get(ideaController.getIdea)
  .patch(ideaController.updateIdea);

module.exports = router;
