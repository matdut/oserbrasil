const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'Posts'; // nombre de la tabla

var Post = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:  {
    type: Sequelize.STRING,
  },
  size:  {
    type: Sequelize.STRING,
  },
  key:  {
    type: Sequelize.STRING,
  },
  url:  {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.BLOB,
  },    
});

module.exports = Post;
