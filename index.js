require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const directOrderRoutes = require("./routes/directOrderRoutes");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/direct-orders", directOrderRoutes);

app.get("/", (req, res) => {
  res.send("Hi, This is Server!"); // Test route
});

// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server Running on port ${port}`);
  } else {
    console.log("Error:", error);
  }
});
