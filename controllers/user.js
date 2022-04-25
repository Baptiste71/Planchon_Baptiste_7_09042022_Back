// Importation de bcrypt pour le hachage du mot de passe

const bcrypt = require("bcrypt");
const jsonWT = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require("express/lib/response");

const User = require("../models/user");

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

    return res.json(users);
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
    const userId = user[0].uuid;
    const firstname = user[0].firstname;
    const lastname = user[0].lastname;
    const email = user[0].email;
    const accessToken = jsonWT.sign({ userId, firstname, lastname, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jsonWT.sign({ userId, firstname, lastname, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }

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
};
