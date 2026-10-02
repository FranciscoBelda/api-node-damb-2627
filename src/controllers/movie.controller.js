const Movie = require('../models/movie.model');

const movieCtrl = {};

// AÑADIR UNA PELÍCULA
movieCtrl.addMovie = async (req, res) => {
    const myMovie = new Movie(req.body);
    await myMovie.save()
        // SI TO DO VA BIEN
        .then(() => {
            res.status(201).json({
                status: true,
                message: 'Movie created'
            })
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

// VER TODAS LAS PELÍCULAS
movieCtrl.getMovies = async (req, res) => {
    const movies = await Movie.find()
        // SI VA BIEN
        .then(data => {
            res.status(200).json({
                status: true,
                movies: data
            })
        })
        // SI NO VA BIEN
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

movieCtrl.getMovie = async (req, res) => {
    Movie.findById(req.params.id)
        // SI VA BIEN
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    movie: data
                })
            }else res.status(404).json({
                status: false,
                message: 'Movie Not Found'
            })
        })
        // SI VA MAL
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}


movieCtrl.updateMovie = async (req, res) => {
    const movie = req.body;
    Movie.findByIdAndUpdate(
        req.params.id,
        {$set: movie},
        {new: true}
    )
    // SI VA BIEN
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    message: 'Movie updated',
                    movie: data
                })
            }else res.status(404).json({
                status: false,
                message: 'Movie Not Found'
            })
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

movieCtrl.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    message: 'Movie deleted',
                    movieDeleted: data
                })
            }else{
                res.status(404).json({
                    status: false,
                    message: 'Movie Not Found'
                })
            }
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

movieCtrl.getGenres = async (req, res) => {
    await Movie.find().distinct('genres')
    .then(data => {
        res.status(200).json({
            status: true,
            genres: data
        })
    })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

movieCtrl.getMoviesByTitle = async (req, res) => {
    const regex = new RegExp(req.params.title, 'i');
    await Movie.find({title: {$regex:req.params.title}})
        .then(data => {
            res.status(200).json({
                status: true,
                movies: data
            })
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

module.exports = movieCtrl;