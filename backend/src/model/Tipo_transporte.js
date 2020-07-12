const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'tipo_transporte';

var Transporte = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  descricao:  {  
    type: Sequelize.STRING(200),
    allowNull: false,     
  }
})

//Cliente.belongsTo(Estado);

module.exports = Transporte
