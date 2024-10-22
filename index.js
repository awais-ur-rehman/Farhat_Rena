require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const directOrderRoutes = require("./routes/directOrderRoutes");
const bannerImmageRoutes = require("./routes/bannerImageRoutes");
const categoryImmageRoutes = require("./routes/categoryImageRoutes");
const sliderImmageRoutes = require("./routes/sliderImageRoutes");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/direct-orders", directOrderRoutes);
app.use("/api/bannerImage", bannerImmageRoutes);
app.use("/api/categoryImage", categoryImmageRoutes);
app.use("/api/sliderImage", sliderImmageRoutes);

app.get("/", (req, res) => {
  res.send("Hi, This is Server!");
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server Running on port ${port}`);
  } else {
    console.log("Error:", error);
  }
});
