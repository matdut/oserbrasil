const Sequelize = require('sequelize');
var sequelize = require('./database');
var Servicos = require('./Eventos');
var Motorista = require('./Motorista');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'servico_motorista';

var Servico_motorista = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  servicoId:  {  
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Servicos,
      key: 'id'
    } 
  },  
  motoristaId:  {  
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Motorista,
      key: 'id'
    } 
  }  
})

Servico_motorista.belongsTo(Motorista);
Servico_motorista.belongsTo(Servicos);

module.exports = Servico_motorista
