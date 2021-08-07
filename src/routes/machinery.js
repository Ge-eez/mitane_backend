var router = require("express-promise-router")();
const machineryController = require('../controllers/machinery_controller');


/**
 * Login user
 * 
 * @route GET machinery/
 * @group /machinery/ 
 * @param {name} - name of a machinery
 * @returns {object} 200 - Machinery object
 * @returns {Error}  default - Unexpected error
 */
router.get('/', machineryController.getAll);

/**
 * Login user
 * 
 * @route GET /machinery/:id
 * @group machinery 
 * @param {id} - ID of a machinery
 * @returns {object} 200 - Machinery object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', machineryController.getByID);

router.post('/', machineryController.createMachinery);

router.put('/:id', machineryController.updateMachinery);

router.delete('/:id',machineryController.deleteMachinery)




module.exports = router;