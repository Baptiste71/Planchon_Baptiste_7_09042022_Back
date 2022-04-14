"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "user",
      [
        {
          firstname: "John",
          lastname: "Doe",
          email: "johndoe@test.com",
          password: "johndoe",
          uuid: "5c65df69-0f55-46b6-9edb-144a16327b7e",
          createdAt: "2022-04-13T16:26:39.946Z",
          updatedAt: "2022-04-13T16:26:39.946Z",
        },
        {
          firstname: "Bob",
          lastname: "Doe",
          email: "bobdoe@test.com",
          password: "bobdoe",
          uuid: "5c65df69-0f55-46b6-9edb-144a16327b7e",
          createdAt: "2022-04-13T16:26:39.946Z",
          updatedAt: "2022-04-13T16:26:39.946Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("user", null, {});
  },
};
