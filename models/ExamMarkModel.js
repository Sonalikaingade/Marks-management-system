const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examMarkSchema = new Schema({
  FID: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  CCode: {
    type: String,
    required: true,
  },
  ISE: [
    { ExamNo: String, Name: String, CO1: Number, CO2: Number, CO3: Number },
  ],
  MSE: [
    { ExamNo: String, Name: String, CO1: Number, CO2: Number, CO3: Number },
  ],
  ESE: [
    { ExamNo: String, Name: String, CO1: Number, CO2: Number, CO3: Number },
  ],
});

const examMarkModel = mongoose.model("ExamMarks", examMarkSchema);

module.exports = examMarkModel;
