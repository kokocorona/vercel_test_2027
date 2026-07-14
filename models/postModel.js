const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  title: String,
  info: String,
  user_id:String
})
exports.PostModel = mongoose.model("posts", schema)

exports.validatePost = (_reqBody) => {
  let joiSchema = Joi.object({
    title: Joi.string().min(2).max(200).required(),
    info: Joi.string().min(2).max(500).required(),
  })
  return joiSchema.validate(_reqBody)
}