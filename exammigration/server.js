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















exports.postbookborrow = async (req, res) => {
  console.log(req.body);
  const{book_id,member_id,borrow_date,return_date}=req.body
  // console.log(borrow_date);
  let datereturn=sequelize.literal('DATE_ADD(NOW(), INTERVAL 14 DAY)' )
  console.log("datareturn",datereturn);
  try {
    const newUser = await bookborrow.create(req.body);
    const newuser =await bookborrow.create(
      {
        book_id,
        member_id,
        borrow_date,
        return_date:sequelize.literal('DATE_ADD(NOW(), INTERVAL 14 DAY)' )
      },
      {raw: true}
      )

    res.json(newUser);
    console.log(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
