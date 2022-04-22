// Création du router utilisateurs

const express = require("express");
const routerUser = express.Router();
const userCrtl = require("../controllers/user");
const auth = require("../middlewares/auth");

// Création de la route Post pour "signup" Nouveau utilisateurs

routerUser.post("/register", userCrtl.register);

// Création de la route Post pour "login" Utilisateurs existants

routerUser.post("/login", userCrtl.login);

// Création de la route Put pour la modification de l'utlisateur

routerUser.put("/update", auth, userCrtl.userUpdate);

// Création de la route Put pour la modification de l'utlisateur

routerUser.delete("/delete", auth, userCrtl.userDelete);

// Exportation du router

module.exports = routerUser;
