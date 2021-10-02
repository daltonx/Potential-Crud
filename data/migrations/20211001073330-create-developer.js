'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Developers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.CHAR
      },
      idade: {
        type: Sequelize.INTEGER
      },
      hobby: {
        type: Sequelize.STRING
      },
      datanascimento: {
        type: Sequelize.DATEONLY
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Developers');
  }
};