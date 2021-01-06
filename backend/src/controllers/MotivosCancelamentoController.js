const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Motivos_cancelamentos = require('../model/motivos_cancelamentos');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {

  const { id } = req.params;  

  await Motivos_cancelamentos.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })

}

controllers.list = async (req,res) => {
  await Motivos_cancelamentos.findAll({   
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
  await Motivos_cancelamentos.create({   
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

  //console.log('entrou aqui = '+id);

  // parameter post
  const { descricao } = req.body;
  // update data
  
  await Motivos_cancelamentos.update({
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
  await Motivos_cancelamentos.findAll({
    where: { id: id}
    //,
    //include: [ Role ]
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;