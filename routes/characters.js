const router = require('express').Router();

// Controller
const charactersController = require('../controllers/charactersController');

// Routes
router.get('/characters', charactersController.getCharactersList);
router.get('/characters/name=:order', charactersController.orderByName);
router.get('/characters/gender=:filter', charactersController.filterByGender);

module.exports = router;