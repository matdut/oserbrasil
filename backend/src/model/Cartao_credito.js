const Sequelize = require('sequelize');
var sequelize = require('./database');
//var Cliente = require('./Cliente');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var nametable = 'cartao_credito';

var Cartao = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  numero:  {  
    type: Sequelize.STRING(15)
  },
  nome:  {  
    type: Sequelize.STRING
  },
  data_vencimento:  {  
    type: Sequelize.DATE
  },
  codigo_seguranca:  {  
    type: Sequelize.DATE
  },
  bandeira:  {  
    type: Sequelize.STRING
  }
})

//Cartao.belongsTo(Cliente);
//Cliente.belongsTo(Estado);

module.exports = Cartao
