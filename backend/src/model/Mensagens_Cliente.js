const Sequelize = require('sequelize');
var sequelize = require('./database');
//var Perfil = require('./Perfil');

var nametable = 'mensagens_cliente'; // nombre de la tabla

var Mensagens_cliente = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  descricao:  {
    type: Sequelize.STRING(15), 
  }
});

//Mensagens.belongsTo(Perfil);

module.exports = Mensagens_cliente
