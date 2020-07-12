const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'banco';

var Banco = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  codigo:  {  
    type: Sequelize.STRING,
    allowNull: false,     
  },
  nome:  {  
    type: Sequelize.STRING(40),
    allowNull: false,     
  }
})

//Cliente.belongsTo(Estado);

module.exports = Banco
