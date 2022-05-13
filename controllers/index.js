/**
 * This file will be really similiar to models/index.js
 * Same functionality, but for our controllers.
 */
const
    fs = require('fs'),
    path = require('path'),
    baseFileName = path.basename(__filename),
    controllers = {};

// Read files in dir
fs
    .readdirSync(__dirname)
    .filter( file => {
        /**
         * Filter found files, we need to make sure our controller files:
         * - have an extention, and aren't a .git / .env file
         * - are .js files
         * - aren't test files
         */
        return (![0, -1].includes(file.indexOf('.'))) &&
            (file !== baseFileName) &&
            (file.slice(-3) === '.js') &&
            (!file.match(/^.*\.test\.js$/i))
    })
    .forEach( controllerFile => {
        // Get file path, read exports
        const filePath = path.join(__dirname, controllerFile);
        const router = require(filePath);
        /**
         * EXAMPLE: If we have a userController.js file, we can import it like:
         * const { userController } = require('./controllers/');
         */
        controllers[ controllerFile.slice(0, controllerFile.length - 3) ] = router;
    });

module.exports = controllers;