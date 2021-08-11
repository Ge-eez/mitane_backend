var router = require("express-promise-router")();
const storeController = require('../controllers/store-controller');

// Pagination left
router.get('/', storeController.getAll);

// Done
router.get('/:id', storeController.getByID);
router.get('/user/:id', storeController.getByUserId);
router.post('/', storeController.createStore);
router.post('/add_product', storeController.addItemToStore);
router.post('/add_machinery', storeController.addItemToStore);
router.put('/:id', storeController.updateStore);
router.post('/delete_item', storeController.deleteItem);


// Todo
// router.get('/:machinery_id', storeController.getByMachineryId);
// router.get('/:product_id', storeController.getByProductId);
// router.get('/:ingridient_id', storeController.getByIngridientId);
// router.get('/:keyword', storeController.getByKeyword);


// Testing remains
router.post('/add_ingridient', storeController.addItemToStore);
// router.delete('/clear_store', storeController.clearStore);
// router.delete('/:id', storeController.deleteStore);

module.exports = router;