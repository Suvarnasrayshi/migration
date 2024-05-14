var express = require("express");
const bodyParser = require("body-parser");
const dataresult = express.Router();

const {getstudent,poststudent,deletestudent,insertmarks,getsubject,postsubject,getresult,showsubject} = require('../controller/studentController');



  dataresult.route("/student").get(getstudent);
  dataresult.route("/student").post(poststudent);
  dataresult.route("/student/delete/:id").get(deletestudent);
  dataresult.route("/marks").get(showsubject);
  dataresult.route("/marks").post(insertmarks);
  dataresult.route("/result/:id").get(getresult);
  dataresult.route("/subject").get(getsubject);
  dataresult.route("/subject").post(postsubject);

module.exports = dataresult;