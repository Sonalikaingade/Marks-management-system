const facultyModel = require("../models/facultyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const courseModel = require("../models/courseModel");
const examMarkModel = require("../models/ExamMarkModel");
const multer = require("multer");
const path = require("path");
const XLSX = require("xlsx");
const csv = require("csvtojson");
const { convertFile } = require("xlsx-to-csv");
const csvjson = require("csvjson");
const fs = require("fs");

//changes required
exports.getUserHomePage = (req, res) => {
  res.render("home");
};
//

exports.getAddCoursePage = (req, res) => {
  res.render("addCourse");
};

exports.getUploadPage = (req, res) => {
  res.render("upload");
};

exports.addFilePage = (req, res) => {
  res.render("addFilePage");
};

exports.postAddCourse = async (req, res) => {
  let userToken = req.cookies.jwt;
  const secret = "my-secret-string-used-in-formation-of-token";
  let decodedToken = jwt.verify(userToken, secret);

  const userId = decodedToken.id;
  const user = await facultyModel.findById({ _id: userId });
  const { CName, CCode, CYear } = req.body;
  const FID = user.FID;
  const courseDataSave = await courseModel
    .create({ FID, CName, CCode, CYear })
    .then((result) => {
      res.status(201).redirect("/loginUser/addcourse");
    });
};

const exceltoJson = (File1) => {
  const { filePath } = convertFile(File1);
  let csvData = fs.readFileSync(filePath, { encoding: "utf8" });
  csvData = csvData.split("\n");
  let dummy = [{}];
  let flag = 0;
  csvData.forEach((element) => {
    if (flag === 1) {
      let ele = element.split(";");
      //console.log(ele);
      const obj = new Object();
      obj.ExamNo = ele[1];
      obj.Name = ele[2];
      obj.CO1 = ele[3];
      obj.CO2 = ele[4];
      obj.CO3 = ele[5];
      dummy.push(obj);
    } else {
      flag = 1;
    }
  });

  let ISE = [{}];
  for (let i = 1; i < dummy.length - 1; i++) {
    ISE.push(dummy[i]);
  }

  ISE.reverse();
  ISE.pop();
  ISE.reverse();

  return ISE;
};

exports.saveExamMarks = async (req, res) => {
  let userToken = req.cookies.jwt;
  const secret = "my-secret-string-used-in-formation-of-token";
  let decodedToken = jwt.verify(userToken, secret);

  const id = decodedToken.id;
  const user = await facultyModel.find({ id }).then(async (result) => {
    const FID = result[0].FID;
    let File1 = req.files[0].path;
    let MSE, ESE, ISE;

    ISE = exceltoJson(File1);
    File1 = req.files[1].path;
    MSE = exceltoJson(File1);
    File1 = req.files[2].path;
    ESE = exceltoJson(File1);

    const { year, sem, CCode } = req.body;
    const faculty = await examMarkModel.find({ CCode });

    if (!faculty) {
      const saveMark = await examMarkModel
        .create({
          FID,
          year,
          sem,
          CCode,
          ISE,
          MSE,
          ESE,
        })
        .then((result) => {
          console.log("Done");
          res.redirect("/loginUser/addfile");
        });
    } else {
      const updatedMarks = await examMarkModel
        .findOneAndUpdate({ CCode }, { $set: { year, sem, ISE, MSE, ESE } })
        .then(() => {
          console.log("updated");
          res.redirect("/loginUser/addfile");
        });
      // console.log(faculty);
    }
  });
};
