// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * @typedef USER
 * @property {string} name.required - User's full name
 * @property {string} password.required - A strong password length of 3-30 consisting lowercase, uppercase, and numbers
 * @property {number} phone_no.required - User's phone number
 * @property {array} location.required - latitude, longitude
 */

var router = require("express-promise-router")();
const userController = require('../controllers/user-controller');

/**
 * Returns ALL Users
 * 
 * @route GET /users
 * @group User - Deals with all CRUD operations with user model
 * @param {string} sort.query - sort parament
 * @param {string} page.query - set the page number
 * @param {string} filter.query - set filter query 
 * @security JWT
 * @returns {object} 200 - Array of users
 * @returns {Error}  default - Unexpected error
 */
router.get('/', userController.getUsers);

router.get('/id/:id', userController.getUserById);

router.get('/filter/:name', userController.filterUsers);

router.get('/filter/:phone_no', userController.filterUsers);

//to be worked on; returns with empty roles
router.get('/role/:role', userController.getUserByRole);

router.post('/create', userController.createUser);

router.put('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

module.exports = router;

