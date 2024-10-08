const express = require("express");
const BannerImage = require("../models/BannerImage");
const router = express.Router();

// Save image to DB
router.post("/api/images", async (req, res) => {
  try {
    const { base64, category } = req.body;
    if (!base64 || !category) {
      return res
        .status(400)
        .json({ message: "Image URL and category are required." });
    }

    const newImage = new BannerImage({ base64, category });
    await newImage.save();

    res
      .status(201)
      .json({ message: "Image saved successfully.", image: newImage });
  } catch (error) {
    res.status(500).json({ message: "Error saving image.", error });
  }
});

// Fetch all images
router.get("/api/images", async (req, res) => {
  try {
    const images = await BannerImage.find({});
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ message: "Error fetching images.", error });
  }
});

// Fetch images by category
router.get("/api/images/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const images = await BannerImage.find({ category });

    if (!images.length) {
      return res
        .status(404)
        .json({ message: "No images found for this category." });
    }

    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ message: "Error fetching images.", error });
  }
});

module.exports = router;
