require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const houseRoutes = require("./routes/houseRoutes");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/houses", houseRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Connect to MongoDB first, then start server
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log("MongoDB Connected");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

})
.catch(err => {
  console.log("MongoDB Connection Failed:", err.message);
});