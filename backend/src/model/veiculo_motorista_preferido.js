const Sequelize = require('sequelize');
var sequelize = require('./database');
var nametable = 'veiculo_motorista_preferido'; // nombre de la tabla
var MotoristaPreferido = require('./motorista_preferido');
var Seguradora = require('./Seguradora');

var Veiculo_mot_pref = sequelize.define(nametable,{
  
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
      model: MotoristaPreferido,
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
Veiculo_mot_pref.belongsTo(Seguradora);
//Veiculo_mot_pref.hasOne(MotoristaPreferido, {as : 'motorista', foreignKey : 'id'});
//Veiculo_mot_pref.belongsTo(MotoristaPreferido);
//Veiculo.belongsTo(Motorista, {foreignKey : 'id'});

module.exports = Veiculo_mot_pref
