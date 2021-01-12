const Sequelize = require('sequelize');
var sequelize = require('./database');
var Perfil = require('./Perfil');

var nametable = 'motorista_preferido'; // nombre de la tabla

var Motorista_preferido = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  nome:  {
    type: Sequelize.STRING,       
  },
  telefone: {
    type: Sequelize.STRING(16),
    validate: {
      len: [8, 15],
    }, 
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
  }
},
{
  // remove  createdAt y updated
  timestamps:false
});

Motorista_preferido.belongsTo(Perfil);

module.exports = Motorista_preferido
