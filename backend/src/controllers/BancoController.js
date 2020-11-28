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
  const { codigo, banco, agencia, conta, conta_dv, logid, perfilId, operacao } = req.body;
  
  //console.log("ROle es ==>"+role)
  //create
  await Banco.create({ 
    codigo: codigo,
    banco: banco,     
    agencia: agencia,
    conta: conta,  
    logid: logid, 
    conta_dv: conta_dv,
    perfilId: perfilId,   
    operacao: operacao,
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.list_banco_motorista = async (req,res) => {
  const { logid, perfilId } = req.params;

  await Banco.findAll({
    where: { logid: logid, perfilId: perfilId  }   
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

  const { codigo, banco, agencia, conta, logid, perfilId, operacao, conta_dv } = req.body;
  //console.log('entrou aqui = '+id);
  // parameter post
  // update data
  
  await Banco.update({
    codigo: codigo,
    banco: banco,     
    agencia: agencia,
    conta: conta,  
    logid: logid, 
    perfilId: perfilId, 
    operacao: operacao,    
    conta_dv: conta_dv,
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
controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 
  await Banco.destroy({
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