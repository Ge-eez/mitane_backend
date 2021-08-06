var router = require("express-promise-router")();
const machineryController = require('../controllers/machinery_controller');

router.get('/', machineryController.getAll);

router.get


module.exports = router;