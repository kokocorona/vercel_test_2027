const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  cals: Number,
  price: Number,
  img_url: String,
  category_id: String,
})
exports.FoodModel = mongoose.model("foods", schema)

exports.validateFood = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(400).required(),
    cals: Joi.number().min(1).max(9999).required(),
    price: Joi.number().min(1).max(9999).required(),
    img_url: Joi.string().min(2).max(400).required(),
    category_id: Joi.string().min(2).max(400).required(),
  })
  return joiSchema.validate(_reqBody)
}