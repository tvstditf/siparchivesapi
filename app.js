const config = require("./utils/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

//Route Imports
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const centreRoute = require("./routes/centre");
const traineeRoute = require("./routes/trainee");

//Database Connection
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful!!!!!!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

app.use("/images", express.static(path.join(__dirname, "public/image")));

//Middleware
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("common"));
app.use(cors());
app.use(express.static("build"));
app.disable("x-powered-by");

//Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/documents");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File Uploaded Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Route Handlers
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/centre", centreRoute);
app.use("/api/trainee", traineeRoute);

module.exports = app;
