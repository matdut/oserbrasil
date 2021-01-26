const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'historico_eventos';

var Historico_eventos = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false,
  },
  eventoId:{
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  logid: {
    type: Sequelize.INTEGER,
    allowNull: false,     
  },
  perfilId:{
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  ordem_servico:  {  
    type: Sequelize.STRING(30),
    allowNull: false,     
  },
  nome_evento:  {  
    type: Sequelize.STRING(100),
    allowNull: false,     
  },
  nome_responsavel:  {  
    type: Sequelize.STRING(250),
    allowNull: false,     
  },
  data_evento: {
    type: Sequelize.DATEONLY,
    allowNull: false,     
  },
  viagens_total: {
    type: Sequelize.INTEGER,  
    allowNull: true,     
  },
  valor_total: {
    type: Sequelize.DECIMAL(20,2),  
    allowNull: true,     
  },
  statusId:{
    type:Sequelize.INTEGER,    
    allowNull: true,
  },
  data_exclusao: {
    type: Sequelize.DATE,
    allowNull: false,     
  }
})


module.exports = Historico_eventos
