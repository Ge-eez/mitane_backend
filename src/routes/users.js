// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var router = require("express-promise-router")();
const userController = require('../controllers/user-controller');

router.get('/', userController.getUsers);

module.exports = router;

