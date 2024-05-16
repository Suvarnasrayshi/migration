const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const { book, userbook, bookborrow } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));

exports.getuser = async (req, res) => {
  res.render('user');
}

exports.postuser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
 let joindate=sequelize.literal('CURRENT_TIMESTAMP');
  console.log("joindate",joindate);
  try {
    const newUser = await userbook.create({
      firstName,
      lastName,
      email,
      joinDate:joindate
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.postbook = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await book.create(req.body);

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.postbookborrow = async (req, res) => {
  console.log(req.body);
  const{book_id,member_id,borrow_date,return_date}=req.body

  try {
 
    const newUser =await bookborrow.create({
      book_id,
      member_id,
      borrow_date,
      return_date:sequelize.literal('date_add (borrow_date, INTERVAL 14 DAY)' ),
    })

    res.json(newUser);
    console.log(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//list of books borrowed by a specific member
exports.postuser_borrow = async (req, res) => {
  try {
    const newUser = await userbook.findAll({
      attributes: ['firstname', 'lastname'],
      include:[{
        model:bookborrow,
        attributes:['borrow_date'],
        where:{member_id:2},
        include:[{
          model:book,
          attributes:['title','author']
        }]
      }]
    })   

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//Find members who borrowed a specific book
exports.postborrowbook = async(req,res)=>{
  try{

  const newUser=await bookborrow.findAll({
      attributes: ['borrow_date', 'return_date'],
      include: [
      {
      model: book,
      where: { id: 1 },
      attributes: ['title']
      },
      {
      model: userbook,
      attributes: ['firstName']
      }
      ]
      });

    res.json(newUser);
  } catch (error) {
    console.error(error);
   
  }
}

exports.postdelay=async(req,res)=>{
  try{
  const newUser =await bookborrow.findAll({
    attributes:['borrow_date','return_date'],
    include:[
      {
        model:userbook,
        attributes:['id','firstName']
      },{
        model:book,
        attributes:['title','author'],
      }
      
    ],
    where:sequelize.literal('TIMESTAMPDIFF(day, borrow_date, return_date) > 14')
  })
    res.json(newUser);
}catch(error){
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
}


exports.postfavbook=async(req,res)=>{
  try{
    const show= await book.findAll({
      attributes:['title','genre',[sequelize.fn('COUNT', sequelize.col('*')), 'total_borrow']],
      include:{
        model:bookborrow,
        required: true,
        attributes:[],
      },
      group:['title','genre','id'],
      order: [[sequelize.literal('total_borrow'), 'DESC']],
    })
    res.json([show]);
  }catch(error){
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.mostbookuser=async(req,res)=>{
  try{
        const showuser=await userbook.findAll({
          attributes: [
          'firstName',
          [sequelize.fn('COUNT', sequelize.col('bookborrows.id')), 'total']
          ],
          include: [{
          model: bookborrow,
          attributes: []
          }],
          group: ['userbook.firstName','userbook.id'],
          order: [[sequelize.literal('total'), 'DESC']]
          })
        res.json([showuser])
  }catch(error){
    res.status(500).json({error: 'Internal Server Error'});
  }
}

exports.postquickread=async(req,res)=>{
  try {
   const user=await userbook.findAll({
    attributes: [
    'firstName',
    [
    Sequelize.fn(
    'AVG',
    Sequelize.literal(
    'TIMESTAMPDIFF(DAY, bookborrows.borrow_date, bookborrows.return_date)'
    )
    ),
    'AVERAGE_RETURN_DURATION'
    ]
    ],
    include: [
    {
    model: bookborrow,

    required: true,
   
    }
    ],
    group: ['firstName','id','bookborrows.id'],
    having: Sequelize.literal(
    'AVG(TIMESTAMPDIFF(DAY, bookborrows.borrow_date, bookborrows.return_date))'
    )
    })
    res.json([user])
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
}
exports.posttypeofusers=async(req,res)=>{
  try {
    const borrowBehaviorQuery = await bookborrow.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('member_id')), 'NO_OF_BOOKS_BORROWED'],'member_id','book_id',
        [
          sequelize.literal(`CASE
            WHEN COUNT(member_id) < 5 THEN 'OCCASIONAL BORROWERS'
            WHEN COUNT(member_id) BETWEEN 5 AND 10 THEN 'REGULAR BORROWERS'
            WHEN COUNT(member_id) > 10 THEN 'FREQUENT BORROWER'
          END`),
          'BORROWED_BEHAVIOR'
        ]
      ],
      group: 'member_id',
      raw: true
    });
    res.json([borrowBehaviorQuery])
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
}
exports.postupdateuser=async(req,res)=>{
  try {
    console.log("ejfoerifgjrdoihfohrhgtficrhrfghiuhgtgtrhutfryh");
    id=req.params.id;
    console.log(id);
    const userupdate=await userbook.update({
      firstName,
      lastName,
      email,
      where:{
        id:id
      }
    })
  } catch (error) {
    res.status(500).json({error:" Internal Server Error"});
  }
}