var express = require("express");
const bodyParser = require("body-parser");
const dataresult = express.Router();

const {getstudent,poststudent,deletestudent,insertmarks,getsubject} = require('../controller/studentController');



  dataresult.route("/student").get(getstudent);
  dataresult.route("/student").post(poststudent);
  dataresult.route("/student/delete/:id").get(deletestudent);
  dataresult.route("/result").get(getsubject);
  dataresult.route("/result").post(insertmarks);


module.exports = dataresult;