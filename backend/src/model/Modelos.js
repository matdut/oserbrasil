const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'modelo'; // nombre de la tabla

var Modelo = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  marcaId: {
    type: Sequelize.INTEGER,       
  },
  name:  {
    type: Sequelize.STRING,       
  }
},
{
  // remove  createdAt y updated
  timestamps:false
});

module.exports = Modelo
