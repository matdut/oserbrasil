const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'status_finalizacao'; // nombre de la tabla

var Status = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  descricao:  {
    type: Sequelize.STRING,       
  }
},
{
  // remove  createdAt y updated
  timestamps:false
});

module.exports = Status
