const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'Envio_servico_motorista'; // nombre de la tabla

var Envio_servico_motorista = sequelize.define(nametable,{
  
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

module.exports = Perfil
