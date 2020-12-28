const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'taxas'; // nombre de la tabla

var Taxas = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  descricao:  {
    type: Sequelize.STRING(255),       
  }, 
  percentual:  {  
    type: Sequelize.DECIMAL(20,2) 
  },
})

module.exports = Taxas
