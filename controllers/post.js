const { Post } = require("../models");

const fs = require("fs");

// apparition de tout les posts en cliquant sur "see all"

exports.getAllElement = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

// apparition d'un post en particulier si cliquer par l'utilisateur

exports.getJustOneElement = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

// creation d'un post par l'utilisateur

exports.addElement = async (req, res) => {
  const postObject = JSON.parse(req.body.sauce);
  delete postObject._id;
  const addPost = new Post({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    message: "",
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersDisliked: [" "],
  });
  addPost
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Modifier un post

exports.updateElement = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((posts) => {
    if (posts.userId !== req.verifyToken.userId) {
      return res.status(401).json({ message: "Requête non autorisée !" });
    }
    const filename = posts.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {});
  });
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };

  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer un post

exports.deleteElement = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((posts) => {
      if (posts.userId !== req.verifyToken.userId) {
        return res.status(401).json({ message: "requête non autorisée !" });
      }
      const filename = posts.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Liker/Disliker un post

exports.likeElement = (req, res, next) => {
  const posts = req.params.id;
  const user = req.body.userId;
  const likes = req.body.like;

  switch (likes) {
    case 1:
      // Dans le cas d'un like +1
      Post.updateOne(
        { _id: posts },
        {
          $inc: { likes: 1 },
          $push: { usersLiked: user },
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
          $inc: { dislikes: 1 },
          $push: { usersDisliked: user },
        }
      )
        .then(() => res.status(200).json({ message: "J'aime pas ce post !" }))
        .catch((error) => res.status(400).json({ error }));

      break;

    case 0:
      // Dans le cas d'un like neutre = 0 (pas de vote) ou d'une remise à zero si on enleve le dislike
      Post.findOne({ _id: posts })
        .then((post) => {
          if (post.usersLiked.includes(user)) {
            Post.updateOne(
              { _id: posts },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: user },
              }
            )
              .then(() => res.status(200).json({ message: "Je suis neutre !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          if (post.usersDisliked.includes(user)) {
            Post.updateOne(
              { _id: posts },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: user },
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
