"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("post", {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comments: {
        type: [DataTypes.STRING],
        allowNull: true,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("post");
  },
};
