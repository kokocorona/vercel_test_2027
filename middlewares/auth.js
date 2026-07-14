const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.auth = (req,res,next) => {
  // לבדוק אם טוקן בכלל נשלח
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need to send token to be here"})
  }
  try{
    // בודק אם הטוקן וליד מול המילה הסודית ושהוא בתוקף
    // אם לא יילך לקצ' ויציד את האירור שלו
    const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET)
    // req.tokenData - מאפיין שיהיה קיים גם בפונקציה הבאה בשרשור בפרמטר ריק
    req.tokenData = decodeToken
      // לעבור לפונקציה הבאה בשרשור אם הכל תקין
    next()
  }
  catch(err){
    res.status(401).json({err:"token not valid or expired"})
  }

}

exports.authAdmin = (req,res,next) => {
  // לבדוק אם טוקן בכלל נשלח
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need to send token to be here"})
  }
  try{
    // בודק אם הטוקן וליד מול המילה הסודית ושהוא בתוקף
    // אם לא יילך לקצ' ויציד את האירור שלו
    const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET)
    // בודק אם הרול של המשתמש הוא לא אדמין
    if(decodeToken.role != "admin"){
      return res.status(401).json({err:"You must be admin user to be here"})
    }

    // req.tokenData - מאפיין שיהיה קיים גם בפונקציה הבאה בשרשור בפרמטר ריק
    req.tokenData = decodeToken
      // לעבור לפונקציה הבאה בשרשור אם הכל תקין
    next()
  }
  catch(err){
    res.status(401).json({err:"token not valid or expired"})
  }

}
