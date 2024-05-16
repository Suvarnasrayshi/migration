var express =require("express");
const bodyParser = require("body-parser");
// const sequelize = require("./utils/database");
const dataresult = express.Router();
const{getuser,postuser,postbook,postbookborrow,postuser_borrow,postborrowbook,postdelay,postfavbook,mostbookuser,postquickread,posttypeofusers,postupdateuser}=require("../controller/user")

dataresult.route("/").get(getuser);
dataresult.route("/").post(postuser);
dataresult.route("/book").post(postbook);
dataresult.route("/borrow").post(postbookborrow);
dataresult.route("/user/borrow").get(postuser_borrow);
dataresult.route("/book/borrow").get(postborrowbook);
dataresult.route("/delay").get(postdelay)
dataresult.route("/favbook").get(postfavbook)
dataresult.route("/mostbookuser").get(mostbookuser);
dataresult.route("/quickread").get(postquickread);
dataresult.route("/typeofusers").get(posttypeofusers);
dataresult.route("/updateuser:id").post(postupdateuser);
module.exports = dataresult;

