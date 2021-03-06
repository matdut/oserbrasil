const controllers = {}

// import model and sequelize
//const Sequelize = require('sequelize');
//const Op = Sequelize.Op;

var sequelize = require('../model/database');
var HistoricoEventos = require('../model/historico_eventos');
var Tipo = require('../model/Tipo_transporte');
var Servicos = require('../model/servicos');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await HistoricoEventos.destroy({
    where: { id: id }
  }).then( function (data){
    return res.json({success:true, data: data});
    //return data;
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}

controllers.deleteEmpresa = async (req,res) => {
  
  // parameter post  
  const { id, perfilId } = req.params;
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await HistoricoEventos.destroy({
    where: { id: id, perfilId: perfilId}
  }).then( function (data){
    return res.json({success:true, data: data});
    //return data;
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  })
   //res.json({success:true, deleted:del, message:"Deleted successful"});

}

controllers.listaeventoexcluidos = async (req,res) => {
  const { id, perfilId } = req.params;
  
  await HistoricoEventos.findAll({   
    where: { logid: id, perfilId: perfilId },  
    order: [
      ['createdAt', 'DESC']
    ]
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.list = async (req,res) => {
  await HistoricoEventos.findAll({   
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.listServicosBusca = async (req,res) => {
  const { id, perfilId, eventoid } = req.params;
  
  await HistoricoEventos.findAll({
    include: [
      { 
       model: Servicos,
           where: { 
             eventoId: eventoid,
           },         
      }],
     where: { logid: id, perfilId: perfilId,  id: eventoid },
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.listaevento = async (req,res) => {
  const { id, perfilId } = req.params;
  
  await HistoricoEventos.findAll({
    where: { logid: id, perfilId: perfilId },  
    order: [
      ['createdAt', 'DESC']
    ]
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
  
  //console.log(req.body);          
  //console.log("ROle es ==>"+role)
  //create
  await HistoricoEventos.create(req.body)
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
  
  await HistoricoEventos.update(req.body,{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.updateevento = async (req, res) => {
  // parameter id get  
  const { id } = req.params;  

  // parameter post
   
  await HistoricoEventos.update(req.body,{
    where: { logid: id}
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

  await HistoricoEventos.findAll({
    where: { id: id }   
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;
