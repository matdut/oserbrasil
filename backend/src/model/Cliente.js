const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
var Estado = require('./Estado');
var Perfil = require('./Perfil');
var Situacao = require('./Situacao');
var Status = require('./Status');

// name table
var nametable = 'cliente';

var Cliente = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  nome:  {  
     type: Sequelize.STRING(120),
     allowNull: false,     
  },
  email: {
     type: Sequelize.STRING(80),
     allowNull: false,     
     isEmail: {
      args: true,
      message: 'Favor entrar com um email valido'
     }, 
  },
  endereco: {        
    type: Sequelize.STRING(100), 
    allowNull: true,
  },
  telefone1: {
    type: Sequelize.STRING(16),
    validate: {
      len: [8, 15],
    }, 
  },
  telefone2: { 
    type: Sequelize.STRING(16),
    allowNull: true,    
  },
  senha: { 
    type: Sequelize.STRING(20), 
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
  celular: {
    type: Sequelize.STRING(16), 
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
  cep: {
    type: Sequelize.STRING(10), 
    allowNull: true,
  },
  cpf: { 
    type: Sequelize.STRING(14), 
    allowNull: true,
  },
  data_nascimento: {
    type: Sequelize.DATEONLY,   
    allowNull: true,
  },      
  // LLAVE FORANEA
  estadoId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Estado,
      key: 'id'
    } 
  },
  perfilId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Perfil,
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

Cliente.belongsTo(Estado);
Cliente.belongsTo(Perfil);
Cliente.belongsTo(Situacao);
Cliente.belongsTo(Status);

module.exports = Cliente
