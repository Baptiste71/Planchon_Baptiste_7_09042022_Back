const { Post } = require("../models");

const fs = require("fs");

// apparition de tout les posts en cliquant sur "see all"

exports.getAllElement = async (req, res, next) => {
  Post.findAll({ order: [["updatedAt", "DESC"]] })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// apparition d'un post en particulier si cliquer par l'utilisateur

//exports.getJustOneElement = (req, res, next) => {
//  Post.findOne({ _id: req.params.id })
//    .then((posts) => res.status(200).json(posts))
//    .catch((error) => res.status(404).json({ error }));
//};

exports.getLastPost = (req, res, next) => {
  Post.findOne({ limit: 1, order: [["updatedAt", "DESC"]] })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// creation d'un post par l'utilisateur

exports.addElement = async (req, res) => {
  const image = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
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
  let postAuthor = "";

  try {
    let postdelete = await Post.findOne({
      where: {
        id: req.body.id,
      },
    })
      .then((post) => {
        postAuthor = post.userId;

        if (userId != postAuthor) {
          return res.status(401).json({ message: "requête non autorisée !" });
        }
      })
      .catch((error) => res.status(500).json({ error }));

    postdelete = await Post.findOne({
      where: {
        id: req.body.id,
      },
    });

    const filename = postdelete.image;
    fs.unlink(`image/${filename}`, () => {
      postdelete.destroy();
      return res.json({ message: "Post deleted!" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
