const mongoose = require("mongoose");

const categoryImageSchema = new mongoose.Schema({
  category: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("CategoryImage", categoryImageSchema);
