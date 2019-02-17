var Sequelize = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        onDelete: 'CASCADE'
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING    
    },
    data_nascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY  
    },
    cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    }
  }, {});
  usuario.associate = function(models) {
    this.hasMany(models.endereco);
  };
  return usuario;
};
