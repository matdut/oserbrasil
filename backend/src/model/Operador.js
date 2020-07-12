const Sequelize = require('sequelize');
var sequelize = require('./database');
var Cliente = require('./Cliente');
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
    type: Sequelize.STRING
  },  
  email:  {
    type: Sequelize.STRING
  },
  cpf:  {
    type: Sequelize.STRING
  },
  senha:  {
    type: Sequelize.STRING
  },
  telefone:  {
    type: Sequelize.STRING
  },
  clienteId:  {
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Cliente,
      key: 'id'
    } 
  }

})

Operador.belongsTo(Cliente);

module.exports = Operador
