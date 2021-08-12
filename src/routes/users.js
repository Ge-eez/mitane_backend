// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var router = require("express-promise-router")();
const userController = require('../controllers/user-controller');

router.get('/', userController.getUsers);

router.get('/id/:id', userController.getUserById);

//to be worked on
router.get('/role/:role', userController.getUserByRole);
router.get('/create', userController.createUser);
router.get('/update/:id', userController.updateUser);
router.get('/delete/:id', userController.deleteUser);

module.exports = router;

