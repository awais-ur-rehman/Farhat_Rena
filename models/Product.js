const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  tagline: { type: String },
  description: { type: String },
  sizes: { type: [String] },
  fabrics: { type: [String] },
  tags: { type: [String] },
  combinations: {
    type: [{ sizes: [String], fabrics: [String], price: Number }],
  },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", productSchema);
