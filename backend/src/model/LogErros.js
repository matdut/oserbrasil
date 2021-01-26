const Sequelize = require('sequelize');
var sequelize = require('./database');

// import Role for FK roleId
var nametable = 'log_erros';

var Log_Erros = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  form_erro: {
    type: Sequelize.STRING(100),
    allowNull: true,     
  },
  tipo_erro: {
    type: Sequelize.STRING(100),
    allowNull: false,    
  }, 
  descricao:  {  
    type: Sequelize.STRING(200),
    allowNull: false,     
  }
})

//Cliente.belongsTo(Estado);

module.exports = Log_Erros