const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'veiculo_motorista'; // nombre de la tabla
var Motorista = require('./Motorista');
var Seguradora = require('./Seguradora');

var Veiculo = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  marcaId: {
    type: Sequelize.STRING(25), 
    allowNull: true,
   },
  marca: {
    type: Sequelize.STRING(25), 
    allowNull: true,
   },
  placa: {
    type: Sequelize.STRING(10),
    allowNull: true,
   },
  modeloId: {
    type: Sequelize.STRING(20),
    allowNull: true,
   },
  tipoTransporte:  {  
    type: Sequelize.STRING(150) 
  },
  modelo: {
    type: Sequelize.STRING(20),
    allowNull: true,
   },
  ano: { 
    type: Sequelize.STRING(5),
    allowNull: true,
  },
  anodut: { 
    type: Sequelize.STRING(5),
    allowNull: true,
  },
  cor: { 
    type: Sequelize.STRING(20), 
    allowNull: true,
  },
  foto_CRVL_name: { 
   type: Sequelize.STRING, 
   allowNull: true,
  },
  foto_CRVL_size: { 
   type: Sequelize.STRING, 
   allowNull: true,
  },
  foto_CRVL_key: { 
    type: Sequelize.TEXT('long'), 
   allowNull: true,
  },
  foto_CRVL_mimetype: { 
   type: Sequelize.STRING, 
   allowNull: true,
  },
  foto_CRVL_url: { 
    type: Sequelize.TEXT('long'), 
   allowNull: true,
  },
  apolice: { 
   type: Sequelize.STRING(12), 
   allowNull: true,
  },
  seguradoraId: { 
   type: Sequelize.INTEGER,   
   // this is a refence to another model
   refences: {
     model: Seguradora,
     key: 'id'
   } 
  },
  motoristaId: {
    type: Sequelize.INTEGER,
    // this is a refence to another model
    refences: {
      model: Motorista,
      key: 'id'
    } 
  },
  engate: {
    type: Sequelize.BOOLEAN,  
  },
  cadeirinha_pequena: { /* ate 2 anos */
    type: Sequelize.BOOLEAN, 
  },
  cadeirinha_grande: { /* maior de 2 anos */
    type: Sequelize.BOOLEAN, 
  },
  cadeira_rodas: { /* cadeira de rodas */
    type: Sequelize.BOOLEAN, 
  }    

});

//User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'})
Veiculo.belongsTo(Seguradora);
//Veiculo.hasOne(Motorista, {as : 'motorista', foreignKey : 'id'});
Veiculo.belongsTo(Motorista);
//Veiculo.belongsTo(Motorista, {foreignKey : 'id'});

module.exports = Veiculo
