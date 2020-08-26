const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Eventos = require('./Eventos');
var Situacao = require('./Situacao');

var nametable = 'translado_evento';

var Translado_evento = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },  
  eventoId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Eventos,
      key: 'id'
    } 
  },  
  nome_passageiro: {
    type:Sequelize.STRING(250),    
    allowNull: true,
  },
  quantidade_passageiro: {
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  data_servico:  {  
    type: Sequelize.DATEONLY,  
    allowNull: true,
  },  
  hora_servico:  {  
    type: Sequelize.TIME,
    allowNull: true,
  },
  numero_voo: {
    type: Sequelize.DATEONLY,  
    allowNull: true,
  },
  companhia_aerea: {
    type: Sequelize.DATEONLY,  
    allowNull: true,
  }, 
  local_embarque: {
    type: Sequelize.STRING(200), 
    allowNull: true,
  },
  local_desembarque: {
    type: Sequelize.STRING(200), 
    allowNull: true,
  },
  motorista_bilingue: {
    type: Sequelize.BOOLEAN, 
    allowNull: true,
  },
  motorista_receptivo: {
    type: Sequelize.BOOLEAN, 
    allowNull: true,
  },
  motorista_preferencial: {
    type: Sequelize.BOOLEAN, 
    allowNull: true,
  }, 
  telefone_motorista: {
    type: Sequelize.STRING(16), 
    allowNull: true, 
  },
  km_translado: {
    type: Sequelize.STRING(16), 
    allowNull: true,
  },
  tempo_translado: {
    type: Sequelize.STRING(16), 
    allowNull: true,
  },
  valor_estimado: {
    type: Sequelize.STRING(16), 
    allowNull: true,
  },
  situacaoId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Situacao,
      key: 'id'
    } 
  },
  motivo_cancelamento: {
    type: Sequelize.STRING(250), 
    allowNull: true,
  }
})

Translado_evento.belongsTo(Eventos);

module.exports = Translado_evento
