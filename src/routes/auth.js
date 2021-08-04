var router = require("express-promise-router")();

const  {authFormRequest} = require('../middlewares/form-request/auth');
const authController = require('../controllers/auth.controller');

/**
 * Login user
 * 
 * @route POST /auth/login/
 * @group Auth 
 * @param {email} email.body.required - email of the user
 * @param {string} password.body.required - password of the user
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', authFormRequest('loginUser'), authController.login);

/**
 * Create a new user 
 * 
 * @route POST /auth/signup/
 * @group Auth 
 * @param {USER.model} user.body.required - the new user
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', authFormRequest('createUser'), authController.signupUser);


module.exports = router;
