"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      comments: {
        type: [DataTypes.STRING],
        allowNull: true,
      },
      postid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "post",
          key: "id",
        },
      },
      username: {
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
    await queryInterface.dropTable("comments");
  },
};
