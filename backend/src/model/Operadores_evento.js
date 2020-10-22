const Sequelize = require('sequelize');
var sequelize = require('./database');
var Operador = require('./Operador');
var Evento = require('./Eventos');
var Status = require('./Status');

var nametable = 'operador_evento';

var Operador_evento = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false,
    autoIncrement:true
  },
  operadorId: {
    type: Sequelize.INTEGER,
    refences: {
      model: Operador,
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

Operador_evento.belongsTo(Operador);
Operador_evento.belongsTo(Evento);
Operador_evento.belongsTo(Status);

module.exports = Operador_evento
