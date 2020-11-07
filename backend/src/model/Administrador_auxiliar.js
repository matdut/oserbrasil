const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
var Perfil = require('./Perfil');
var Status = require('./Status');

var nametable = 'administrador_auxiliar';

var Adm_auxiliar = sequelize.define(nametable,{

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
  senha: { 
    type: Sequelize.STRING(20), 
    allowNull: true,
  }, 
  celular: {
    type: Sequelize.STRING(16), 
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
  perfilId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Perfil,
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

Adm_auxiliar.belongsTo(Status);
Adm_auxiliar.belongsTo(Perfil);

module.exports = Adm_auxiliar
