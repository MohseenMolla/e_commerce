const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: String,
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: String,
    images: [String]
  },
  { timestamps: true }
);

productSchema.pre("save", function () {
  this.slug = slugify(this.title, { lower: true });
});

module.exports = mongoose.model("Product", productSchema);
