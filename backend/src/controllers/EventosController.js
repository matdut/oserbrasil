const controllers = {}

// import model and sequelize
//const Sequelize = require('sequelize');
//const Op = Sequelize.Op;

var sequelize = require('../model/database');
var Eventos = require('../model/Eventos');
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
  await Eventos.destroy({
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
  await Eventos.destroy({
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

controllers.list = async (req,res) => {
  await Eventos.findAll({
    include: [Tipo]
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
  
  await Eventos.findAll({
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
  
  await Eventos.findAll({
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
  const { logid, perfilId, ordem_servico, nome_evento, data_evento, viagens_total, valor_total } = req.body;

  //console.log(req.body);          
  //console.log("ROle es ==>"+role)
  //create
  await Eventos.create({   
    logid: logid,
    perfilId: perfilId,    
    ordem_servico: ordem_servico, 
    nome_evento: nome_evento, 
    data_evento: data_evento,     
    viagens_total: viagens_total,
    valor_total: valor_total
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
  const { logid, perfilId, ordem_servico, viagens_total, nome_evento, data_evento, valor_total } = req.body;
  
  // update data
  
  await Eventos.update({  
    logid: logid,
    perfilId: perfilId,    
    ordem_servico: ordem_servico, 
    nome_evento: nome_evento, 
    data_evento: data_evento,     
    valor_total: valor_total,
    viagens_total: viagens_total,   
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

controllers.updateevento = async (req, res) => {
  // parameter id get  
  const { id } = req.params;  

  // parameter post
  const { logid, perfilId, ordem_servico, nome_evento, data_evento, viagens_total, valor_total } = req.body;
  
  // update data
  
  await Eventos.update({  
    logid: logid,
    perfilId: perfilId,    
    ordem_servico: ordem_servico, 
    nome_evento: nome_evento, 
    data_evento: data_evento,     
    viagens_total: viagens_total,
    valor_total: valor_total
  },{
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

  await Eventos.findAll({
    where: { id: id }   
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

controllers.getcliente = async (req, res) => {
  const { id } = req.params;

  await Eventos.findAll({
    where: { logid: id }   
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

controllers.totaleventos = async (req, res) => {
  //const { id } = req.params;
  const { id, perfilId } = req.params;

  await Eventos.findAndCountAll({    
    where: { logid: id, perfilId: perfilId }  
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}


controllers.totaleventosADM = async (req, res) => {
  //const { id } = req.params;
  await Eventos.findAndCountAll({        
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}




module.exports = controllers;
