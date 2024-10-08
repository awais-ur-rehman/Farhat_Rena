const mongoose = require("mongoose");

const bannerImageSchema = new mongoose.Schema({
  category: { type: String, required: true },
  base64: { type: String, required: true },
});

module.exports = mongoose.model("BannerImage", bannerImageSchema);
