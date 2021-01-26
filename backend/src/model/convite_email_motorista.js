const Sequelize = require('sequelize');
var sequelize = require('./database');
var Empresa = require('./Empresa');
var Status = require('./Status');
var Evento = require('./Eventos');
var Perfil = require('./Perfil');

var nametable = 'convite_email_motorista';

var Convite_email_motorista = sequelize.define(nametable,{

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
 }
)

//Email_operador.belongsTo(Empresa);
Convite_email_motorista.belongsTo(Status);
Convite_email_motorista.belongsTo(Perfil);

module.exports = Convite_email_motorista
