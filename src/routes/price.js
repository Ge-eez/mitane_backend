const express = require('express');
const router = express.Router();

const {
    getDailyPrice,
    createDailyPrice,
    updateDailyPrice,
    deleteDailyPrice,
    getDailyPriceById
} = require('../controllers/price');
const { update } = require('../models/price-model');

router.route('/')
    .get(getDailyPrice)
    .post(createDailyPrice);

router.route('/:id').get(getDailyPriceById);
    
router.route('/:productId')
    .put(updateDailyPrice)
    .delete(deleteDailyPrice);

module.exports = router;