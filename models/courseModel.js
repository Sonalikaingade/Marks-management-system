const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  FID: {
    type: String,
    required: true,
  },
  CName: {
    type: String,
    required: true,
  },
  CCode: {
    type: String,
    required: true,
  },
  CYear: {
    type: String,
    required: true,
  },
});

const courseModel = mongoose.model("allCoursesList", courseSchema);

module.exports = courseModel;
