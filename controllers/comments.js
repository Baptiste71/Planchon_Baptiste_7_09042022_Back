const { Comments } = require("../models/comments");

// Ajout d'un commentaire

exports.addComment = async (req, res) => {
  const comment = req.body.comment;
  const userId = req.auth.userId;
  const userName = req.auth.userName[0];

  try {
    const cmt = await Comments.create({
      commentscounter: +1,
      comments: comment,
      username: userName,
      userId: userId,
    });

    return res.status(201).json(cmt);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
