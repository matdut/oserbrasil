const Sequelize = require('sequelize');
var sequelize = require('./database');
var Perfil = require('./Perfil');
var Funcionalidade = require('./Funcionalidade');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'permissao';

var Permissao = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  logid: {
    type: Sequelize.INTEGER,
    allowNull: false,     
  }, 
  perfilId:{
  type: Sequelize.INTEGER,
  // this is a refence to another model
    refences: {
      model: Perfil,
      key: 'id'
    }  
  },  
  funcionalidadeId: {
    type: Sequelize.INTEGER,
    // this is a refence to another model
      refences: {
        model: Funcionalidade,
        key: 'id'
      }  
  }
},
{
  // remove  createdAt y updated
  timestamps:false
})

Permissao.belongsTo(Perfil);
Permissao.belongsTo(Funcionalidade);


module.exports = Permissao
