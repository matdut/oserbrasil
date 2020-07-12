const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'perfils'; // nombre de la tabla

var Perfil = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  nome:  {
    type: Sequelize.STRING,
  }    

},
{
  // remove  createdAt y updated
  timestamps:false
});

module.exports = Perfil
