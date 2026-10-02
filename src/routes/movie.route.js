const express = require('express');
const movieCtrl = require('../controllers/movie.controller');
const router = express.Router();

router.post('/', movieCtrl.addMovie);
router.get('/', movieCtrl.getMovies);
router.get('/movie/:id', movieCtrl.getMovie);
router.put('/:id', movieCtrl.updateMovie);
router.delete('/delete/:id', movieCtrl.deleteMovie);
router.get('/genres', movieCtrl.getGenres);
router.get('/byTitle/:title', movieCtrl.getMoviesByTitle);

module.exports = router;
