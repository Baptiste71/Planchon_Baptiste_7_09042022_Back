const express = require("express");
const routerPosts = express.Router();
const multer = require("../middlewares/multer-config");
const verifyToken = require("../middlewares/verifyToken");

const postsCtrl = require("../controllers/post");

routerPosts.get("/", verifyToken, postsCtrl.getAllElement);
//routerPosts.get("/:id", verifyToken, postsCtrl.getJustOneElement);
routerPosts.get("/last", verifyToken, postsCtrl.getLastPost);
routerPosts.post("/", verifyToken, multer, postsCtrl.addElement);

// Exportation des routes

module.exports = routerPosts;
