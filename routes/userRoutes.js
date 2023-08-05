const userControllers = require("./../controllers/userControllers");
const loginControllers = require("./../controllers/loginControllers");
const multer = require("multer");
const express = require("express");

const Router = express.Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

//Home page routing
Router.route("/home").get(
  loginControllers.protect,
  userControllers.getUserHomePage
);
Router.route("/addcourse")
  .get(loginControllers.protect, userControllers.getAddCoursePage)
  .post(userControllers.postAddCourse);
Router.route("/upload")
  .get(loginControllers.protect, userControllers.getUploadPage)
  .post();

Router.route("/addfile")
  .get(loginControllers.protect, userControllers.addFilePage)
  .post(upload.array("SemExam"), userControllers.saveExamMarks);

module.exports = Router;
