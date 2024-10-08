const mongoose = require("mongoose");

const sliderImagesSchema = new mongoose.Schema({
  base64: { type: String, required: true },
});

module.exports = mongoose.model("SliderImages", sliderImagesSchema);
