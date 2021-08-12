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

router.get('/filter/:name', userController.filterUsers);

router.get('/filter/:phone_no', userController.filterUsers);

//to be worked on; returns with empty roles
router.get('/role/:role', userController.getUserByRole);

router.post('/create', userController.createUser);

router.put('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

module.exports = router;

