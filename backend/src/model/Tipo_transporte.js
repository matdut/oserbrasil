const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
//var Matriz = require('./Matriz_tarifaria');
var nametable = 'tipo_transporte';

var Transporte = sequelize.define(nametable,{
 
  id: {
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true 
  },
  descricao:  {  
    type: Sequelize.STRING(200),
    allowNull: false,     
  }
},
{
  // remove  createdAt y updated
  timestamps:false
});

//Transporte.belongsTo(Matriz);
/*
Transporte.belongsTo(Matriz, {
  foreignKey: 'id'
});
*/
module.exports = Transporte
