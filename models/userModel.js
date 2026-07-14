// user model
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config()



const schema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  // role - תפקיד של משתמש
  // admin or user יכול להיות
  role:{
    type:String, default:"user"
  }
},{timestamps:true})

exports.UserModel = mongoose.model("users",schema);

// יצירת טוקן עם איי די של משתמש עם תוקף ל 10 שעות
// role - התפקיד של המשתמש אם הוא אדמין או משתמש רגיל
exports.createToken = (user_id,role) => {
  // const token = jwt.sign({_id:user_id},"monkeysSecret",{expiresIn:"600mins"})
  const token = jwt.sign({_id:user_id,role},process.env.TOKEN_SECRET,{expiresIn:"600mins"})
  return token;
}

exports.userValid = (_reqbody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(100).required(),
    email:Joi.string().min(2).max(100).email().required(),
    password:Joi.string().min(3).max(100).required(),
  })
  return joiSchema.validate(_reqbody);
}

exports.loginValid = (_reqbody) => {
  const joiSchema = Joi.object({
    email:Joi.string().min(2).max(100).email().required(),
    password:Joi.string().min(3).max(100).required(),
  })
  return joiSchema.validate(_reqbody);
}