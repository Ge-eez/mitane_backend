var router = require("express-promise-router")();
const machineryController = require('../controllers/machinery_controller');


/**
 * fetch all machinery
 * 
 * @route GET machinery/
 * @group /machinery/ 
 * @param {name} - name of a machinery
 * @returns {object} 200 - Machinery object
 * @returns {Error}  default - Unexpected error
 */
router.get('/', machineryController.getAll);

/**
 * fetch machinery by id
 * 
 * @route GET /machinery/:id
 * @group machinery 
 * @param {id} - ID of a machinery
 * @returns {object} 200 - Machinery object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', machineryController.getByID);

/**
 * create machinery
 * 
 * @route POST /
 * @group machinery 
 * @param {name} - name of machinery 
 * @returns {object} 200 - new Machinery object created
 * @returns {Error}  default - Unexpected error
 */
router.post('/', machineryController.createMachinery);

/**
 * Update Machinery
 * 
 * @route POST /
 * @group machinery 
 * @param {name} - name of machinery 
 * @returns {object} 200 - new Machinery object created
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', machineryController.updateMachinery);

/**
 * DELETE Machinery
 * 
 * @route DELETE /:id
 * @group machinery 
 * @param {id} - id of machinery to be deleted
 * @returns {object} 200 - Machinery object deleted
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id',machineryController.deleteMachinery)




module.exports = router;