const Sequelize = require('sequelize');
var sequelize = require('./database');
var Perfil = require('./Perfil');
var Status = require('./Status');

//var perfil = require('./Tipo_transporte');
//var Translados = require('./Translado_evento');
//var Cliente = require('./Cliente');
//var Operador = require('./Operador');
//var eventos = require('./');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'eventos';

var Eventos = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false,
    autoIncrement:true
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
  ordem_servico:  {  
    type: Sequelize.STRING(30),
    allowNull: false,     
  },
  nome_evento:  {  
    type: Sequelize.STRING(100),
    allowNull: false,     
  },
  data_evento: {
    type: Sequelize.DATEONLY,
    allowNull: false,     
  },
  valor_total: {
    type: Sequelize.DECIMAL(20,2),  
    allowNull: true,     
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

Eventos.belongsTo(Perfil);
Eventos.belongsTo(Status);

//Eventos.hasMany(Tipo_transporte, {foreignKey: 'id'})
//Tipo_transporte.belongsTo(Eventos, {foreignKey: 'id'})

//Eventos.hasMany(Translados, {foreignKey: 'eventoId'})
//Translados.belongsTo(Eventos, {foreignKey: 'eventoId'})

//Eventos.belongsTo(Tipo_transporte);
//Eventos.belongsTo(Cliente);
//Eventos.belongsTo(Operador);
//Cliente.belongsTo(Estado);

module.exports = Eventos
