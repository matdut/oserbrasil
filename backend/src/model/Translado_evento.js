const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Eventos = require('./Eventos');
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
    allowNull: false,
  },
  quantidade_passageiro: {
    type:Sequelize.INTEGER,    
    allowNull: false,
  },
  data_inicial:  {  
    type: Sequelize.DATEONLY,  
    allowNull: false,
  },
  hora_inicial:  {  
    type: Sequelize.TIME  
  },  
  local_embarque: {
    type: Sequelize.STRING(200), 
    allowNull: false,
  },
  local_desembarque: {
    type: Sequelize.STRING(200), 
    allowNull: false,
  },
  motorista_bilingue: {
    type: Sequelize.BOOLEAN, 
    allowNull: false,
  },
  motorista_receptivo: {
    type: Sequelize.BOOLEAN, 
    allowNull: false,
  },
  motorista_preferencial: {
    type: Sequelize.BOOLEAN, 
    allowNull: false,
  }, 
  telefone_motorista: {
    type: Sequelize.STRING(16), 
    allowNull: true, 
  },
  km_translado: {
    type: Sequelize.STRING(16), 
    allowNull: false,  
  },
  tempo_translado: {
    type: Sequelize.STRING(16), 
    allowNull: false,  
  },
  valor_estimado: {
    type: Sequelize.STRING(16), 
    allowNull: false,  
  },
  situacao: {
    type: Sequelize.STRING(16), 
    allowNull: false,  
  },
  motivo_cancelamento: {
    type: Sequelize.STRING(250), 
    allowNull: false,  
  }
})

Translado_evento.belongsTo(Eventos);

module.exports = Translado_evento
