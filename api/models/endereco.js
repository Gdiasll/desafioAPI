'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const endereco = sequelize.define('endereco', {
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
    }
  }, {});
  endereco.associate = function(models) {
    this.belongsTo(models.usuario);
  };
  return endereco;
};
