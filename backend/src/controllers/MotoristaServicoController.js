const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
var Motorista_servico = require('../model/motorista_servico');
var Status = require('../model/Status');
var Servicos = require('../model/servicos');
var Motorista = require('../model/Motorista');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { servicoId } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await Motorista_servico.destroy({
    where: { servicoId: servicoId }
  }).then( function (data){
    
     return res.json({success:true, data:data});    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}



controllers.update = async (req, res) => {

//  console.log('ENTROU NO METODO');  
  // parameter id get  
  const { id } = req.params;

  const { motoristaId, servicoId, statusId} = req.body; 
//console.log('id -'+JSON.stringify(id, null, "    "));  

  //const { originalname: name, size, filename: key, location: url = ""} = req.file;

  await Motorista_servico.update({
    motoristaId: motoristaId,              
    servicoId: servicoId,
    statusId: statusId,
    motoristumId: motoristaId,
  },{
    where: { id: id}
  })
  .then( function (data){
 
     return res.json({success:true, data:data});
 
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

  
}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await Motorista_servico.findAll({
    include: [
      { 
        model: Motorista,       
        required: true,
      },    
        { 
          model: Servicos,       
          required: true,
        }],
    where: { id: id}
  
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.getMotoristaServico = async (req, res) => {
  const { motoristaId, tipo } = req.params;
  await Motorista_servico.findAll({
    include: [
      { 
        model: Motorista,       
        required: true,
      },    
        { 
          model: Servicos,       
          where: {tipoTransporte: tipo} 
          
        }],
    where: { statusId: 1, motoristaId: motoristaId}
  
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.getMotoristaServicoAtivos = async (req, res) => {
  const { motoristaId } = req.params;
  await Motorista_servico.findAll({
    include: [
      { 
        model: Motorista,       
        required: true,
      },    
        { 
          model: Servicos,            
          
        }],
    where: { statusId: 1, motoristaId: motoristaId}
  
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.getServico = async (req, res) => {
  const { servicoId } = req.params;
  await Motorista_servico.findAll({
    include: [
      { 
        model: Motorista,       
        required: true,
      },    
        { 
          model: Servicos,       
          required: true,
        }],
    where: { statusId: 1, servicoId: servicoId}
  
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}



controllers.list = async (req,res) => {
 /// const { servicoId, motoristaId } = req.params;
  const { servicoId } = req.params;
 await Motorista_servico.findAll({ 
  include: [{
    model: Motorista,
  //   where: { id: 45 }
    }],  
     where: { 
      servicoId: servicoId
     } 
  })
  .then( function (data){
    if (data.length > 0) {
      return res.json({success:true, data:data});
     } else {
      return res.json({success:false, data:data});
     }
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
 
}


//controllers.create, async (req, res) => {
controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { motoristaId, servicoId, statusId} = req.body; 

  //console.log("ROle es ==>"+role)
  //create
  await Motorista_servico.create({
    motoristaId: motoristaId,              
    servicoId: servicoId,
    statusId: statusId,
    motoristumId: motoristaId,
  })
  .then( function (data){
  
      return res.json({success:true, data:data});
  
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}
controllers.totalServicosMotorista = async (req, res) => {
 
  const { motoristaId } = req.params;
 
   const salesCount = await Motorista_servico.count({ 
    where: { 
      motoristaId: motoristaId
     } 
   });
 
   return res.json({success:true, data: salesCount});
   
 }

module.exports = controllers;
