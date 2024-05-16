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














SELECT COUNT(member_id) AS NO_OF_BOOKS_BORROWED,
CASE
WHEN
COUNT(member_id)<5
THEN
'OCCASIONAL BORROWERS'
WHEN
COUNT(member_id) 
BETWEEN 5 AND 10
THEN
'REGULAR BORROWERS'
WHEN
COUNT(member_id)>10
THEN
'FREQUENT BORROWER'
END AS BORROWED_BEHAVIOR
FROM bookborrows
GROUP BY member_id