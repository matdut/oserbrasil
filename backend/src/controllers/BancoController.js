const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Banco = require('../model/Banco');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  await Banco.findAll({
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
  const { agencia, conta, logid, perfilId, statusId } = req.body;
  //console.log("ROle es ==>"+role)
  //create
  await Banco.create({ 
    agencia: agencia,
    conta: conta,  
    logid: logid, 
    perfilId: perfilId, 
    statusId: statusId, 
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

  const { agencia, conta, logid, perfilId, statusId } = req.body;
  //console.log('entrou aqui = '+id);
  // parameter post
  // update data
  
  await Banco.update({
    agencia: agencia,
    conta: conta,  
    logid: logid, 
    perfilId: perfilId, 
    statusId: statusId, 
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
  await Banco.findAll({
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
