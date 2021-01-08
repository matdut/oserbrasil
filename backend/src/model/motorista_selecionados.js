const Sequelize = require('sequelize');
var sequelize = require('./database');
var Perfil = require('./Perfil');

var nametable = 'motorista_selecionados'; // nombre de la tabla

var Motorista_selecionados = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  motoristaId:  {
    type: Sequelize.STRING,       
  },
  chave_acesso:  {
    type: Sequelize.STRING,       
  }
},
{
  // remove  createdAt y updated
  timestamps:false
});

module.exports = Motorista_selecionados
