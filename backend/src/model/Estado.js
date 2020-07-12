const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'estados'; // nombre de la tabla

var Estado = sequelize.define(nametable,{
  
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

module.exports = Estado
