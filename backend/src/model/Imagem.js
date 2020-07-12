const Sequelize = require('sequelize');
var sequelize = require('./database');


var Imagem = sequelize.define("imagem", {

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  type:  {  
    type: Sequelize.STRING,
    allowNull: false,     
  },
  name:  {  
    type: Sequelize.STRING(40),
    allowNull: false,     
  },
  data: {
    type: DataTypes.BLOB("long"),
  },
})   

module.exports = Imagem