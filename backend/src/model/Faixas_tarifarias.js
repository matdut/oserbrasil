const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Matriz = require('./Matriz_tarifaria');
var nametable = 'faixa_tarifarias';

var Faixa_tarifarias = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  }, 
  matrizId: {
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Matriz,
      key: 'id'
    } 
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

//Faixa_tarifarias.belongsTo(Matriz);

module.exports = Faixa_tarifarias
