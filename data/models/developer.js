'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {};
  Developer.init({
    nome: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    idade: DataTypes.INTEGER,
    hobby: DataTypes.STRING,
    datanascimento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Developer',
    timestamps: false
  });
  return Developer;
};