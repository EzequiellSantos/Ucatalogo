const express = require('express');
const {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts
} = require('../controllers/productsController');

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.post('/seed', seedProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
