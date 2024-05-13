const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Sequelize = require("sequelize");
const { DataTypes, Model } = require('sequelize');;
const sequelize = require("../utils/database");
// import { student,subject,exam } from '../models'
const { student,subject,exam } = require("../models");




exports.getpage = async (req, res) => {
  res.render('index');
};

exports.getstudent = async (req, res) => {
  try {
    res.render('student');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
exports.poststudent = async (req, res) => {
  try {
    // res.render('student');
    const{fname,lname,email,city}=req.body;
    console.log(city);
    const studentdetail = await student.create({ 
      firstName:fname,
      lastName: lname,
      email,
      city,
     });

// console.log(studentdetail);
 const studentdata = await student.findAll();
res.render('displaystudent', { studentdata });
   // res.json([users])
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


exports.deletestudent = async (req, res) => {
  try {
    id=req.params.id;
    await student.destroy({
      where: {
        id: id,
      },
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  
  const studentdata = await student.findAll();
  res.render('displaystudent', { studentdata });
}

exports.getsubject = async (req,res)=>{
  try {
    const subjects = await subject.findAll();
    let id=req.query.id;
   // console.log(id);
    res.render('markdetail', { subjects,id});
} catch (error) {
    console.error(error);
    res.status(500).send('Error fetching subjects');
}
}


exports.insertmarks = async (req,res)=>{
    try {
     console.log(req.body);
       const{id,ai,c,dbms,web,ds}=req.body;
    const subjects =['ai', 'c', 'dbms', 'web', 'ds'];
    console.log("subjectdata",subjects);
   // for(const name of subjects){
      const subjectdata = await subject.findAll(
      
        { raw: true,
          where:
          {name:subjects}
        });
        for(const subjectdatadetail of subjectdata){
        console.log("subjectdata",subjectdatadetail);
        console.log("drggggggggggggrdfgfgfg",req.body[subject.name.toLowerCase()]);
      await exam.create({
        studentid:id,
        subjectid:subjectdatadetail.id,
        marks:req.body[subject.name]
      })
    }
// }
     }
    catch (error) {
      console.error(error);
    }
    
    const studentdata = await student.findAll();
    res.send("hello")
   // res.render('markdetail');
  }
