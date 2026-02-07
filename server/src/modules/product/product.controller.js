const Product = require("./product.model");
const asyncHandler = require("express-async-handler");

// CREATE
exports.create = asyncHandler(async (req, res) => {
  let images = [];

  if (req.files && req.files.length > 0) {
    images = req.files.map(file => file.path);
  }

  const product = await Product.create({
    ...req.body,
    images
  });

  res.status(201).json({
    success: true,
    product
  });
});



// READ (Pagination + Search)
exports.getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = req.query.search
    ? { title: { $regex: req.query.search, $options: "i" } }
    : {};

  const products = await Product.find(query)
    .skip(skip)
    .limit(limit);

  res.json({ success: true, page, products });
});

// UPDATE
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  Object.assign(product, req.body);
  await product.save();

  res.json({
    success: true,
    product
  });
});


// DELETE
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: "Product deleted"
  });
});

// GET SINGLE PRODUCT
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({ success: true, product });
});
