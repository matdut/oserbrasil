const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var LogErros = require('../model/LogErros');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await LogErros.findAll({
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.create = async (req,res) => {  
   
  //create
  await LogErros.create(req.body)
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

 
  await LogErros.update(req.body,{
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
  await LogErros.findAll({
    where: { id: id}
  
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}
controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 
  await LogErros.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}
module.exports = controllers;