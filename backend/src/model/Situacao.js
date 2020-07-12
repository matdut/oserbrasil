const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'situacaos'; // nombre de la tabla

var Situacao = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  nome:  {
    type: Sequelize.STRING,
       
  }
},
{
  // remove  createdAt y updated
  timestamps:false
});

module.exports = Situacao
