const Product = require('../models/Product');
const { canDeleteFromCloudinary, deleteCloudinaryImage } = require('../services/cloudinary');

const normalizePayload = (payload = {}) => ({
  name: String(payload.name || '').trim(),
  category: String(payload.category || '').trim(),
  price: Number(payload.price || 0),
  description: String(payload.description || '').trim(),
  image: String(payload.image || '').trim(),
  imageAlt: String(payload.imageAlt || payload.name || '').trim(),
  legacyId: Number.isFinite(Number(payload.legacyId)) ? Number(payload.legacyId) : null,
  public_id: String(payload.public_id || '').trim()
});

const validateRequiredFields = (payload) => {
  if (!payload.name || !payload.category || !payload.description || !payload.image) {
    return 'name, category, description and image are required.';
  }

  return null;
};

const listProducts = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: 1, _id: 1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const payload = normalizePayload(req.body);
    const validationError = validateRequiredFields(payload);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const lastLegacyProduct = await Product.findOne({
      legacyId: { $type: 'number' }
    })
      .sort({ legacyId: -1, createdAt: -1, _id: -1 })
      .select({ legacyId: 1 });

    payload.legacyId = (lastLegacyProduct?.legacyId ?? 0) + 1;

    const product = await Product.create(payload);
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const payload = normalizePayload(req.body);
    const validationError = validateRequiredFields(payload);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    if (product.public_id) {
      if (!canDeleteFromCloudinary()) {
        return res.status(500).json({
          message: 'Cloudinary credentials are not configured for deleting product images.'
        });
      }

      try {
        const cloudinaryResult = await deleteCloudinaryImage(product.public_id);

        if (!cloudinaryResult.skipped && cloudinaryResult.result !== 'ok' && cloudinaryResult.result !== 'not found') {
          return res.status(502).json({ message: 'Failed to delete product image from Cloudinary.' });
        }
      } catch (error) {
        return next(error);
      }
    }

    await product.deleteOne();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const seedProducts = async (req, res, next) => {
  try {
    const products = Array.isArray(req.body?.products) ? req.body.products : [];

    if (products.length === 0) {
      return res.status(400).json({ message: 'products array is required.' });
    }

    const existingCount = await Product.countDocuments();

    if (existingCount > 0) {
      const existingProducts = await Product.find().sort({ createdAt: 1, _id: 1 });
      return res.status(200).json({ seeded: false, products: existingProducts });
    }

    const normalizedProducts = products.map(normalizePayload);
    const invalidProduct = normalizedProducts.find(validateRequiredFields);

    if (invalidProduct) {
      return res.status(400).json({ message: 'Every seeded product must contain name, category, description and image.' });
    }

    const insertedProducts = await Product.insertMany(normalizedProducts);
    return res.status(201).json({ seeded: true, products: insertedProducts });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts
};
