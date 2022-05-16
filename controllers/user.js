// Importation de bcrypt pour le hachage du mot de passe

const bcrypt = require("bcrypt");
const jsonWT = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require("express/lib/response");

const { User } = require("../models");

// Enregistrment de nouveaux utilisateurs

exports.register = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const users = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPassword,
    });
    const userId = users.dataValues.id;
    const accessToken = jsonWT.sign({ userId, firstname, lastname, email }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });
    res.status(201).json({ users, accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Connection des utilisateurs existants

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const firstname = user[0].firstname;
    const lastname = user[0].lastname;
    const email = user[0].email;
    const accessToken = jsonWT.sign({ userId, firstname, lastname, email }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
// modification des données utilisateur

exports.updatePassword = async (req, res, next) => {
  const newPassword = req.body.newpassword;
  const confirmNewPassword = req.body.confirmpassword;
  if (newPassword === confirmNewPassword) {
    const password = req.body.newpassword;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const userDb = await User.findAll({
        where: {
          email: req.auth.email,
        },
      });

      const match = await bcrypt.compare(hashPassword, userDb[0].password);
      if (match) return res.status(400).json({ msg: "The new password can't be the same than the older!!" });
      userDb[0].password = null;
      userDb[0].password = hashPassword;
      const sqlUpdate = `UPDATE user SET "password" = ${hashPassword};`;
      return res.json(sqlUpdate);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong!" });
    }
  } else {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

// Suppression d'un utilisateur

exports.userDelete = async (req, res, next) => {
  //const uuid = req.params.uuid;
  try {
    const userDb = await User.findOne({
      where: {
        email: req.auth.email,
      },
    });

    await userDb.destroy();

    return res.json(userDb, { message: "User deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
