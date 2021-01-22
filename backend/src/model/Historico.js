const Sequelize = require('sequelize');
var sequelize = require('./database');

var Perfil = require('./Perfil');
var Status = require('./Status');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'historico';

var Banco = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },  
  eventoId:{
    type: Sequelize.INTEGER,    
    refences: {
      model: Eventos,
      key: 'id'
    } 
  },
  tipoEventoId: {
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Tipo_evento,
      key: 'id'
    } 
  },  
  servicoId:  {  
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Servicos,
      key: 'id'
    } 
  },  
  motoristaId:  {  
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Motorista,
      key: 'id'
    } 
  },
  motivo: {
    type: Sequelize.STRING(100),
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