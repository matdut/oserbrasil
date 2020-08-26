const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var Eventos = require('../model/Eventos');
var Translado = require('../model/Translado_evento');
var Tipo = require('../model/Tipo_transporte');

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

controllers.listaevento = async (req,res) => {
  const { id } = req.params;
  
  await Eventos.findAll({
    where: { clienteId: id  }  
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
  const { logid, perfilId, ordem_servico, nome_evento, data_inicio_evento, data_final_evento, 
    tipoTransporteId, valor_total } = req.body;

  //console.log(req.body);          
  //console.log("ROle es ==>"+role)
  //create
  await Eventos.create({   
    logid: logid,
    perfilId: perfilId,    
    ordem_servico: ordem_servico, 
    nome_evento: nome_evento, 
    data_inicio_evento: data_inicio_evento, 
    data_final_evento: data_final_evento, 
    tipoTransporteId: tipoTransporteId, 
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
  const { perfilId, ordem_servico, nome_evento, data_inicio_evento, data_final_evento, 
    tipoTransporteId, valor_total } = req.body;
  // update data
  
  await Eventos.update({  
    perfilId: perfilId,    
    ordem_servico: ordem_servico, 
    nome_evento: nome_evento, 
    data_inicio_evento: data_inicio_evento, 
    data_final_evento: data_final_evento, 
    tipoTransporteId: tipoTransporteId, 
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
    return res.json({success:true, data: data});
  })
  .catch(error => {
    return res.json({success:false, message: error});
  })
  
}

module.exports = controllers;
