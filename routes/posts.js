const express = require("express");
const { PostModel, validatePost } = require("../models/postModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    const skip = req.query.skip || 0;
    let data = await PostModel
    .find({}).limit(20).skip(skip).sort({_id:-1});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.get("/single/:id", async(req,res) => {
  try{
    const id = req.params.id
    let data = await PostModel.findOne({_id:id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/", async(req,res) => {
  let validBody = validatePost(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let post = new PostModel(req.body);
    await post.save();
    res.json(post)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

// לבדיקה בשבילנו בצד לקוח לאזור שצריך טוקן כדי להמשיך
router.post("/auth", auth, async(req,res) => {
  let validBody = validatePost(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let post = new PostModel(req.body);
    post.user_id = req.tokenData._id
    await post.save();
    res.json(post)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.put("/:id", async(req,res) => {
  let validBody = validatePost(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
   let id = req.params.id;
   let data = await PostModel.updateOne({_id:id},req.body);
  res.json(data)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.delete("/:id", async(req,res) => {
  try {
    let id = req.params.id;
    let data = await PostModel.deleteOne({_id:id} );
    res.json(data)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

module.exports = router;