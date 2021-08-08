var express = require('express');
var router = express.Router();

var IngredientsController = require('../controllers/ingredients_controller')

router.get('/', IngredientsController.getAll)
router.get('/:id', IngredientsController.getIngredientById)
router.post('/', IngredientsController.addIngredient)
router.put('/:id', IngredientsController.updateIngredient)
router.delete('/', IngredientsController.deleteIngredient)


module.exports = router;