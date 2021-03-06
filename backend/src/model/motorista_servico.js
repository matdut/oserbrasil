const Sequelize = require('sequelize');
var sequelize = require('./database');
var Servico = require('./servicos');
//var Motorista = require('./Motorista');
var Status = require('./Status');

var nametable = 'motorista_servico';

var Motorista_servico = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false,
    autoIncrement:true
  },
  motoristaId: {
    type: Sequelize.INTEGER,  
  },
  motorista_perfil: {
    type: Sequelize.INTEGER,  
  },
  servicoId: {
    type: Sequelize.INTEGER,
    refences: {
      model: Servico,
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
},
{
  // remove  createdAt y updated
  timestamps:false
})

//Motorista_servico.belongsTo(Motorista, { foreignKey: 'motoristaId' });
Motorista_servico.belongsTo(Servico);
Motorista_servico.belongsTo(Status);

module.exports = Motorista_servico
