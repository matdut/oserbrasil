const Sequelize = require('sequelize');
var sequelize = require('./database');
//var Cliente = require('./Cliente');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'tipo_evento';

var Tipo_evento = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  descricao:  {  
    type: Sequelize.STRING(250)  
  }
},
{
  // remove  createdAt y updated
  timestamps:false
})

//Cartao.belongsTo(Cliente);
//Cliente.belongsTo(Estado);

module.exports = Tipo_evento
