const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const {mongoose} = require('./database');

// SETUP inicial
const app = express();
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/movies', require('./routes/movie.route'));
app.use('/', (req, res) => res.json({
    message: 'La API está en /api/v1/movies' }));

// Starting SERVER
app.listen(app.get('port'), () => {
    console.log('Listening on port: ' + app.get('port'));
})

