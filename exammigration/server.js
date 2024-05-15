// Importing the database model
const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
// const { DataTypes, Model } = require('sequelize');
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const userbook=require("../models/userbook")
const book = require("../models/book");
const bookborrow = require("../models/bookborrow");

app.use(bodyParser.urlencoded({ extended: true }));

exports.getuser=async(req,res)=>{
  res.render('user');
}


exports.postuser = async(req,res)=>{
  const{firstName,lastName,email,joinDate}=req.body;
  console.log(req.body);
;
  const user=userbook.create({
    firstName,
    lastName,
    email,
    joinDate,
    })

   res.json({user});
}

app.use("/", router);


/home/suvarna-sinha/Documents/orm/bookmigration/controller/user.js:25
  const user=userbook.create({
                      ^

TypeError: userbook.create is not a function