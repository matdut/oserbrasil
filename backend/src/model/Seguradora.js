const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'seguradoras';

var Seguradora = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },  
  nome:  {  
    type: Sequelize.STRING(60),
    allowNull: false,     
  }
})



module.exports = Seguradora
