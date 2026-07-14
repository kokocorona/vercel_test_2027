const express = require("express");
const { FoodModel } = require("../models/foodModel");
const router = express.Router();


router.get("/",async(req,res) => {
  // כמה רשומות להציג פר בקשה
  const limit = 10;
  // כמה רשומות לדלג
  const skip = req.query.skip || 0;
  // לפי איזה מאפיין למיין
  const sort = req.query.sort || "_id";
  // אם יהיה מהקטן לגדול או מהגדול לקטן מבחינת מיון
  const reverse = req.query.reverse == "yes" ? 1 : -1;
  const category_id = req.query.category_id
  const searchQ = req.query.s;

// משתנה שיכיל את הפילטור בפיינד
  const findFilter = {}
  // אם נשלח קטגוריה איי די יוציא מאכלים רק של קטגוריה מסויימת
  if(category_id){
    findFilter.category_id = category_id
  }
  if(searchQ){
    // הופכים לביטוי ריגולרי ככה ניתן לחפש רק חלק
    // i - מבטל את הקייס סינסטיב של אותיות קטנות/גדולות
    const searchExp = new RegExp(searchQ ,"i")
    // findFilter.name = searchExp
    // יחפש את הביטוי בשם או בקטגוריה
    findFilter.$or = [{name:searchExp},{category_id:searchExp}]
  }
  
  try {
    const data = await FoodModel
    .find(findFilter)
    .limit(limit)
    .skip(skip)
    // [sort] - ייקח את הערך של הסורט ולא ישתמש בו בתור מאפיין
    // 1 or -1 = אחד אומר מהקטן לגדול, ומינוס אחד ההפך
    .sort({[sort]:reverse})
    res.json(data)
  } 
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})

router.get("/count", async(req,res) => {
  try{
    const limit = req.query.limit || 10
    // ישלוף את מספר הפריטים במסד
    const count = await FoodModel.countDocuments({})
    res.json({count,pages:Math.ceil(count/limit)})
  }
  catch(err) {
    console.log(err);
    res.status(502).json( {err})
  }
})



module.exports = router