const Sequelize = require('sequelize');
var sequelize = require('./database');
// import Role for FK roleId
//var Role = require('./Role');
// name table
var Tipo_transporte = require('./Tipo_transporte');
var Faixas_tarifarias = require('./Faixas_tarifarias');
var nametable = 'matriz_tarifaria';

var Matriz = sequelize.define(nametable,{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },  
  tipoTransporteId:{
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Tipo_transporte,
      key: 'id'
    } 
  },  
  bandeira:  {  
    type: Sequelize.DECIMAL(20,2)
  },
  receptivo:  {  
    type: Sequelize.DECIMAL(20,2)    
  },
  bilingue:  {  
    type: Sequelize.DECIMAL(20,2)
  },
  pedagio:  {  
    type: Sequelize.DECIMAL(20,2)
  }
})

/*
db.comments.belongsTo(db.posts);
db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);
*/

//Matriz.hasMany(Tipo_transporte);
//Tipo_transporte.belongsTo(Matriz);

//Matriz.belongsTo(Tipo_transporte, { as: 'alias' })

//Model1.findAll({include: [{model: Model2  , as: 'alias'  }]},{raw: true}).success(onSuccess).error(onError);

//Tipo_transporte.belongsTo(Matriz, {
//  foreignKey: 'tipoTransporteId'
//});

//Matriz.hasMany(Tipo_transporte, { foreignKey: 'tipoTransporteId', foreignKeyConstraint: true })
//Tipo_transporte.belongsTo(Matriz, {foreignKey: 'id'})

//Matriz.belongsTo(Tipo_transporte, {foreignKey: 'tipoTransporteId'})
//Tipo_transporte.belongsTo(Matriz, {foreignKey: 'id'})

//Matriz.hasMany(Tipo_transporte, {foreignKey: 'id'})
//Tipo_transporte.belongsTo(Matriz, {foreignKey: 'id'})
//Matriz.hasMany(Faixas_tarifarias, {foreignKey: 'matrizId'})

//Faixas_tarifarias.belongsTo(Matriz, {foreignKey: 'matrizId'})

//Matriz.hasMany(Tipo_transporte);
//Tipo_transporte.belongsTo(Matriz); 
/*
Matriz.hasMany(Tipo_transporte, {foreignKey: 'id'});
Tipo_transporte.belongsTo(Matriz, {
  foreignKey: "id",
}); 
*/

//Matriz.belongsTo(Ocorrencia);

module.exports = Matriz
