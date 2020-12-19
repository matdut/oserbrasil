const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
var Estado = require('./Estado');
var Situacao = require('./Situacao');
var Status = require('./Status');
var Cliente = require('./Cliente');

// name table
var nametable = 'empresa';

var Empresa = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },  
  cnpj: {
    type: Sequelize.STRING(18),
    allowNull: true,
  },
  razao_social: {
    type: Sequelize.STRING(120),
    allowNull: true,
  },
  inscricao_estadual: {
    type: Sequelize.STRING(15),
    allowNull: true,
  },
  inscricao_municipal: {
    type: Sequelize.STRING(15),
    allowNull: true,
  },
  nome_fantasia: {
    type: Sequelize.STRING(150),
    allowNull: true,
  },
  contato: {
    type: Sequelize.STRING(20), 
    allowNull: true,
  }, 
  celular: {
    type: Sequelize.STRING(16), 
    allowNull: true,   
  },        
  clienteId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Cliente,
      key: 'id'
    } 
  },
  endereco: {        
    type: Sequelize.STRING(100), 
    allowNull: true,
  },
  cidade: {
    type: Sequelize.STRING(50), 
    allowNull: true,
  },
  bairro: { 
    type: Sequelize.STRING(75), 
    allowNull: true,
  },
  complemento: {
    type: Sequelize.STRING(60),
    allowNull: true,
  }, 
  numero: {
    type: Sequelize.STRING(15),
    allowNull: true,
  },  
  cep: {
    type: Sequelize.STRING(10), 
    allowNull: true,
  },        
  estadoId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Estado,
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
  statusId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Status,
      key: 'id'
    } 
  }

})

Empresa.belongsTo(Cliente);
Empresa.belongsTo(Situacao);
Empresa.belongsTo(Status);
Empresa.belongsTo(Estado);

module.exports = Empresa
