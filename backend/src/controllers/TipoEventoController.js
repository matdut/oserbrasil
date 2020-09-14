const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Tipo_Evento = require('../model/tipo_evento');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {

  const { id } = req.params;  

  await Tipo_Evento.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});   
  })

}

controllers.list = async (req,res) => {
  await Tipo_Evento.findAll({
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
  const { descricao } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Tipo_Evento.create({   
    descricao: descricao
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

  // parameter post
  const { descricao } = req.body;
  // update data
  
  await Tipo_Evento.update({
    descricao: descricao
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
  await Tipo_Evento.findAll({
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
