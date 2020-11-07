const Sequelize = require('sequelize');
var sequelize = require('./database');

var Perfil = require('./Perfil');
var Status = require('./Status');
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
  codigo: {
    type: Sequelize.INTEGER,
    allowNull: true,     
  },
  banco: {
    type: Sequelize.STRING(80),
    allowNull: false,    
  }, 
  agencia:  {  
    type: Sequelize.INTEGER,
    allowNull: false,     
  },
  conta:  {  
    type: Sequelize.STRING(40),
    allowNull: false,     
  },
  logid: {
    type: Sequelize.INTEGER,
    allowNull: false,     
  },
  perfilId:{
      type: Sequelize.INTEGER,
      // this is a refence to another model
      refences: {
        model: Perfil,
        key: 'id'
      } 
  },
  statusId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Status,
      key: 'id'
    } 
  }
})

//Cliente.belongsTo(Estado);

module.exports = Banco