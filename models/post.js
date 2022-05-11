"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      //userId
      this.belongsTo(User, { foreignKey: "userId" });
    }

    toJSON() {
      return { ...this.get() /*id: undefined, userId: undefined*/ };
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comments: {
        type: DataTypes.STRING,
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
      likes: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      dislikes: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      usersliked: {
        type: [DataTypes.STRING],
        allowNull: true,
      },
      usersdisliked: {
        type: [DataTypes.STRING],
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "post",
      modelName: "Post",
    }
  );
  return Post;
};
