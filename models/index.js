
// Variables
const
    fs = require('fs'),
    path = require('path'),
    baseFileName = path.basename(__filename),
    db = {};


// Use filestream, read files in this folder, populate db variable with model.js files
fs
    .readdirSync(__dirname)
    .filter( file => {
        /**
         * We need to make sure the files we accept have these constraints:
         * 1. has a file extention
         * 2. isn't a .gitkeep, .env, ect
         * 3. is a .JS file.
         * 4. isn't this index file
         * 5. make sure that this doesn't pull from .test.js files
         */
        return (file.indexOf('.') !== 0) &&
            (file.indexOf('.') !== -1) &&
            (file !== baseFileName) &&
            (file.slice(-3) === '.js') &&
            (!file.match(/^.*\.test\.js$/i));
    })
    .forEach( modelFile => {
        // Get the full file path & get module.exports from it
        const filePath = path.join(__dirname, modelFile);
        const model = require(filePath);

        /**
         * Add model to our db const.
         * 
         * Import these models like:
         * const { carSchema, userSchema } = require('./models/')
         */
        db[modelFile.slice(0, modelFile.length - 3)] = model;
    });


module.exports = db;