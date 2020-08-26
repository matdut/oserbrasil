const Sequelize = require('sequelize');
var sequelize = require('./database');
var Empresa = require('./Empresa');
var Status = require('./Status');
var Perfil = require('./Perfil');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'operador';

var Operador = sequelize.define(nametable,{

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
  cpf: { 
    type: Sequelize.STRING(14), 
    allowNull: true,
  },
  data_nascimento: {
    type: Sequelize.DATEONLY,   
    allowNull: true,
  },
  senha: { 
    type: Sequelize.STRING(20), 
    allowNull: true,
  },
  telefone: {
    type: Sequelize.STRING(16),
    validate: {
      len: [8, 15],
    }, 
  }, 
  celular: {
    type: Sequelize.STRING(16), 
    allowNull: true,   
  },
  empresaId:  {
    type: Sequelize.INTEGER,   
    refences: {
      model: Empresa,
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
  },
  perfilId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Perfil,
      key: 'id'
    } 
  }

})

Operador.belongsTo(Status);
Operador.belongsTo(Empresa);
Operador.belongsTo(Perfil);

module.exports = Operador
