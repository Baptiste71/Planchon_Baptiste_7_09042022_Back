# Planchon_Baptiste_7_09042022_Back

Backend du site Groupomania

## Introduction

Il s'agit de la version "serveur" de l'application Groupomania, j'ai utilisé Sequelize pour la mise en place de la base de données qui elle est en PostgreSQL. Dans cette version backend vous y trouverez: le parametrage des requêtes envoyer depuis la version front, un fichier .env.exemple où il vous sera necessaire d'entrer vos informations dedans, le guide se trouve ci-dessous, ainsi que le port sur lequel il s'execute.

## Fichier .env.exemple

Dans ce fichier vous y trouverez vos informations personnelles à ne pas dévoilées, ce fichier est présent pour la sécurité du site web. Je vous propose un exemple pour remplir le fichier .env.exemple:

1.DATABASE = exemple_db
2.DB_USERNAME = mon_exemple
3.PASSWORD = "Exemple@2022/" ///// Pour le mot de passe il vous faudra mettre des "" ci celui contient des caractères spéciaux !! ////
4.HOST = 127.0.0.1
5.PORT = 5000
6.ADMIN = "exemple@test.com" ///// Etant donner que l'adresse email étant une donnée unique il est impossible que plusieurs utilisateurs ont la même adresse. En revanche, il vous faudra remplir cette information avec des "" et surtout AVANT la création de votre compte administrateur depuis le front, cela est impératif pour que la base de données vous donne les droits d'admin. /////

## Lancer le serveur :

Pour démarrer le serveur il vous faudra taper la commande : nodemon app.js

## Profiter de l'application Groupomania

Une fois le fichier .env remplis et la commande nodemon app.js éxécutée, il ne vous reste plus qu'a profiter du site web et de gérer la modération comme demandé dans le cahier des charges. Néanmoins, n'hésitez pas à faire des retours du site positifs ou négatifs le but étant d'apprendre et surtout d'améliorer les petits défauts afin qu'il ne se reproduisent plus, chaque avis compte.

A bientôt sur Groupomania :)
