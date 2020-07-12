const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Ocorrencia = require('./Ocorrencia');
var nametable = 'matriz_tarifaria';

var Matriz = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },  
  tipo_veiculo:  {  
    type: Sequelize.INTEGER(2),
    allowNull: false,     
  },  
  bandeira:  {  
    type: Sequelize.DECIMAL(20,2),
    allowNull: false,     
  },
  receptivo:  {  
    type: Sequelize.BOOLEAN,
    allowNull: false,     
  },
  bilingue:  {  
    type: Sequelize.STRING(10),
    allowNull: false,     
  },
  pedagio:  {  
    type: Sequelize.DECIMAL(20,2),
    allowNull: false,     
  }
})

Matriz.hasMany(Ocorrencia, { as: "Ocorrencias" });
Ocorrencia.belongsTo(Matriz, {
  foreignKey: "matrizId",
  as: "matriz",
});

//Matriz.belongsTo(Ocorrencia);

module.exports = Matriz
