const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
// const multer = require("multer");

app.use(express.json());
app.set("view engine", "ejs");
app.set(path.join(__dirname, "public"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

app.use("/", loginRoutes);
app.use("/loginUser", userRoutes);

module.exports = app;
