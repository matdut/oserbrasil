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
    type: Sequelize.STRING(100),
    allowNull: true,     
  },
  banco: {
    type: Sequelize.STRING(100),
    allowNull: false,    
  }, 
  agencia:  {  
    type: Sequelize.STRING(6),
    allowNull: false,     
  }, 
  agencia_dv:  {  
    type: Sequelize.STRING(1),
    allowNull: true,     
  },
  conta:  {  
    type: Sequelize.STRING(12),
    allowNull: false,     
  }, 
  conta_dv:  {  
    type: Sequelize.STRING(1),
    allowNull: true,     
  },
  operacao:  {  
    type: Sequelize.STRING(3),
    allowNull: true,     
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