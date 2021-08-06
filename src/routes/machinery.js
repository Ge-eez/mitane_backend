var router = require("express-promise-router")();
const machineryController = require('../controllers/machinery_controller');

router.get('/', machineryController.getAll);

router.get('/:id', machineryController.getByID);

//router.get('/:keyword', machineryController.getByKeyword);

//router.post('/', machineryController.createMachinery);

//router.put('/:id', machineryController.updateMachinery);

//router.delete('/:id',machineryController.deleteMachinery)




module.exports = router;