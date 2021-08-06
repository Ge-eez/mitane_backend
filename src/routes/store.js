var router = require("express-promise-router")();
const storeController = require('../controllers/store-controller');

router.get('/', storeController.getAll);
router.get('/:id', storeController.getByID);
router.post('/', storeController.createStore);
// router.put('/:id', storeController.updateStore);
// router.delete('/:id', storeController.deleteStore);

// router.get('/:machinery_id', storeController.getByMachineryId);
// router.get('/:product_id', storeController.getByProductId);
// router.get('/:ingridient_id', storeController.getByIngridientId);
// router.get('/:user_id', storeControlelr.getByUserId);
// router.get('/:keyword', storeController.getByKeyword);

// router.post('/add_item', storeController.addItem);
// router.post('/delete_item', storeController.deleteItem);

// router.put('/adjust_item', storeController.adjustItem);

// router.delete('/clear_store', storeController.clearStore);



module.exports = router;