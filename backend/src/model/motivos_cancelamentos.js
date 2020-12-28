const Sequelize = require('sequelize');
var sequelize = require('./database');
//var Cliente = require('./Cliente');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'motivos_cancelamentos';

var Motivos_cancelamento = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  descricao:  {  
    type: Sequelize.STRING(250)  
  }
},
{
  // remove  createdAt y updated
  timestamps:false
})

//Cartao.belongsTo(Cliente);
//Cliente.belongsTo(Estado);

module.exports = Motivos_cancelamento
