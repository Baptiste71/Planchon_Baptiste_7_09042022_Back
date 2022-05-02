const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routerUser = require("./routes/user");
const { sequelize, User, Post } = require("./models");
const user = require("./models/user");
const cors = require("cors");
let corsOptions = {
  origin: "http://localhost:3000",
};
const path = require("path");

const app = express();

// Importation des routes

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/post");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania application." });
});
app.use(express.json());
app.use(routerUser);
app.use("/images", express.static(path.join(__dirname, "images")));

// Enregistrement des routes

app.use("/api/auth", userRoutes);
app.use("/api/posts", postsRoutes);

//app.post("/user", async (req, res) => {
//  const { firstname, lastname, email, password } = req.body;
//
//  try {
//    const users = await User.create({ firstname, lastname, email, password });
//
//    return res.json(users);
//  } catch (err) {
//    console.log(err);
//    return res.status(500).json(err);
//  }
//});
//
app.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});
//
//app.get("/user/:uuid", async (req, res) => {
//  const uuid = req.params.uuid;
//  try {
//    const userDb = await User.findOne({
//      where: { uuid },
//      include: "posts",
//    });
//
//    return res.json(userDb);
//  } catch (err) {
//    console.log(err);
//    return res.status(500).json({ error: "Something went wrong!" });
//  }
//});

//app.delete("/user/:uuid", async (req, res) => {
//  const uuid = req.params.uuid;
//  try {
//    const userDb = await User.findOne({
//      where: { uuid },
//    });
//
//    await userDb.destroy();
//
//    return res.json({ message: "User deleted!" });
//  } catch (err) {
//    console.log(err);
//    return res.status(500).json({ error: "Something went wrong!" });
//  }
//});
//
//app.put("/user/:uuid", async (req, res) => {
//  const uuid = req.params.uuid;
//  const { firstname, lastname, email, password } = req.body;
//  try {
//    const userDb = await User.findOne({
//      where: { uuid },
//    });
//
//    userDb.firstname = firstname;
//    userDb.lastname = lastname;
//    userDb.email = email;
//    userDb.password = password;
//
//    await userDb.save();
//
//    return res.json(userDb);
//  } catch (err) {
//    console.log(err);
//    return res.status(500).json({ error: "Something went wrong!" });
//  }
//});

//app.post("/posts", async (req, res) => {
//  const { userId, message } = req.body;
//
//  try {
//    const user = await User.findOne({
//      where: { id: userId },
//    });
//
//    const post = await Post.create({ message, userId: user.userId });
//
//    return res.json(post);
//  } catch (err) {
//    console.log(err);
//    return res.status(500).json(err);
//  }
//});

//app.get("/posts", async (req, res) => {
//  try {
//    const posts = await Post.findAll({ include: "user" });
//    return res.json(posts);
//  } catch (err) {
//    console.log(err);
//    return res.status(500).json(err);
//  }
//});

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000 ");
  await sequelize.authenticate();
  console.log("Database connected!");
});

module.exports = app;
