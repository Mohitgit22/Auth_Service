'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        // the email send by the user should be valid email, format should be a regular expression it shouls follws
        //sequelize gives us custom validations
        // link: https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
        validate :{
          isEmail: true,
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 100]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};