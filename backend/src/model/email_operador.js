const Sequelize = require('sequelize');
var sequelize = require('./database');
var Empresa = require('./Empresa');
var Status = require('./Status');
var Evento = require('./Eventos');
var Perfil = require('./Perfil');

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
  statusId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Status,
      key: 'id'
    } 
  },
  perfilId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  gerenciar_eventos:{
    type: Sequelize.BOOLEAN,
  },
  monitorar_eventos:{
    type: Sequelize.BOOLEAN,
  },
  representante_legal:{
    type: Sequelize.BOOLEAN,
  },
},
{
  // remove  createdAt y updated
  timestamps:false
})

//Email_operador.belongsTo(Empresa);
Email_operador.belongsTo(Status);
Email_operador.belongsTo(Evento);
Email_operador.belongsTo(Perfil);

module.exports = Email_operador
