const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const movies = require('./routes/movies');
const characters = require('./routes/characters')

// Connect to MYSQL DB
connectDB.connect((err) => {
    if (err) {
        return console.error(`Error: ${err.message}`);
    }

    console.log("Connected to MySQL Database!!!");
});

connectDB.end((err) => {
// The connection is terminated gracefully
// Ensures all remaining queries are executed
// Then sends a quit packet to the MySQL server.
});

// Init Express
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Routes Injection
app.use(movies);
app.use(characters)


// Port
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));