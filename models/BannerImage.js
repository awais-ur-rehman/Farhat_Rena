const mongoose = require("mongoose");

const bannerImageSchema = new mongoose.Schema({
  category: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("BannerImage", bannerImageSchema);
