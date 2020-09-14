const Sequelize = require('sequelize');
var sequelize = require('./database');

var Perfil = require('./Perfil');

var nametable = 'funcionalidade';

var Funcionalidade = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },    
  descricao: {
    type: Sequelize.STRING(150),
    allowNull: true,
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
})

Funcionalidade.belongsTo(Perfil);

module.exports = Funcionalidade
