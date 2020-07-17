const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
var Estado = require('./Estado');
var Perfil = require('./Perfil');
var Situacao = require('./Situacao');
var Cartao = require('./Cartao_credito');
// name table
var nametable = 'cliente';

var Cliente = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  nome:  {  
     type: Sequelize.STRING(250),
     allowNull: false,     
  },
  email: {
     type: Sequelize.STRING(50),
     allowNull: false,     
     isEmail: {
      args: true,
      message: 'Favor entrar com um email valido'
     }, 
  },
  endereco: {        
    type: Sequelize.STRING(100), 
    allowNull: false,
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
    allowNull: false,
  },
  complemento: {
    type: Sequelize.STRING(60),
  }, 
  numero: {
    type: Sequelize.STRING(15),
  }, 
  celular: {
    type: Sequelize.STRING(16), 
    allowNull: true,   
  },
  cidade: {
    type: Sequelize.STRING(50), 
    allowNull: false,
  },
  bairro: { 
    type: Sequelize.STRING(75), 
    allowNull: false,
  },  
  cep: {
    type: Sequelize.STRING(10), 
    allowNull: false,
  },
  tipo_cliente: { 
    type: Sequelize.STRING(2),
    allowNull: false, 
  },
  cpf: { 
    type: Sequelize.STRING(14), 
    allowNull: true,
  },
  data_nascimento: {
    type: Sequelize.DATEONLY,   
  },
  cnpj: {
    type: Sequelize.STRING(18),
    allowNull: true,
  },
  inscricao_estadual: {
    type: Sequelize.STRING(15),
  },
  inscricao_municipal: {
    type: Sequelize.STRING(15),
  },
  nome_fantasia: {
    type: Sequelize.STRING(150),
  },
  contato: {
    type: Sequelize.STRING(20), 
  },
  operadorId: {
    type: Sequelize.STRING(50), 
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
  }

})

Cliente.belongsTo(Estado);
Cliente.belongsTo(Perfil);
Cliente.belongsTo(Situacao);

/*
Cliente.hasMany(Cartao, { as: "cartao_credito" });
Cartao.belongsTo(Cliente, {
  foreignKey: "clienteId",
  as: "cliente",
});
*/
module.exports = Cliente
