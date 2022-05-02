const express = require("express");
const routerPosts = express.Router();
const multer = require("../middlewares/multer-config");
const verifyToken = require("../middlewares/verifyToken");

const postsCtrl = require("../controllers/post");

routerPosts.get("/", verifyToken, postsCtrl.getAllElement);
routerPosts.get("/:id", verifyToken, postsCtrl.getJustOneElement);
routerPosts.post("/", verifyToken, multer, postsCtrl.addElement);
//routerPosts.put("/:id", verifyToken, multer, postsCtrl.updateElement);
//routerPosts.delete("/:id", verifyToken, postsCtrl.deleteElement);
//routerPosts.post("/:id/like", verifyToken, postsCtrl.likeElement);

// Exportation des routes

module.exports = routerPosts;
