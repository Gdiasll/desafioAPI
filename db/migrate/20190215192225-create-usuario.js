'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING    
      },
      data_nascimento: {
        allowNull: false,
        type: Sequelize.DATE   
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};
