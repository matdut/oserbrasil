const controllers = {}

// import model and sequelize
var sequelize = require('../model/database');
var EnvioServicoMotorista = require('../model/Envio_servico_motorista');

// para migrar por si no tiene tablas
sequelize.sync()

controllers.list = async (req,res) => {
  const { motoristaId, motorista_perfil } = req.params;
  await EnvioServicoMotorista.findAll({
    where: { motorista_id: motoristaId, motorista_perfil: motorista_perfil },   
    order: [
      ['data_servico', 'asc'],
      ['hora_inicial', 'asc'],
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
  
  //console.log("ROle es ==>"+role)
  //create
  await EnvioServicoMotorista.create(req.body)
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

    // parameter post
  // update data
  
  await EnvioServicoMotorista.update(req.body,{
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

controllers.totalServicosenviados = async (req, res) => {
 
  const { motoristaId } = req.params;
 
   const salesCount = await EnvioServicoMotorista.count({ 
    where: { 
      motorista_id: motoristaId
     } 
   });
 
   return res.json({success:true, data: salesCount});
   
 }
module.exports = controllers;