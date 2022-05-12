const express = require("express");
const routerComment = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const multer = require("../middlewares/multer-config");

const commentCtrl = require("../controllers/comments");

routerComment.post("/:id/comment", verifyToken, multer, commentCtrl.addComment);

// Exportation des routes

module.exports = routerComment;