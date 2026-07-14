const indexR = require("./index");
const usersR = require("./users");
const teamsR = require("./teams");
const foodsR = require("./foods");
const postsR = require("./posts");


exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/teams",teamsR);
  app.use("/foods",foodsR);
  app.use("/posts",postsR);

}