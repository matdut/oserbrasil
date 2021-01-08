const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Estado = require('./Estado');
var Perfil = require('./Perfil');
var Situacao = require('./Situacao');
var Status = require('./Status');
//var Veiculos = require('./veiculo_motorista');

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
   type: Sequelize.STRING, 
   allowNull: true,
 },
 complemento: {
   type: Sequelize.STRING(60),
   allowNull: true,
 }, 
 numero: {
  type: Sequelize.STRING(10),
  allowNull: true,
 }, 
 celular: {
   type: Sequelize.STRING(16),    
   allowNull: true,
 },
 cidade: {
   type: Sequelize.STRING(25), 
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
 bilingue: { 
  type: Sequelize.BOOLEAN,
 },
 foto_name: { 
  type: Sequelize.STRING, 
 },
 foto_size: { 
  type: Sequelize.STRING, 
 },
 foto_key: { 
  type: Sequelize.TEXT('long'), 
 },
 foto_mimetype: { 
  type: Sequelize.STRING, 
 },
 foto_url: { 
  type: Sequelize.TEXT('long'), 
  allowNull: true,
 },
 foto_CNH_name: { 
  type: Sequelize.STRING, 
 },
 foto_CNH_size: { 
  type: Sequelize.STRING, 
 },
 foto_CNH_key: { 
  type: Sequelize.TEXT('long'), 
 },
 foto_CNH_mimetype: { 
  type: Sequelize.STRING, 
 },
 foto_CNH_url: { 
  type: Sequelize.TEXT('long'), 
  allowNull: true,
 },
 numero_carteira: { 
  type: Sequelize.STRING, 
 },
 data_validade: {
   type: Sequelize.DATEONLY,   
   allowNull: true,
 },
 idioma1: { 
  type: Sequelize.STRING(20), 
 },
 idioma2: { 
  type: Sequelize.STRING(20), 
 },
 indicacao: { 
  type: Sequelize.STRING(20), 
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

Motorista.belongsTo(Estado);
Motorista.belongsTo(Perfil);
Motorista.belongsTo(Situacao);
Motorista.belongsTo(Status);

module.exports = Motorista
