const { Post } = require("../models");

const fs = require("fs");

// apparition de tout les posts en cliquant sur "see all"

exports.getAllElement = async (req, res, next) => {
  Post.findAll()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// apparition d'un post en particulier si cliquer par l'utilisateur

exports.getJustOneElement = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

exports.getLastPost = (req, res, next) => {
  Post.findOne({ limit: 1, order: [["index", "DESC"]] })
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

//// Modifier un post
//
//exports.updateElement = (req, res, next) => {
//  Post.findOne({ _id: req.params.id }).then((posts) => {
//    if (posts.userId !== req.auth.userId) {
//      return res.status(401).json({ message: "Requête non autorisée !" });
//    }
//    const filename = posts.imageUrl.split("/image/")[1];
//    fs.unlink(`image/${filename}`, () => {});
//  });
//  const postObject = req.file
//    ? {
//        ...JSON.parse(req.body.post),
//        imageUrl: `${req.protocol}://${req.get("host")}/image/${req.file.filename}`,
//      }
//    : { ...req.body };
//
//  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
//    .then(() => res.status(200).json({ message: "Post modifié !" }))
//    .catch((error) => res.status(400).json({ error }));
//};
//
//// Supprimer un post
//
//exports.deleteElement = (req, res, next) => {
//  Post.findOne({ _id: req.params.id })
//    .then((posts) => {
//      if (posts.userId !== req.auth.userId) {
//        return res.status(401).json({ message: "requête non autorisée !" });
//      }
//      const filename = posts.imageUrl.split("/image/")[1];
//      fs.unlink(`image/${filename}`, () => {
//        Post.deleteOne({ _id: req.params.id })
//          .then(() => res.status(200).json({ message: "Post supprimé !" }))
//          .catch((error) => res.status(400).json({ error }));
//      });
//    })
//    .catch((error) => res.status(500).json({ error }));
//};

// Liker/Disliker un post

exports.likeElement = (req, res, next) => {
  const posts = req.body[0];
  const user = req.auth.userId;
  const likes = req.body[1];
  const dislikes = req.body[2];

  switch (likes) {
    case 1:
      // Dans le cas d'un like +1
      Post.updateOne(
        { id: posts },
        {
          $inc: { like: 1 },
          $push: { usersliked: user },
        }
      )
        .then(() => res.status(200).json({ message: "J'aime ce post !" }))
        .catch((error) => res.status(400).json({ error }));
      break;

    case -1:
      // Dans le cas d'un Dislike +1
      Post.updateOne(
        { _id: posts },
        {
          $inc: { dislike: 1 },
          $push: { usersdisliked: user },
        }
      )
        .then(() => res.status(200).json({ message: "J'aime pas ce post !" }))
        .catch((error) => res.status(400).json({ error }));

      break;

    case 0:
      // Dans le cas d'un like neutre = 0 (pas de vote) ou d'une remise à zero si on enleve le dislike
      Post.findOne({ _id: posts })
        .then((post) => {
          if (post.usersliked.includes(user)) {
            Post.updateOne(
              { _id: posts },
              {
                $inc: { like: -1 },
                $pull: { usersliked: user },
              }
            )
              .then(() => res.status(200).json({ message: "Je suis neutre !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          if (post.usersdisliked.includes(user)) {
            Post.updateOne(
              { _id: posts },
              {
                $inc: { dislike: -1 },
                $pull: { usersdisliked: user },
              }
            )
              .then(() => res.status(200).json({ message: "Je suis neutre !" }))
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;
  }
};
