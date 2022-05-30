("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comments }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userId", as: "post", onDelete: "CASCADE", hooks: true });
      this.hasMany(Comments, { foreignKey: "userId", as: "comment", onDelete: "CASCADE", hooks: true });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: " User must have a firstname" },
          notEmpty: { msg: " Firstname must not be empty" },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: " User must have a lastname" },
          notEmpty: { msg: " Lastname must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: " User must have a email" },
          notEmpty: { msg: " Email must not be empty" },
          isEmail: { msg: " Must be a valid email adress" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: " User must have a password" },
          notEmpty: { msg: " Password must not be empty" },
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user",
      modelName: "User",
    }
  );
  return User;
};
