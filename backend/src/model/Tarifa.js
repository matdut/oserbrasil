const Sequelize = require('sequelize');

var sequelize = require('./database');
var nametable = 'tarifa';

var Tarifa = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },  
  tipoTransporte:  {  
    type: Sequelize.STRING(150) 
  }, 
  faixa_inicial:  {  
    type: Sequelize.INTEGER(10) 
  },
  faixa_final:  {  
    type: Sequelize.INTEGER(10) 
  },
  valor_km:  {  
    type: Sequelize.DECIMAL(20,2)  
  },
  valor_tempo:  {  
    type: Sequelize.DECIMAL(20,2)  
  },
  valor_diaria:  {  
    type: Sequelize.DECIMAL(20,2)  
  },  
  bandeira:  {  
    type: Sequelize.DECIMAL(20,2)
  },
  receptivo:  {  
    type: Sequelize.DECIMAL(20,2)    
  },
  bilingue:  {  
    type: Sequelize.INTEGER(20)
  },
  pedagio:  {  
    type: Sequelize.DECIMAL(20,2)
  }
})

module.exports = Tarifa
