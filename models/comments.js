"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(Post) {
      // define association here
    }
  }
  Comments.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      comments: {
        type: [DataTypes.STRING],
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentscounter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comments",
    }
  );
  return Comments;
};