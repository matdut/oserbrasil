const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'ocorrencia';

var Ocorrencia = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  }, 
  faixa_inicial:  {  
    type: Sequelize.STRING(10) 
  },
  faixa_final:  {  
    type: Sequelize.STRING(10) 
  },
  valor_km:  {  
    type: Sequelize.DECIMAL(20,2)  
  },
  valor_tempo:  {  
    type: Sequelize.DECIMAL(20,2)  
  }  
})

//Cliente.belongsTo(Estado);

module.exports = Ocorrencia
