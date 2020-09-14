const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Perfil = require('../model/Perfil');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Perfil.findAll({
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
  const { nome } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Perfil.create({   
    descricao: nome
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
  
  await Perfil.update({
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
  await Perfil.findAll({
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
