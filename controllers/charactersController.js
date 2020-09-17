const axios = require('axios');


// @route       GET /movies
// @desc        Get all Star Wars films
exports.getCharactersList = async (req, res) => {
    // Get all movies
    try {
        const people = await axios.get('https://swapi.dev/api/people');
        // console.log(movies.data.results);

        res.status(200).send({
            success: true,
            message: "All characters gotten successfully!",
            data: people.data.results
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

exports.orderByName = async (req, res) => {
    // Get all movies
    try {
        const people = await axios.get('https://swapi.dev/api/people');
     

        const { order } = req.params;

        // Init empty object
        let obj = {},
            characterCount = 0,
            totalHeight,
            datas = people.data.results;

        datas.forEach(data => characterCount++);

        totalHeight = datas.reduce((a, b) => {
            return Number(a) + Number(b.height);
        }, 0)

        // for (let height in datas) {
        //     if (datas.hasOwnProperty(height)) {
        //         totalHeight += parseFloat(datas[height].height);
        //         // console.log(datas[height].height)
        //     }
        // }

        if (order == "asc") {
            obj = datas.sort((a, b)=> {
                let nameA = a.name.toLowerCase(),
                    nameB = b.name.toLowerCase();

                if (nameA < nameB) 
                    return -1;
                

                if (nameA > nameB) 
                    return 1;
                

                return 0;
            });


            res.status(200).send({
                success: true,
                message: "All movies gotten successfully!",
                character_count: characterCount,
                total_height: totalHeight + " cm",
                total_height_feets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
                data: obj
            })
        } else if (order == "desc") {
            obj = datas.sort((a, b)=> {
                let nameA = a.name.toLowerCase(),
                    nameB = b.name.toLowerCase();

                if (nameA < nameB) 
                    return 1;
                

                if (nameA > nameB) 
                    return -1;
                

                return 0;
            });


            res.status(200).send({
                success: true,
                message: "All characters gotten successfully!",
                character_count: characterCount,
                total_height: totalHeight + " cm",
                total_height_feets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
                data: obj
            })
        }

        
    } catch (error) {
        // console.error(error);
        res.status(422).send({
            success: false,
            message: "Error getting movies!",
            error: error.message
        });
    }
}

exports.filterByGender = async (req, res) => {
    try {
        const people = await axios.get('https://swapi.dev/api/people');
     
        const { filter } = req.params;

        
        // Init empty object
        let obj = {},
            characterCount = 0,
            totalHeight,
            datas = people.data.results;

        if (filter == "m") {
            obj = datas.filter(data => data.gender === "male" ? true : false);

            obj.forEach(data => characterCount++);
            
            totalHeight = obj.reduce((a, b) => {
                return Number(a) + Number(b.height);
            }, 0);
        } else if (filter == "f") {
            obj = datas.filter(data => data.gender === "female" ? true : false);

            obj.forEach(data => characterCount++);
            
            totalHeight = obj.reduce((a, b) => {
                return Number(a) + Number(b.height);
            }, 0);
        } else {
            // Check and validate
            return res.status(404).send({
                success: false,
                message: "Wrong search query! Character not found!"
            });
        }

        res.status(200).send({
            success: true,
            message: "All characters gotten successfully!",
            character_count: characterCount,
            total_height: totalHeight + " cm",
            total_height_feets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
            data: obj
        });
    } catch (error) {
        res.status(422).send({
            success: false,
            message: "Error getting movies!",
            error: error.message
        });
    }
}