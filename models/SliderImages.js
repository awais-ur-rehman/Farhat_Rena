const mongoose = require("mongoose");

const sliderImagesSchema = new mongoose.Schema({
  url: { type: String, required: true },
});

module.exports = mongoose.model("SliderImages", sliderImagesSchema);
