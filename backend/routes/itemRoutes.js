const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route for searching items
router.get('/search', itemController.searchItems);
router.put('/:id', itemController.updateItems);
router.delete('/:id', itemController.deleteItems);

module.exports = router;
