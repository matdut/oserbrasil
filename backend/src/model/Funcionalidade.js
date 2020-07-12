const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'funcionalidade';

var Funcionalidade = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  descricao:  {  
    type: Sequelize.STRING,
    allowNull: false,     
  },
  modulo:  {  
    type: Sequelize.INTEGER,
    allowNull: false,     
  }
})

//Cliente.belongsTo(Estado);

module.exports = Funcionalidade
