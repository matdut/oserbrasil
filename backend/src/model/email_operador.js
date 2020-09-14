const Sequelize = require('sequelize');
var sequelize = require('./database');
var Empresa = require('./Empresa');
var Status = require('./Status');
var Evento = require('./Eventos');

var nametable = 'email_operador';

var Email_operador = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false,
    autoIncrement:true
  },
  email: {
    type: Sequelize.STRING(120),
    allowNull: true,
  },
  empresaId: {
    type: Sequelize.INTEGER,
    allowNull: true,
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
  },
  gerenciar_eventos:{
    type: Sequelize.BOOLEAN,
  },
  gerenciar_todos_eventos:{
    type: Sequelize.BOOLEAN,
  },
  incluir_cartao:{
    type: Sequelize.BOOLEAN,
  },
  visualizar_eventos:{
    type: Sequelize.BOOLEAN,
  },
  efetuar_pagamentos:{
    type: Sequelize.BOOLEAN,
  },
  incluir_outors_operadores:{
    type: Sequelize.BOOLEAN,
  }
},
{
  // remove  createdAt y updated
  timestamps:false
})

//Email_operador.belongsTo(Empresa);
Email_operador.belongsTo(Status);
Email_operador.belongsTo(Evento);

module.exports = Email_operador
