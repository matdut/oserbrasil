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
    type: Sequelize.STRING(250), 
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
    validate: {
      len: [8, 15],
    }, 
  },
  senha: { 
    type: Sequelize.STRING(20), 
    allowNull: false,
  },
  complemento: {
    type: Sequelize.STRING(250),
  }, 
  numero: {
    type: Sequelize.STRING(10),
  }, 
  celular: {
    type: Sequelize.STRING(16), 
    validate: {
      len: [8, 15],
    }, 
  },
  cidade: {
    type: Sequelize.STRING(25), 
    allowNull: false,
  },
  bairro: { 
    type: Sequelize.STRING(25), 
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
    type: Sequelize.STRING(20), 
    allowNull: true,
  },
  data_nascimento: {
    type: Sequelize.DATEONLY,
    allowNull: true,    
  },
  cnpj: {
    type: Sequelize.STRING(25),
    allowNull: true,
  },
  inscricao_estadual: {
    type: Sequelize.STRING(25),
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

Cliente.hasMany(Cartao, { as: "cartao_credito" });
Cartao.belongsTo(Cliente, {
  foreignKey: "clienteId",
  as: "cliente",
});

module.exports = Cliente
