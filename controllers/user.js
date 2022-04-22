// Importation de bcrypt pour le hachage du mot de passe

const bcrypt = require("bcrypt");
const jsonWT = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require("express/lib/response");

const User = require("../models/user");

// Enregistrment de nouveaux utilisateurs

exports.register = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const users = await User.create({ firstname, lastname, email, password });

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Connection des utilisateurs existants

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: " Utilisateur non trouvé!" });
      }

      // Comparaison de notre mot de passe avec celui enregistré

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user.uuid,
            token: jsonWT.sign({ userId: user.uuid }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// modification des données utilisateur

exports.userUpdate = async (req, res, next) => {
  const uuid = req.params.uuid;
  const { firstname, lastname, email, password } = req.body;
  try {
    const userDb = await User.findOne({
      where: { uuid },
    });

    userDb.firstname = firstname;
    userDb.lastname = lastname;
    userDb.email = email;
    userDb.password = password;

    await userDb.save();

    return res.json(userDb);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

// Suppression d'un utilisateur

exports.userDelete = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const userDb = await User.findOne({
      where: { uuid },
    });

    await userDb.destroy();

    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
