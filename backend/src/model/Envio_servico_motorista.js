const Sequelize = require('sequelize');
var sequelize = require('./database');
var Perfil = require('./Perfil');
var Status = require('./Status');
var Eventos = require('./Eventos');
var Situacao = require('./Situacao');
var Tipo_evento = require('./tipo_evento');

var nametable = 'Envio_servico_motorista'; // nombre de la tabla

var Envio_servico_motorista = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },  
  servicoId:{
    type:Sequelize.INTEGER,
   
  },
  tipoEventoId: {
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Tipo_evento,
      key: 'id'
    } 
  },
  data_servico:  {  
    type: Sequelize.DATEONLY,  
    allowNull: true,
  },  
  hora_inicial:  {  
    type: Sequelize.TIME,
    allowNull: true,
  },
  local_embarque: {
    type: Sequelize.STRING(200), 
    allowNull: true,
  },
  motorista_id: {
    type: Sequelize.INTEGER, 
    allowNull: true,
  },
  motorista_perfil: {
    type: Sequelize.INTEGER, 
    allowNull: true,
  },
  servico_pai_id:  {  
    type: Sequelize.INTEGER
  },
  empresaId: {
    type: Sequelize.INTEGER, 
    allowNull: true,
  },
  perfilId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Perfil,
      key: 'id'
    } 
  }
});

module.exports = Envio_servico_motorista
