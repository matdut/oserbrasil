const Sequelize = require('sequelize');
var sequelize = require('./database');
var Evento = require('./Eventos');
var Motorista = require('./Motorista');
var Status = require('./Status');

var nametable = 'email_operador';

var Motorista_evento = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false,
    autoIncrement:true
  },
  motoristaId: {
    type: Sequelize.INTEGER,
    refences: {
      model: Motorista,
      key: 'id'
    }   
  },
  eventoId: {
    type: Sequelize.INTEGER,
    refences: {
      model: Evento,
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
},
{
  // remove  createdAt y updated
  timestamps:false
})

Motorista_evento.belongsTo(Evento);
Motorista_evento.belongsTo(Motorista);
Motorista_evento.belongsTo(Status);

module.exports = Email_operador
