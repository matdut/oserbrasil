const Sequelize = require('sequelize');
var sequelize = require('./database');
//var Motorista = require('./Motorista');

var nametable = 'Foto_motorista'; // nombre de la tabla

var Foto_motoristat = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:  {
    type: Sequelize.STRING,
  },
  size:  {
    type: Sequelize.STRING,
  },
  key:  {
    type: Sequelize.STRING,
  },
  mimetype:  {
    type: Sequelize.STRING,
  },
  url:  {
    type: Sequelize.STRING,
  },
  motoristaId:  {
    type: Sequelize.INTEGER     
  }    
});

module.exports = Foto_motoristat;
