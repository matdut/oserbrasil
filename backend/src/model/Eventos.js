const Sequelize = require('sequelize');
var sequelize = require('./database');
var Tipo_transporte = require('./Tipo_transporte');
var Cliente = require('./Cliente');
//var eventos = require('./');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'eventos';

var Eventos = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false,
    autoIncrement:true
  }, 
  cliente_cnpj: {
    type: Sequelize.STRING(25),
    allowNull: false,     
  },
  clienteId: {
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Cliente,
      key: 'id'
    } 
  },
  cliente_nome: {
    type: Sequelize.STRING(250),
    allowNull: false,     
  },
  ordem_servico:  {  
    type: Sequelize.STRING(30),
    allowNull: false,     
  },
  nome_evento:  {  
    type: Sequelize.STRING(100),
    allowNull: false,     
  },
  data_evento: {
    type: Sequelize.DATEONLY,
    allowNull: false,     
  },
  tipoTransporteId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Tipo_transporte,
      key: 'id'
    } 
  },
  valor_total: {
    type: Sequelize.STRING(15),
    allowNull: false,     
  }
})

Eventos.belongsTo(Tipo_transporte);
Eventos.belongsTo(Cliente);
//Cliente.belongsTo(Estado);

module.exports = Eventos
