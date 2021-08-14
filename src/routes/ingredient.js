var express = require('express');
var router = express.Router();
const  {itemsRequest} = require('../middlewares/user-request/items');

var IngredientsController = require('../controllers/ingredients-controller')
/**
 * @typedef Ingredient
 * @property {string} name.required - Ingredient name
 * @property {string} category.required - Category id
 */

/**
 * fetch all ingredients
 * 
 * @route GET ingredient/
 * @group Ingredient
 * @security JWT
 * @param {name} - name of a ingredient
 * @returns {object} 200 - Ingredient object
 * @returns {Error}  default - Unexpected error
 */
router.get('/', IngredientsController.getAll)

/**
 * get an ingredient
 * 
 * @route GET ingredient/{id}
 * @group Ingredient
 * @security JWT
 * @param {id} - id of a ingredient
 * @returns {object} 200 - Ingredient object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', IngredientsController.getIngredientById)

/**
 * fetch all ingredient
 * 
 * @route Post ingredient/
 * @group Ingredient
 * @security JWT
 * @param {name} - name of a ingredient
 * @returns {object} 200 - Ingredient object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', itemsRequest('addIngredient'), IngredientsController.addIngredient)

/**
 * update an ingredient
 * 
 * @route Put ingredient/{id}
 * @group Ingredient
 * @security JWT
 * @param {id} - id of a ingredient
 * @returns {object} 200 - Ingredient object
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', itemsRequest('updateIngredient'), IngredientsController.updateIngredient)

/**
 * delete an ingredient
 * 
 * @route Delete ingredient/{id}
 * @group Ingredient
 * @security JWT
 * @param {id} - id of a ingredient
 * @returns {object} 200 - Ingredient object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', IngredientsController.deleteIngredient)


module.exports = router;