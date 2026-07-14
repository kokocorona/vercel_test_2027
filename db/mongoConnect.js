const mongoose = require('mongoose');
// מאפשר לדבר עם משתני אינווירמנט
const dns = require("dns/promises")
require("dotenv").config()
main().catch(err => console.log(err));

async function main() {
  // console.log(process.env.TOKEN_SECRET)
  // יש לשנות את שם התקייה האחרונה לשם המסד נתונים
  // שלנו
  dns.setServers(['1.1.1.1'])
  await mongoose.connect(process.env.DB_CONNECT);
  // await mongoose.connect('mongodb://127.0.0.1:27017/arial_nov24');
  console.log("mongo connect ariel25_july atlas");
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}