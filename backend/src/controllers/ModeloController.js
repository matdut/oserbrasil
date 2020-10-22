const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Modelos = require('../model/Modelos');
var Marcas = require('../model/Marcas');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Modelos.findAll({    
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { nome, marcaId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Modelos.create({   
    nome: nome,
    marcaId: marcaId
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;  
  // update data
  
  await Modelos.update({
    descricao: nome
  },{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Modelos.findAll({    
    where: { marcaId: id}  
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.getModelo = async (req, res) => {
  const { id } = req.params;
  await Modelos.findAll({    
    where: { id: id}  
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;
