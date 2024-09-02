const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const CategoryImage = require("../models/CategoryImage");
const SliderImages = require("../models/SliderImages");
const BannerImage = require("../models/BannerImage");

const router = express.Router();

// Multer configuration for category images
const categoryImageStorage = multer.diskStorage({
  destination: "./upload/category-images",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.category}_${Date.now()}${ext}`);
  },
});
const uploadCategoryImages = multer({ storage: categoryImageStorage });

// Multer configuration for slider images
const sliderImageStorage = multer.diskStorage({
  destination: "./upload/slider-images",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${Date.now()}${ext}`);
  },
});
const uploadSliderImages = multer({
  storage: sliderImageStorage,
  limits: { files: 5 },
}).array("images", 5);

// Multer configuration for banner images
const bannerImageStorage = multer.diskStorage({
  destination: "./upload/banner-images",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.category}_${Date.now()}${ext}`);
  },
});
const uploadBannerImages = multer({ storage: bannerImageStorage });

// Serve uploaded images statically
router.use("/images", express.static("upload/images"));
router.use("/category-images", express.static("upload/category-images"));
router.use("/slider-images", express.static("upload/slider-images"));
router.use("/banner-images", express.static("upload/banner-images"));

// Route to handle image upload for a category
router.post(
  "/uploadcategoryimage/:category",
  uploadCategoryImages.single("image"),
  async (req, res) => {
    const category = req.params.category;
    const imageUrl = `http://localhost:4000/category-images/${req.file.filename}`;

    try {
      await CategoryImage.findOneAndDelete({ category });

      const newImage = new CategoryImage({ category, url: imageUrl });
      await newImage.save();

      res.json({ success: true, message: "Image uploaded successfully" });
    } catch (error) {
      console.error("Error uploading category image:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to upload image" });
    }
  }
);

// Route to fetch category images
router.get("/getcategoryimages", async (req, res) => {
  try {
    const images = await CategoryImage.find();
    const imageMap = images.reduce((acc, img) => {
      acc[img.category] = img.url;
      return acc;
    }, {});
    res.json({ images: imageMap });
  } catch (error) {
    console.error("Error fetching category images:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

// Route to handle image uploads for slider
router.post("/uploadsliderimages", uploadSliderImages, async (req, res) => {
  try {
    const sliderImageUrls = req.files.map(
      (file) => `http://localhost:4000/slider-images/${file.filename}`
    );
    await SliderImages.insertMany(sliderImageUrls.map((url) => ({ url })));
    res.json({ success: true, sliderImageUrls });
  } catch (error) {
    console.error("Error uploading slider images:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to upload slider images" });
  }
});

// Route to fetch slider images
router.get("/getsliderimages", async (req, res) => {
  try {
    const sliderImages = await SliderImages.find();
    res.json({ sliderImages: sliderImages.map((image) => image.url) });
  } catch (error) {
    console.error("Error fetching slider images:", error);
    res.status(500).json({ message: "Failed to fetch slider images" });
  }
});

// Route to delete slider images
router.delete("/deletesliderimage", async (req, res) => {
  const { imageUrl } = req.body;

  try {
    await SliderImages.deleteOne({ url: imageUrl });

    const filePath = path.join(
      __dirname,
      "../upload/slider-images",
      path.basename(imageUrl)
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to delete image file" });
      }
      res.json({ success: true, message: "Image deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting slider image:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete image from database",
      });
  }
});

// Route to handle banner image upload
router.post(
  "/uploadbannerimage/:category",
  uploadBannerImages.single("image"),
  async (req, res) => {
    const category = req.params.category;
    const imageUrl = `http://localhost:4000/banner-images/${req.file.filename}`;

    try {
      await BannerImage.findOneAndDelete({ category });

      const newBanner = new BannerImage({ category, url: imageUrl });
      await newBanner.save();

      res.json({
        success: true,
        message: "Banner image uploaded successfully",
        imageUrl,
      });
    } catch (error) {
      console.error("Error uploading banner image:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to upload banner image" });
    }
  }
);

// Route to fetch banner images
router.get("/getbannerimages", async (req, res) => {
  try {
    const banners = await BannerImage.find();
    const bannerMap = banners.reduce((acc, banner) => {
      acc[banner.category] = banner.url;
      return acc;
    }, {});
    res.json({ images: bannerMap });
  } catch (error) {
    console.error("Error fetching banner images:", error);
    res.status(500).json({ message: "Failed to fetch banner images" });
  }
});

module.exports = router;
