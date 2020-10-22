const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
var OperadorEvento = require('../model/Operadores_evento');
var Status = require('../model/Status');
var Empresa = require('../model/Empresa');
///var Permissao = require('../model/Permissoes');
//var Role = require('../model/Role');

// para migrar por si no tiene tablas
sequelize.sync()


controllers.delete = async (req,res) => {

  const { id } = req.params;  
  await OperadorEvento.destroy({
    where: { id: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});

  })

}

controllers.deleteOperadorEvento = async (req,res) => {

  const { id  } = req.params;  
  await OperadorEvento.destroy({
    where: {operadorId: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});

  })

}
controllers.list = async (req,res) => {
  await OperadorEvento.findAll({       
    include: [
      { model: Status }, 
      { model: Empresa, required: true}
    ],
    where: { 
     statusId: {
       [Op.notIn]: [6,7]             
     }
    }    
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })

}

controllers.get = async (req, res) => {
  const { id } = req.params;
  await OperadorEvento.findAll({
    include: [{ model: Empresa }],
     where: { id: id}
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}

controllers.create = async (req,res) => {  

  // DATA parametros desde post
  const { operadorId, eventoId, statusId } = req.body;
  	
  //console.log("ROle es ==>"+role)
  //create
  await OperadorEvento.create({
    operadorId: operadorId,              
    eventoId: eventoId,   
    statusId: statusId    
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Operador salvo com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })  

}

controllers.update = async (req, res) => {
  // parameter id get  
  const { id } = req.params;
  //const { clienteId } = req.params;

  // parameter post
  const { operadorId, eventoId, statusId } = req.body;
  // update   
  
  await OperadorEvento.update({
    operadorId: operadorId,              
    eventoId: eventoId,   
    statusId: statusId    
  },{
    where: { id: id} 
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Operador atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

module.exports = controllers;
