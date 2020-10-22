const Sequelize = require('sequelize');
var sequelize = require('./database');
var Perfil = require('./Perfil');
var Status = require('./Status');
//var Cliente = require('./Cliente');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'cartao_credito';

var Cartao = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  numero:  {  
    type: Sequelize.STRING(25)
  },
  nome:  {  
    type: Sequelize.STRING(100)
  },
  data_vencimento:  {  
    type: Sequelize.DATE
  },
  codigo_seguranca:  {  
    type: Sequelize.INTEGER(4)
  },
  bandeira:  {  
    type: Sequelize.STRING(100)
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

//Cartao.belongsTo(Cliente);
//Cliente.belongsTo(Estado);

module.exports = Cartao
