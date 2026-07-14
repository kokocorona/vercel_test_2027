const express = require("express");
const { TeamModel, validateTeam } = require("../models/teamModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    let data = await TeamModel.find({}).limit(20);
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
    let data = await TeamModel.findOne({_id:id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/", auth, async(req,res) => {
  let validBody = validateTeam(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let team = new TeamModel(req.body);
    // הוספנו לרשומה את האיי די של המשתמש בשביל תיעוד
    team.user_id = req.tokenData._id;
    await team.save();
    res.json(team)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.put("/:id", auth,async(req,res) => {
  let validBody = validateTeam(req.body);
  if(validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
   let id = req.params.id;
   let data = await TeamModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
  res.json(data)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.delete("/:id",auth, async(req,res) => {
  try {
    let id = req.params.id;
    // בדיקה אם המשתמש הוא אדמין כך שיוכל למחוק רשומות של כולם
    let data;
    if(req.tokenData.role == "admin"){
      data = await TeamModel.deleteOne({_id:id} );
    }
    else{
      data = await TeamModel.deleteOne({_id:id,user_id:req.tokenData._id} );
    }
    res.json(data)
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

module.exports = router;