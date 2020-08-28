const Sequelize = require('sequelize');
var sequelize = require('./database');

var Perfil = require('./Perfil');
var Status = require('./Status');

var nametable = 'logins';

var Login = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  email:  {  
    type: Sequelize.STRING,
    allowNull: false,     
  },
  senha:  {  
    type: Sequelize.STRING(40),
    allowNull: true,     
  },
  logid: {
    type: Sequelize.INTEGER,
    allowNull: false,     
  },
  perfilId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Perfil,
      key: 'id'
    } 
  },
  statusId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Status,
      key: 'id'
    } 
  }

},
{
  // remove  createdAt y updated
  timestamps:false
});

Login.belongsTo(Perfil);
Login.belongsTo(Status);

module.exports = Login
