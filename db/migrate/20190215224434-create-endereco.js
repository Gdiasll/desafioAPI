'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('enderecos', {
    id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rua: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    numero: {
        allowNull: true,
        type: Sequelize.INTEGER    
    },
    complemento: {
        allowNull: true,
        type: Sequelize.STRING
    },
    bairro: {
        allowNull: false,
        type: Sequelize.STRING    
    },
    usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'usuarios',
            key: 'id'        
        }
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('enderecos');
  }
};
