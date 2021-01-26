const controllers = {}

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// import model and sequelize
var sequelize = require('../model/database');
var HistoricoServicos = require('../model/historico_servicos');
var Eventos = require('../model/Eventos');
var TarifaEspecial = require('../model/Tarifa_especial');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.delete = async (req,res) => {
  
  // parameter post  
  const { id } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await HistoricoServicos.destroy({
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

controllers.listaservicosExcluidos = async (req,res) => {
  const { eventoid, id, perfilId } = req.params;
  
  await HistoricoServicos.findAll({
    where: { 
      eventoId: eventoid,  logid: id, perfilId: perfilId,
   /*   servico_pai_id: {
        [Op.In]: [null,0]             
      } a*/
    },  
    order: [ 
      ['createdAt', 'DESC'],
      ['data_servico', 'ASC'],      
    ]    
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.deleteevento = async (req,res) => {
  
  // parameter post  
  const { eventoid } = req.params;  
 // console.log( JSON.stringify(req.params, null, "    ") ); 

  //console.log('delete id  - '+id);
  // delete sequelize
  await HistoricoServicos.destroy({
    where: { eventoId: eventoid }
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

controllers.get = async (req, res) => {
  const { id } = req.params;
  
  await HistoricoServicos.findAll({    
    where: { id: id} 
  })
  .then( function(data){
    return res.json({success:true, data:data});
  })
  .catch(error => {
     return res.json({success:false});
  })
  
}


controllers.listporevento = async (req,res) => {
  const { id } = req.params;
  
  await HistoricoServicos.findAll({
    where: { eventoId: id  }  
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.listaeventosservicos = async (req,res) => {
  const { eventoid, id, perfilId } = req.params;
  
  await HistoricoServicos.findAll({
    include: [
      { 
       model: Eventos,
           where: { 
             id: eventoid, logid: id, perfilId: perfilId
           },         
      }],
    where: { eventoId: eventoid,  logid: id, perfilId: perfilId },  
    //group: ['createdAt', 'DESC'],
    order:[ 
      ['createdAt',  'ASC']      
    ]      
  })
  .then( function (data){
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
}

controllers.listaservicos = async (req,res) => {
  const { eventoid, id, perfilId } = req.params;
  
  await HistoricoServicos.findAll({
    where: { 
      eventoId: eventoid,  logid: id, perfilId: perfilId,
   /*   servico_pai_id: {
        [Op.In]: [null,0]             
      } */
    },  
    order: [
      ['createdAt', 'DESC'],
      ['data_servico', 'ASC'],
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

   //create
  await HistoricoServicos.create(req.body)
  .then( function (data){
    return res.json({success:true, data: data, message:"Translados criado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}

controllers.update = async (req, res) => {
  // parameter id get  

  // parameter post
    const { id } = req.params;
  // update data
  
  await HistoricoServicos.update(req.body,{
    where: { id: id}
  })
  .then( function (data){
    return res.json({success:true, data: data, message:"Translados atualizado com sucesso"});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })

}


module.exports = controllers;
