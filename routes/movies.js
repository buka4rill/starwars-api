const router = require('express').Router();

// Controller
const moviesController = require('../controllers/moviesController');

// Routes
router.get('/movies', moviesController.getAllMovies);
router.get('/movies/lists', moviesController.getAllMovieLists);

module.exports = router;