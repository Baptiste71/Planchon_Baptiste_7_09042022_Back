const multer = require("multer");

// Création d'un dictionnaire

const dictionnary_MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// création d'un nom de fichier unique

const storage = multer.diskStorage({
  destination: (req, image, callback) => {
    callback(null, "image");
  },
  filename: (req, image, callback) => {
    // Suppression de l'extension du fichier original
    const imageName = image.originalname.split(".")[0];
    // Suppression des espaces dans le nom orginal remplacer par des '_'
    const name = imageName.split(" ").join("_");
    // Création de Date now() + extension
    const extension = dictionnary_MIME_TYPES[image.mimetype.toLowerCase()];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exportation du middleware multer configuré

module.exports = multer({ storage }).single("image");
