const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'marca'; // nombre de la tabla

var Marca = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:  {
    type: Sequelize.STRING(255),       
  }
},
{
  // remove  createdAt y updated
  timestamps:false
});

module.exports = Marca
