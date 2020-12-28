const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'descontos'; // nombre de la tabla

var Descontos = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  }, 
  qtd_servico_inicial: {  
    type: Sequelize.INTEGER(10) 
  },
  qtd_servico_final: {  
    type: Sequelize.INTEGER(10) 
  }, 
  percentual: {  
    type: Sequelize.DECIMAL(20,2) 
  },
})

module.exports = Descontos
