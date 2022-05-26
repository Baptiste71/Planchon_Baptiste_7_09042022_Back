const { Comments, Post } = require("../models");

// Ajout d'un commentaire

exports.addComment = async (req, res) => {
  let comment = req.body.comment;
  let userId = req.auth.userId;
  let postId = req.body.postId;
  let userName = req.auth.userName[0];
  const commentOfPost = "";

  try {
    let cmt = await Comments.create({
      postid: postId,
      comments: comment,
      username: userName,
      userId: userId,
    });

    let post = await Post.findAll();
    let allComments = await Comments.findAll();

    for (let posts of post) {
      if (posts.id === postId) {
        commentOfPost === allComments.comments;
      }
    }

    cmt = await Post.update(
      {
        comments: `{${commentOfPost}}`,
      },
      {
        where: {
          id: postId,
        },
      }
    );

    return res.status(201).json(cmt);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.allCommentsOfThePost = async (req, res) => {
  try {
    await Comments.findAll({
      where: {
        postid: req.body.id,
      },
    })

      .then((comment) => res.status(200).json(comment))
      .catch((error) => res.status(404).json({ error }));
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.deleteComments = async (req, res) => {
  let userId = req.auth.userId;
  let admin = Boolean;
  if (req.auth.email === process.env.ADMIN) {
    admin = true;
  } else {
    admin = false;
  }
  let commentAuthor = "";

  try {
    let userComment = await Comments.findOne({
      where: {
        id: req.body.id,
      },
    }).then((comment) => {
      commentAuthor = comment.userId;
      let author = Boolean;
      if (userId === commentAuthor) {
        author = true;
      } else {
        author = false;
      }

      if (admin || author) {
        return comment;
      } else {
        return res.status(401).json({ message: "requête non autorisée !" });
      }
    });
    await userComment.destroy();
    return res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};
