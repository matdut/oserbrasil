const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
//var Matriz = require('./Matriz_tarifaria');
var nametable = 'lista_banco';

var Agencia = sequelize.define(nametable,{
   
  codigo: {
    type: Sequelize.INTEGER,
    allowNull: false,     
  },
  descricao:  {  
    type: Sequelize.STRING(100),
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
module.exports = Agencia
