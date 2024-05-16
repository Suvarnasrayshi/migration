// Importing the database model
const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const log= require("./router/router")
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/", router);
app.use("/",log);

sequelize.sync({force:false});
app.listen(process.env.port || 3003);
console.log("🚀 Running at Port 3003");
