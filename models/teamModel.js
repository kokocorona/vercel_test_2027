const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  wins: Number,
  loses: Number,
  next_game: String,
  category: String,
  user_id:String
},{timestamps:true})
exports.TeamModel = mongoose.model("teams", schema)

exports.validateTeam = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    wins: Joi.number().min(0).max(999).required(),
    loses: Joi.number().min(0).max(999).required(),
    next_game: Joi.string().min(2).max(400).allow(null, ""),
    category: Joi.string().min(2).max(400).required(),
  })
  return joiSchema.validate(_reqBody)
}