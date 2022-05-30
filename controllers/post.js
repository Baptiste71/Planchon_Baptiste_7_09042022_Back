const { Post } = require("../models");

const fs = require("fs");

// apparition de tout les posts en cliquant sur "see all"

exports.getAllElement = async (req, res, next) => {
  Post.findAll({ order: [["updatedAt", "DESC"]] })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.getLastPost = (req, res, next) => {
  Post.findOne({ limit: 1, order: [["updatedAt", "DESC"]] })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// creation d'un post par l'utilisateur

exports.addElement = async (req, res) => {
  const image = req.file ? `${req.protocol}://${req.get("host")}/image/${req.file.filename}` : null;
  const userId = req.auth.userId;
  const userName = req.auth.userName[0];
  const message = req.body.message;

  try {
    const posts = await Post.create({
      message: message,
      image: image,
      userId: userId,
      username: userName,
      commentscounter: 0,
      comments: [" "],
      likes: 0,
      dislikes: 0,
      usersLiked: [" "],
      usersDisliked: [" "],
    });

    return res.status(201).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.deletePost = async (req, res) => {
  let userId = req.auth.userId;
  let admin = Boolean;
  if (req.auth.email === process.env.ADMIN) {
    admin = true;
  } else {
    admin = false;
  }
  let postAuthor = "";

  try {
    let userPost = await Post.findOne({
      where: {
        id: req.body.id,
      },
    }).then((post) => {
      postAuthor = post.userId;
      let author = Boolean;
      if (userId === postAuthor) {
        author = true;
      } else {
        author = false;
      }

      if (admin || author) {
        return post;
      } else {
        return res.status(401).json({ message: "requête non autorisée !" });
      }
    });

    await userPost.destroy();
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};
