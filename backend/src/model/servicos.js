const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Perfil = require('./Perfil');
var Transporte = require('./Tipo_transporte');
var Status = require('./Status');
var Eventos = require('./Eventos');
var Situacao = require('./Situacao');
var Tipo_evento = require('./tipo_evento');
var Cartao = require('./Cartao_credito');

var nametable = 'servicos';

var Servicos = sequelize.define(nametable,{

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
  nome_passageiro: {
    type:Sequelize.STRING(250),    
    allowNull: true,
  },  
  telefone_passageiro: {
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
  hora_inicial:  {  
    type: Sequelize.TIME,
    allowNull: true,
  },
  hora_final:  {  
    type: Sequelize.TIME,
    allowNull: true,
  },  
  quantidade_diarias:  {  
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  numero_voo: {
    type: Sequelize.STRING(20),  
    allowNull: true,
  },
  companhia_aerea: {
    type: Sequelize.STRING(200),  
    allowNull: true,
  }, 
  local_embarque: {
    type: Sequelize.STRING(200), 
    allowNull: true,
  },
  embarque_latitude: {
    type: Sequelize.STRING(100), 
    allowNull: true,
  },
  embarque_longitude: {
    type: Sequelize.STRING(100), 
    allowNull: true,
  },
  local_desembarque: {
    type: Sequelize.STRING(200), 
    allowNull: true,
  },
  desembarque_latitude: {
    type: Sequelize.STRING(100), 
    allowNull: true,
  },
  desembarque_longitude: {
    type: Sequelize.STRING(100), 
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
  motorista_alocado: {
    type: Sequelize.BOOLEAN, 
    allowNull: true,
  },
  nome_motorista: {
    type: Sequelize.STRING(160), 
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
    type: Sequelize.DECIMAL(20,2) ,    
    allowNull: true,
  },
  valor_oser: {
    type: Sequelize.DECIMAL(20,2) ,    
    allowNull: true,
  },
  valor_motorista: {
    type: Sequelize.DECIMAL(20,2) ,    
    allowNull: true,
  },
  tipoTransporte:  {  
    type: Sequelize.STRING(150) 
  }, 
  distancia_value:  {  
    type: Sequelize.INTEGER
  }, 
  tempo_value:  {  
    type: Sequelize.INTEGER
  }, 
  statusId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Status,
      key: 'id'
    } 
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
  },
  cartaoId: {
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Cartao,
      key: 'id'
    } 
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
})


Servicos.belongsTo(Situacao);
Servicos.belongsTo(Status);
Servicos.belongsTo(Eventos);
Servicos.belongsTo(Tipo_evento);
Servicos.belongsTo(Cartao);


module.exports = Servicos
