const express = require("express");
const SliderImage = require("../models/SliderImages");
const router = express.Router();

// Save image to DB
router.post("/api/images", async (req, res) => {
  try {
    const { base64 } = req.body;
    if (!base64) {
      return res
        .status(400)
        .json({ message: "Image URL and category are required." });
    }

    const newImage = new SliderImage({ base64 });
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
    const images = await SliderImage.find({});
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ message: "Error fetching images.", error });
  }
});

module.exports = router;
