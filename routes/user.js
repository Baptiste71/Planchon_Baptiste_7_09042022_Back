// Création du router utilisateurs

const express = require("express");
const routerUser = express.Router();
const userCrtl = require("../controllers/user");
const verifyToken = require("../middlewares/verifyToken");

// Création de la route Post pour "signup" Nouveau utilisateurs

routerUser.post("/user", userCrtl.register);

// Création de la route Post pour "login" Utilisateurs existants

routerUser.post("/login", userCrtl.login);

// Création de la route Put pour la modification de l'utlisateur

routerUser.put("/update", verifyToken, userCrtl.updatePassword);

// Création de la route Delete pour la suppression de l'utlisateur

routerUser.delete("/delete", verifyToken, userCrtl.userDelete);

// Exportation du router

module.exports = routerUser;
