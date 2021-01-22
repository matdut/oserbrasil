const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Status = require('./Status');
var Situacao = require('./Situacao');

var nametable = 'historico_servicos';

var Historico_servicos = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
  //  autoIncrement:true
  },  
  eventoId:{
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  tipoEventoId: {
    type:Sequelize.INTEGER,    
    allowNull: true,
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
  valor_bilingue: {
    type: Sequelize.DECIMAL(20,2) ,    
    allowNull: true,
  },
  valor_receptivo: {
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
  servico_pai_id:  {  
    type: Sequelize.INTEGER
  },
  statusId:{
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  situacaoId:{
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  motivo_cancelamento: {
    type: Sequelize.STRING(250), 
    allowNull: true,
  },
  cartaoId: {
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  logid: {
    type: Sequelize.INTEGER,
    allowNull: false,     
  },
  perfilId: {
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  nome_responsavel: {  
    type: Sequelize.STRING(250),
    allowNull: false,     
  },
  valor_pedagio: {
    type: Sequelize.DECIMAL(20,2) ,    
    allowNull: true,
  }
  
})


module.exports = Historico_servicos
