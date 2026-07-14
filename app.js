// ייבוא של אקספרס
const express = require("express")
const path = require("path");
// ספריית שיודעת להפעיל שרת
const http = require("http");
const cors = require("cors");
require("./db/mongoConnect")

const {routesInit} = require("./routes/configRoutes")


// לייצר משתנה שיכיל את האקספרס ויוכל להוסיף הגדרות
const app = express();
// שיהיה אפשר לעשות בקשות מדפדפן מכל דומיין לדומיין של השרת שלנו
app.use(cors());

// מאפשר לשלוח באדי מצד לקוח
app.use(express.json());

// הגדרת תקיית פאבליק כציבורית
app.use(express.static(path.join(__dirname,"public")));

// הגדרת ראוטים לאפלקציית אקפרס שלנו
routesInit(app)

// מייצרים שרת וויב שמקבל את היכולות של האקספרס עם כל ההגדרות
const server = http.createServer(app);
// מפעילים את השרת ומאזינים לו בפורט 3001
const port = process.env.PORT || 3001
server.listen(port)