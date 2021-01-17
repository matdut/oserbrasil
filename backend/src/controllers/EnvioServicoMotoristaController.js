const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var EnvioServicoMotorista = require('../model/Envio_servico_motorista');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  const { motoristaId } = req.params;
  await EnvioServicoMotorista.findAll({
    where: { motorista_id: motoristaId },   
    order: [
      ['data_servico', 'ASC']
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
  const {  servicoId, tipoEventoId, data_servico, hora_inicial,   
    local_embarque, motorista_id } = req.body;
  
  //console.log("ROle es ==>"+role)
  //create
  await EnvioServicoMotorista.create({ 
    servicoId: servicoId,
    tipoEventoId: tipoEventoId,
    data_servico: data_servico,  
    hora_inicial: hora_inicial,   
    local_embarque: local_embarque,
    motorista_id: motorista_id
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

  await EnvioServicoMotorista.findAll({
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

  const {  servicoId, tipoEventoId, data_servico, hora_inicial,   
    local_embarque, motorista_id } = req.body;
  //console.log('entrou aqui = '+id);
  // parameter post
  // update data
  
  await EnvioServicoMotorista.update({
    servicoId: servicoId,
    tipoEventoId: tipoEventoId,
    data_servico: data_servico,  
    hora_inicial: hora_inicial,   
    local_embarque: local_embarque,
    motorista_id: motorista_id
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
  await EnvioServicoMotorista.findAll({
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

controllers.getMotorista = async (req, res) => {
  const { motorista_id } = req.params;
  await EnvioServicoMotorista.findAll({
    where: { motorista_id: motorista_id}
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
 
  await EnvioServicoMotorista.destroy({
    where: { servicoId: id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.delete_servico = async (req,res) => {
  
  // parameter post  
  const { servicoId } = req.params;  
 
  await EnvioServicoMotorista.destroy({
    where: { servicoId: servicoId }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.delete_servico_motorista = async (req,res) => {
  
  // parameter post  
  const { servicoId, motorista_id } = req.params;  
 
  await EnvioServicoMotorista.destroy({
    where: { servicoId: servicoId, motorista_id: motorista_id }
  }).then( function (data){
    
    return res.json({success:true, data:data});    
    
  })
  .catch(error => {
    return res.json({success:false, message: error});
    //return error;
  }) 

}

controllers.totalEnvioServicoMotorista = async (req, res) => {
 
  const { motoristaId } = req.params;
 
   const salesCount = await EnvioServicoMotorista.count({ 
    where: { 
      motoristaId: motoristaId
     } 
   });
 
   return res.json({success:true, data: salesCount});
   
 }
module.exports = controllers;