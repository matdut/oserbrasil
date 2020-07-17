const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Estado = require('./Estado');
var Perfil = require('./Perfil');
var Situacao = require('./Situacao');
var Seguradora = require('./Seguradora');

var nametable = 'motorista';
var Motorista = sequelize.define(nametable,{

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
 },
 senha: { 
   type: Sequelize.STRING, 
   allowNull: false,
 },
 complemento: {
   type: Sequelize.STRING(60),
 }, 
 numero: {
  type: Sequelize.STRING(10),
 }, 
 celular: {
   type: Sequelize.STRING(16),    
 },
 cidade: {
   type: Sequelize.STRING(25), 
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
 carro: {
  type: Sequelize.STRING(25), 
 },
 placa: {
  type: Sequelize.STRING(10),
 },
 ano: { 
  type: Sequelize.STRING(5),
 },
 cor: { 
  type: Sequelize.STRING(20), 
 },
 bilingue: { 
  type: Sequelize.BOOLEAN,
 },
 foto_blob: { 
  type: Sequelize.BLOB, 
 },
 foto_name: { 
  type: Sequelize.STRING, 
 },
 foto_size: { 
  type: Sequelize.STRING, 
 },
 foto_key: { 
  type: Sequelize.STRING, 
 },
 foto_mimetype: { 
  type: Sequelize.STRING, 
 },
 foto_url: { 
  type: Sequelize.STRING, 
 },
 indicacao: { 
  type: Sequelize.STRING(20), 
 },
 apolice: { 
  type: Sequelize.STRING(20), 
 },
 seguradoraId: { 
  type: Sequelize.INTEGER,
  // this is a refence to another model
  refences: {
    model: Seguradora,
    key: 'id'
  } 
 },
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

Motorista.belongsTo(Estado);
Motorista.belongsTo(Perfil);
Motorista.belongsTo(Situacao);
Motorista.belongsTo(Seguradora);


module.exports = Motorista
