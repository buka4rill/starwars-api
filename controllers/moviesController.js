const axios = require('axios');
const uuid = require('uuid');

// @route       GET /movies
// @desc        Get all Star Wars films
exports.getAllMovies = async (req, res) => {
    // Get all movies
    try {
        const movies = await axios.get('https://swapi.dev/api/films/');
        // console.log(movies.data.results);

        res.status(200).send({
            success: true,
            message: "All movies gotten successfully!",
            data: movies.data.results
        })
    } catch (error) {
        // console.error(error);
        res.status(422).send({
            success: false,
            message: "Error getting movies!",
            error: error.message
        })
    }
}

// @route       GET /movies/titles
// @desc        Get all Star Wars film titles
exports.getAllMovieLists = async (req, res) => {
    // Get all titles
    try {
        const titles = await axios.get('https://swapi.dev/api/films/');

        // Init empty object
        let obj = {};

        // Loop through API results
        let datas = titles.data.results;
        obj = datas.map(data => {
            return {
                ID: uuid.v4(),
                title: data.title, 
                opening_crawl: data.opening_crawl, 
                release_date: data.release_date
            };  
        });

        // Return Payload
        res.status(200).send({
            success: true,
            message: "All movies gotten successfully!",
            data: obj
        });
    } catch (error) {
        res.status(422).send({
            success: false,
            message: "Error getting movies!",
            error: error.message
        })
    }
}