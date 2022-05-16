const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routerUser = require("./routes/user");
const { sequelize, User, Post } = require("./models");
const user = require("./models/user");
const cors = require("cors");
let corsOptions = {
  origin: process.env.API_URL,
};
const path = require("path");

const app = express();

// Importation des routes

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/post");
const commentsRoutes = require("./routes/comments");

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
app.use("/image", express.static(path.join(__dirname, "image")));

// Enregistrement des routes

app.use("/api/auth", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000 ");
  await sequelize.authenticate();
  console.log("Database connected!");
});

module.exports = app;
